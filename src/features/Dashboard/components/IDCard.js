import React from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';

const IDCard = () => {
  const [pdfDoc, setPdfDoc] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('/pdfs/Oran.pdf');
      const existingPdfBytes = await response.arrayBuffer();

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      setPdfDoc(pdfDoc);
    })();
  }, []);

  const createPDF = async () => {
    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    console.log(width, height, 'width and height');

    const jpgUrl =
      '/mstile-150x150.jpg';
    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

    // write image
    firstPage.drawImage(jpgImage, {
      x: 9,
      y: 67,
      width: 50,
      height: 50,
    });

    /// write firstName
    firstPage.drawText('Babatunde', {
      x: 124,
      y: height - 32,
      size: 8,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
    });

    /// write lastName
    firstPage.drawText('Ololade', {
      x: 124,
      y: height - 46,
      size: 8,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
    });

    /// write passport number
    firstPage.drawText('21091000095', {
      x: 124,
      y: height - 60,
      size: 8,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
    });

    /// write birthDate
    firstPage.drawText('22/07/1997', {
      x: 124,
      y: height - 74,
      size: 8,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
    });

    /// write trip name
    firstPage.drawText('Humrah Tour', {
      x: 124,
      y: height - 89,
      size: 8,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
    });

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, 'pdf-lib_modification_example.pdf', 'application/pdf');
  };

  return (
    <div>
      <p>Hello World!!</p>
      <p>Hello World!!</p>
      <p>Hello World!!</p>
      <p>Hello World!!</p>
      <p>Hello World!!</p>
      <p>Hello World!!</p>
      <p>Hello World!!</p>

      <button onClick={createPDF}> create a pdf </button>
    </div>
  );
};

export default IDCard;
