import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { eventsNearby } from "../../../shared/util/hijri";
import t from '../../../shared/util/trans';
import InputControl from "../../Reservation/components/InputControl";
import { createUpcomingCaravan, deleteUpcomingCaravan } from "../redux/caravanSlice";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "75%",
    margin: "50px auto",
  },
  cardTitle: {
    textAlign: "left",
    fontSize: "2em",
    backgroundColor: "white",
    borderBottom: "1px solid #ccc",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "white",
    borderTop: "1px solid #ccc",
  },
  actionsContainerTopMain: {
    width: "50%",
    padding: "10px",
  },
  actionsContainerTopButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

const CRUDForm = ({ mode, record, title, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmitForm = (values, actions) => {
    switch (mode) {
      case "create":
        dispatch(createUpcomingCaravan(`${values.name}`))
        break;
      case "delete":
        dispatch(deleteUpcomingCaravan(`customer/${values.name}`))
        onClose();
        break;

      default:
        console.log("unknown mode");
    }
    onClose();
  };

  const validSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={mode === "create" ? {} : record}
        onSubmit={handleSubmitForm}
        validationSchema={validSchema}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form>
            <Card raised className={classes.formContainer}>
              <CardHeader
                className={classes.cardTitle}
                title={title}
                subheader={eventsNearby()}
                action={<CancelOutlinedIcon onClick={onClose} color="error" style={{ cursor: "pointer" }} />}
              />
              <CardContent>
                <Grid
                  container
                  justifyContent="space-between"
                  spacing={2}
                  style={{ padding: "1rem 2rem" }}
                >
                  <Grid item xs={12}>
                    <InputControl
                      name="name"
                      label={t('caravan-name')}
                      required
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      autoFocus={true}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.actionsContainer}>
                <Button
                  type="button"
                  disabled={isSubmitting}
                  variant="outlined"
                  color="default"
                  style={{ color: "red", borderColor: "red" }}
                  onClick={onClose}
                  startIcon={<CancelOutlinedIcon />}
                >
                  {t('cancel')}
                </Button>
                {mode === "create" && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outlined"
                    color="primary"
                    startIcon={<AddOutlinedIcon />}
                  >
                    {t('create')}
                  </Button>
                )}
                {mode === "delete" && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outlined"
                    className={classes.deleteButton}
                    startIcon={<DeleteOutlinedIcon />}
                  >
                    {`${t('delete')} ${title}`}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CRUDForm;
