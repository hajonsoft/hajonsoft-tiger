import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { packageImage } from '../../../shared/util/packageImage';
import t from '../../../shared/util/trans';
import { Box, Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    minHeight: '150px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 800,
    color: '#4caf50',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  subTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2D3848',
  },
  description: {
    color: '#718196',
    display: 'box',
    lineClamp: 3,
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    borderRadius: '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
}));

const AdvertisementCard = ({ detail, index }) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [reserveJSON, setReserveJSON] = useState('');

  if (!detail) {
    return null;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={packageImage(detail.gender, index)}
        title={detail.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" className={classes.title}>
          {detail.name}
        </Typography>
        <Typography variant="h1" className={classes.subTitle}>
          {detail.headline}
        </Typography>
        <Typography
          variant="body1"
          className={classes.description}
          style={{ maxLines: 3 }}
        >
          {detail.description || 'Call for details.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          title={`Make reservation to ${detail.name}`}
          color="primary"
          variant="contained"
          onClick={() => history.push(`/reserve/${detail.name}`)}
          style={{ textTransform: 'none' }}
        >
          {t('reservation.reserve')}
        </Button>
        <Button
          title={`Make reservation to ${detail.name}`}
          color="info"
          variant="contained"
          onClick={handleOpen}
          style={{ textTransform: 'none' }}
        >
          Upload JSON
        </Button>
        <Button
          title={`Learn more about ${detail.name} package`}
          onClick={() => history.push(`/package/detail/${detail.name}`)}
          style={{ textTransform: 'none' }}
        >
          {t('learn-more')}
        </Button>
      </CardActions>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={getModalStyle()} className={classes.paper}>
          <Typography> Paste JSON below </Typography>
          <TextField
            label="Paste Passport JSON here"
            multiline
            value={reserveJSON}
            onChange={(e) => setReserveJSON(e.target.value)}
            fullWidth
            rows={4}
            variant="filled"
          />
          <Button
            title={`Make reservation to ${detail.name}`}
            color="primary"
            variant="contained"
            onClick={() => {
              if (reserveJSON) {
                history.push(`/bulk-reserve?json=${reserveJSON}&caravan=${detail.name}`);
              }
            }}
            style={{ textTransform: 'none' }}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default AdvertisementCard;
