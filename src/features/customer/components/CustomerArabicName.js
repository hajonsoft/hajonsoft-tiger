import { IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TranslateIcon from "@material-ui/icons/Translate";
import { ErrorMessage, Field } from "formik";
import _ from "lodash";
import React from "react";
import firebaseArabicName from "../../arabicName/firebaseArabicName";

const name = "nameArabic";

const CustomerArabicName = ({ mode, value, englishName, setFieldValue }) => {
  const helperText = () => {
    if (!value) return "";

    const nameArray = value?.split(" ");
    switch (nameArray.length) {
      case 0:
      case 1:
        return "invalid name";
      case 2:
        return `${nameArray[0].replace(/-/g, " ")}/${nameArray[1].replace(
          /-/g,
          " "
        )}`;
      case 3:
        return `${nameArray[0].replace(/-/g, " ")}/${nameArray[1].replace(
          /-/g,
          " "
        )}//${nameArray[2].replace(/-/g, " ")}`;
      case 4:
        return `${nameArray[0].replace(/-/g, " ")}/${nameArray[1].replace(
          /-/g,
          " "
        )}/${nameArray[2].replace(/-/g, " ")}/${nameArray[3].replace(
          /-/g,
          " "
        )}`;
      default:
        return `${nameArray[0].replace(/-/g, " ")}/${nameArray[1].replace(
          /-/g,
          " "
        )}/${nameArray
          .slice(2, nameArray.length - 1)
          .join(" ")
          .replace(/-/g, " ")}/${_.last(nameArray).replace(/-/g, " ")}`;
    }
  };

  const getFullArabicName = (arabicNameDictionary) => {
    const cursor = Object.values(arabicNameDictionary);
    let fullArabicName = '';
    for (let i = 0; i < cursor.length; i++) {
      if (arabicNameDictionary[`"${i}"`])  {
        fullArabicName += " " + arabicNameDictionary[`"${i}"`];
      }
    }

    return fullArabicName.trim();
  };

  const handleTranslateName = async () => {
    const names = englishName?.split(" ").filter((name) => name?.trim());
    if (names.length === 0) {
      return;
    }
    const translationResult = {};
    try {
      for (let i = 0; i < names.length; i++) {
        firebaseArabicName
          .database()
          .ref(`/${names[i].toLowerCase()}`)
          .once("value")
          .then((snapshot) => {
            const result = snapshot.val();
            translationResult[`"${i}"`] = result;
            const fullArabicName = getFullArabicName(translationResult);
            setFieldValue("nameArabic", fullArabicName);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid item xs={6}>
      <Grid container>
        <Grid item xs={11}>
          <Field
            as={TextField}
            fullWidth
            name={name}
            label="الاسم العربي في جواز السفر"
            disabled={mode === "delete"}
            autoComplete="off"
            onChange={(event) => {
              const regex = /^([-\u0621-\u064A ]){1,60}$/i;
              if (event.target.value === "" || regex.test(event.target.value)) {
                setFieldValue(name, event.target.value.toUpperCase());
              }
            }}
            helperText={helperText()}
          />
        </Grid>
        <Grid item container xs={1} alignItems="center" justify="flex-end">
          <Grid item>
            <IconButton
              size="small"
              aria-label="search facebook"
              onClick={handleTranslateName}
            >
              <TranslateIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ErrorMessage name={name} component="div" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerArabicName;
