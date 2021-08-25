import { CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import SchoolIcon from "@material-ui/icons/School";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { packageImage } from "../../../util/packageImage";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    minHeight: "150px"
  },
  title: {
    fontSize: "1rem",
    fontWeight: 800,
    color: "#4caf50",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  subTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#2D3848",
  },
  description: {
    color: "#718196",
    display: "box",
    lineClamp: 3,
    boxOrient: "vertical",
    overflow: "hidden",
  },
}));

const AdvertisementCard = ({ detail, index }) => {
  const history = useHistory();
  const classes = useStyles();
  if (!detail) {
    return null;
  }

  return (
    // <Grid item key={Math.random().toString()} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={packageImage(detail.gender, index)}
        title={detail.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          {detail.name}
        </Typography>
        <Typography component="h1" className={classes.subTitle}>
          {detail.headline}
        </Typography>
        <Typography
          variant="body1"
          className={classes.description}
          style={{ maxLines: 4 }}
        >
          {detail.description || "Call for details."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          title={`Make reservation to ${detail.name}`}
          color="primary"
          style={{color: "#4caf50"}}
          onClick={() => history.push(`/reserve/${detail.name}`)}
        >
          Reserve
        </Button>
        <Button
          title={`Learn more about ${detail.name} package`}
          onClick={() => history.push(`/package/detail/${detail.name}`)}
          size="lg"
          style={{color: "#4caf50"}}
          color="primary"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdvertisementCard;
