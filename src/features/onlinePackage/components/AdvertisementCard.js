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
import { useHistory } from "react-router-dom";
import { packageImage } from "../../../util/packageImage";

const AdvertisementCard = ({ detail, index }) => {
  const history = useHistory();
  if (!detail) {
    return null;
  }
  return (
    <div>
      <Card raised variant="outlined" style={{ backgroundColor: "#e8f5e9" }}>
        <CardHeader
          title={detail.name}
          subheader={detail.headline}
        ></CardHeader>
        <CardMedia
          component="img"
          alt={detail.name}
          image={packageImage(detail.gender, index)}
          title={detail.name}
        />
        <CardContent>
          <Typography variant="body1" noWrap style={{maxLines: 4}}>
            {detail.description || "Call for details."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            title={`Make reservation to ${detail.name}`}
            variant="contained"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => history.push(`/reserve/${detail.name}`)}
            endIcon={<EventSeatIcon />}
          >
            Reserve
          </Button>
          <Button
            title={`Learn more about ${detail.name} package`}
            onClick={() => history.push(`/package/detail/${detail.name}`)}
            variant="outlined"
            color="primary"
            style={{ textTransform: "none" }}
            endIcon={<SchoolIcon />}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AdvertisementCard;
