// @ts-nocheck
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const { parse } = require('mrz');
const { parse: parseDate, format, subDays, subYears } = require('date-fns');
const sharp = require('sharp');
const UUID = require('uuid-v4');
const os = require('os');
const path = require('path');

const _ = require('lodash');
const moment = require('moment');

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/**
 * Extract the passport details from the mrz string
 * @param recognitionResult Full text from text recognition
 * @returns
 */
const extractMRZData = (fullText) => {
  // Some passports have mrz that dont' start with P<, they have another char after the P
  // So we look for lines starting with P which a < in it
  const line1Matches = [...fullText.matchAll(/^P[A-Z0-9<](?=.*<).*/gm)];
  console.log({ fullText, line1Matches: line1Matches?.[0]?.[0] });
  if (line1Matches.length === 0) {
    return {};
  }
  // Sometimes vision detects only part of the mrz line 1, eg first 40 chars
  // So we pad out the end with <
  let line1Match = line1Matches[0];
  const line1 = line1Match[0].padEnd(44, '<');
  console.log({ line1 });

  // Get all the lines which have mrz data
  let remainingLines = fullText.substring(line1Match.index);
  // Now get line 2 from the remaining lines
  // Look for line ending in <XX, and count backwards
  let line2Matches = [...remainingLines.matchAll(/.*<[0-9]{2}$/gm)];
  console.log({ remainingLines, line2Matches: line2Matches?.[0]?.[0] });
  if (line2Matches.length === 0) {
    return {};
  }
  const line2Match = line2Matches[0];

  // Combine the remaining lines, in case vision splits mrz into multiple lines
  const relevantLines = remainingLines
    .substring(0, line2Match.index + line2Match[0].length)
    .replace(/\s/g, '');

  // Count backwards from end of the relevant lines
  let line2 = relevantLines.slice(relevantLines.length - 44); // Last 44 chars of string
  console.log({ line2 });

  // let fullTextSingleLine = fullText.replace(/\s/g, '')

  let mrz = `${line1}\n${line2}`;
  let { fields } = parse(mrz);

  // Ensure birthdate is within the century
  let birthDate = fields.birthDate
    ? parseDate(fields.birthDate, 'yyMMdd', new Date())
    : undefined;
  if (birthDate && birthDate > subDays(new Date(), 1)) {
    birthDate = subYears(birthDate, 100);
  }

  let expirationDate = fields.expirationDate
    ? parseDate(fields.expirationDate, 'yyMMdd', new Date())
    : undefined;

  return {
    mrz,
    birthDate: birthDate ? format(birthDate, 'yyyy-MM-dd') : undefined,
    passportNumber: fields.documentNumber ?? undefined,
    passportExpiryDate: expirationDate
      ? format(expirationDate, 'yyyy-MM-dd')
      : undefined,
    passportFirstName: fields.firstName ?? undefined,
    passportLastName: fields.firstName ?? undefined,
    name: `${fields.firstName} ${fields.lastName}`,
    passportIssuePlace: fields.issuingState ?? undefined,
    nationality: fields.nationality ?? undefined,
    gender: fields.sex ? capitalizeFirstLetter(fields.sex) : undefined,
  };
};

/**
 * Upload a file to storage and get public url
 * @param localFile
 * @param remoteFile
 * @returns
 */
const uploadToStorage = async (localFile, remoteFile) => {
  let uuid = UUID();
  const bucket = admin.storage().bucket();
  const data = await bucket.upload(localFile, {
    destination: remoteFile,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });

  let file = data[0];
  return `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`;
};
/**
 * Get the best face of multiple faces
 * @param faceAnnotations
 * @returns
 */
const getBestFace = (faceAnnotations) => {
  let bestFace = faceAnnotations[0];
  let bestWidth =
    bestFace?.boundingPoly?.vertices?.[1]?.x -
    bestFace?.boundingPoly?.vertices?.[0]?.x;
  for (let face of faceAnnotations) {
    let currentWidth =
      face.boundingPoly.vertices[1].x - face.boundingPoly.vertices[0].x;

    if (bestWidth < currentWidth) {
      // Current face is wider than the best face, make this the new best face
      bestFace = face;
      bestWidth = currentWidth;
    }
  }
  return bestFace;
};
/**
 * Get the issue date from the labels
 * @param words
 * @param passportExpiryDate Supplied to eliminate false positives
 * @returns
 */
function getIssueDate(raw, passportExpiryDate, birthDate) {
  try {
    let dates = [];
    // Get all dates from the raw text
    const matches = raw.match(
      /[0-9]{2,4}[/\.\- ][0-9A-Z]{2,3}[/\.\- ][0-9]{2,4}/g
    );
    if (matches) {
      dates = [...dates, ...matches];
    }
    dates = _.uniq(dates);
    let parsedDates = [];
    dates.forEach((dt) => {
      if (dt.includes('/')) {
        const date = moment(dt, 'DD/MM/YYYY');
        if (date.isValid()) {
          parsedDates.push(date.format('YYYY-MM-DD'));
        }
      } else if (dt.includes('.')) {
        const date = moment(dt, 'DD.MM.YYYY');
        if (date.isValid()) {
          parsedDates.push(date.format('YYYY-MM-DD'));
        }
      } else if (dt.includes('-')) {
        const date = moment(dt, 'YYYY-MM-DD');
        if (date.isValid()) {
          parsedDates.push(date.format('YYYY-MM-DD'));
        }
      } else if (dt.includes(' ')) {
        // Format
        const date = moment(dt.toUpperCase(), 'DD MMM YYYY');
        if (date.isValid()) {
          parsedDates.push(date.format('YYYY-MM-DD'));
        }
      }
    });
    console.log({ parsedDates, passportExpiryDate, birthDate });
    parsedDates = parsedDates.filter(
      (dt) =>
        moment(dt).isBefore(moment()) && // Before now
        moment(dt).isBefore(moment(passportExpiryDate)) && // Before expiry date
        moment(dt).isAfter(moment(birthDate)) // After birthday
    );
    console.log({ parsedDates });
    if (!parsedDates || parsedDates.length === 0) {
      return undefined;
    }

    parsedDates = parsedDates.sort((a, b) => {
      return moment(a.trim()).isBefore(b.trim()) ? -1 : 1;
    });

    if (parsedDates.length === 1) {
      return parsedDates[0];
    }
    if (parsedDates.length > 1) {
      return parsedDates[1];
    }
  } catch (err) {
    console.log(err);
  }
  return undefined;
}
const getTextFromScan = async ({ textAnnotations }) => {
  // Extract MRZ
  let recognitionResult = textAnnotations?.[0]?.description;

  if (!textAnnotations || textAnnotations.length === 0) {
    throw new https.HttpsError(
      'invalid-argument',
      'No text detected. Try uploading a clearer image.'
    );
  }

  // Get words from text recognition
  const words = textAnnotations
    ?.filter(
      (textResult) => textResult.description //&&
      // textResult.description.length > 4 &&
      // textResult.description.length < 30
    )
    .map((textResult) => textResult.description);

  // Extract MRZ
  let mrzData = {};
  try {
    // Replace incorrect angle brackets
    recognitionResult = recognitionResult.replace(/\く/g, '<');
    mrzData = {
      ...extractMRZData(recognitionResult),
    };
  } catch (e) {
    console.error(e);
    throw new https.HttpsError('invalid-argument', 'Error reading MRZ');
  }

  return [mrzData, words, recognitionResult];
};
/**
 * Detect face from scan, crop it out and upload to storage
 */
const getPhotoFromScan = async ({ faceAnnotations, localFile, filePath }) => {
  // Extract passport photo
  const outputFilename = `cropped_${new Date().getTime()}_${path.basename(
    filePath
  )}`;
  const outputFile = path.join(os.tmpdir(), outputFilename);

  // Detect face
  if (faceAnnotations && faceAnnotations?.length) {
    // Found face
    const face = getBestFace(faceAnnotations);
    const vertices = face.boundingPoly?.vertices;
    // Crop face and save to local file
    const [xOffset, yOffset] = [20, 40];
    const [width, height, left, top] = [
      vertices[1].x - vertices[0].x + 2 * xOffset,
      vertices[3].y - vertices[0].y + 2 * yOffset,
      Math.max(vertices[0].x - xOffset, 0),
      Math.max(vertices[0].y - yOffset, 0),
    ];

    await sharp(localFile)
      .extract({ width, height, left, top })
      .toFile(outputFile);

    // Upload to storage
    // Keep the same filename, but different folder
    const uploadPhotoPath = filePath.replace('passport-scans', 'photos');
    return await uploadToStorage(outputFile, uploadPhotoPath);
  }
  return undefined;
};


/**
 * @param filePath - The path to the already uploaded file
 */
module.exports = functions
  .runWith({ secrets: ['VISION_CLIENT_EMAIL', 'VISION_PRIVATE_KEY'] })
  .https.onCall(async ({ filePath }) => {
    //@ts-ignore
    const storageBucket = JSON.parse(process.env.FIREBASE_CONFIG).storageBucket;
    const storageFile = `gs://${storageBucket}/${filePath}`;
    let photoUrl;

    // console.log({ clientemail: process.env.VISION_PRIVATE_KEY })

    // On production, ensure credentials are set (by creating a service account for vision api)
    // firebase functions:secrets:set VISION_CLIENT_EMAIL
    // firebase functions:secrets:set VISION_PRIVATE_KEY
    const client = new vision.ImageAnnotatorClient({
      // credentials: {
      // 	client_email: process.env.VISION_CLIENT_EMAIL,
      // 	private_key: process.env.VISION_PRIVATE_KEY
      // }
      keyFilename: '.private-keys/vision-service-account.json', // TODO implement multiline private key
    });

    const [visionResults] = await client.annotateImage({
      image: {
        source: {
          imageUri: storageFile,
        },
      },
      features: [
        {
          type: 'FACE_DETECTION',
          maxResults: 5,
        },
        {
          type: 'TEXT_DETECTION',
        },
      ],
    });

    if (visionResults.error) {
      console.error(visionResults.error);
      throw new https.HttpsError(
        'invalid-argument',
        visionResults.error.message ?? 'Whoops, something went wrong'
      );
    }

    // Download the image from storage
    const localFilename = `upload_${new Date().getTime()}_${path.basename(
      filePath
    )}`;
    const localFile = path.join(os.tmpdir(), localFilename);
    await admin
      .storage()
      .bucket()
      .file(filePath)
      .download({ destination: localFile });

    // Get passport details
    const [passportDetails, words, raw] = await getTextFromScan({
      textAnnotations: visionResults.textAnnotations,
    });

    // Try get other relevant info
    const passportIssueDate =
      passportDetails.passportExpiryDate && passportDetails.birthDate
        ? getIssueDate(
            raw,
            passportDetails.passportExpiryDate,
            passportDetails.birthDate
          )
        : undefined;

    // Get passport photo, fail silently
    try {
      photoUrl = await getPhotoFromScan({
        faceAnnotations: visionResults.faceAnnotations,
        localFile,
        filePath,
      });
    } catch (e) {
      console.error(e.message);
    }

    // Derive other fields, eg issue date
    // Extra suggested tokens

    return {
      values: {
        ...passportDetails,
        passportIssueDate,
        photoUrl,
      },
      words,
      raw,
      suggestions: {},
    };
  });
