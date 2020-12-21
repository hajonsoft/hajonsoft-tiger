import { CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ForwardIcon from '@material-ui/icons/Forward';
import NearMeIcon from '@material-ui/icons/NearMe';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import packagePlaceholder from '../../../images/package-placeholder.jpg';



const PackageCard = ({ detail, image = packagePlaceholder }) => {
    const history = useHistory();
    if (!detail) {
        return null;
    }
    return (
        <div>
            <Helmet>
                <title>{`${detail.name}`}</title>
            </Helmet>
            <Card raised variant="outlined" style={{ backgroundColor: "#e8f5e9" }}>
                <CardHeader title={detail.name} subheader={`${detail.quadPrice} 4 persons/room`} ></CardHeader>
                <CardMedia
                    component="img"
                    alt={detail.name}
                    image={image}
                    title={detail.name}
                />
                <CardContent>
                    <Typography variant="body1">{detail.description || 'Call for details.'}</Typography>
                </CardContent>
                <CardActions>
                    <Button title={`Make reservation to ${detail.name} package`} variant="contained" color="primary" style={{ textTransform: "none" }} onClick={() => history.push(`/reserve/${detail.name}`)}>Reserve <NearMeIcon></NearMeIcon></Button>
                    <Button title={`Learn more about ${detail.name} package`} onClick={() => history.push(`/package/detail/${detail.name}`)} variant="outlined" color="primary" style={{ textTransform: "none" }}>Learn More <ForwardIcon></ForwardIcon></Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default PackageCard
