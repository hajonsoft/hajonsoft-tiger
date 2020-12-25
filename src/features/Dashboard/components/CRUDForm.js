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
import _ from "lodash";
import React from "react";
import * as yup from 'yup';
import { eventsNearby } from '../../../util/hijri';
import CoreTextField from "../../customer/components/CoreTextField";
import useTravellerState from '../redux/useTravellerState';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "60%",
    margin: "25px auto",
  },
  cardTitle: {
    textAlign: "left",
    fontSize: "2em",
    backgroundColor: "silver",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "silver",
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
    color: theme.palette.error.main
  }
}));

const CRUDForm = ({ mode, record, title, onClose }) => {
  const classes = useStyles();
  const { createData: createTraveller, deleteData: deleteTraveller } = useTravellerState();

  const handleSubmitForm = (values, actions) => {
    switch (mode) {
      case "create":
        createTraveller({ path: `customer/${_.startCase(values.name)}`, traveller: { name: 'default' } })
        break;
      case "delete":
        deleteTraveller({ path: `customer/${values.name}` })
        break;

      default:
        console.log("unknown mode");
    }
    onClose();
  };

  const validSchema = yup.object().shape({
    name: yup.string().required('Required'),
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={mode === "create" ? {} : record}
        onSubmit={handleSubmitForm}
        validationSchema={validSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Card raised className={classes.formContainer}>
              <CardHeader
                className={classes.cardTitle}
                title={_.startCase(mode + " " + title)}
                subheader={eventsNearby()}
                action={
                  <CancelOutlinedIcon onClick={onClose} />
                }
              />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item container>
                    <CoreTextField
                      name="name"
                      value={values.name}
                      mode={mode}
                      xsWidth={12}
                      required
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container justify="flex-end" spacing={2}>
                  <Grid item>
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      variant="contained"
                      color="secondary"
                      onClick={onClose}
                      startIcon={<CancelOutlinedIcon />}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  {mode === "create" && (
                    <Grid item>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        startIcon={<AddOutlinedIcon />}
                      >
                        {`Create ${title}`}
                      </Button>
                    </Grid>
                  )}
                  {mode === "delete" && (
                    <Grid item>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        className={classes.deleteButton}
                        startIcon={<DeleteOutlinedIcon />}
                      >
                        {`Delete ${title}`}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CRUDForm;
