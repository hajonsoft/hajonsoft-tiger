import { faFemale, faMale, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

const BioStatistics = ({ data }) => {
    return (
        <div>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faMale} color="silver" size="2x" />
                    </ListItemIcon>
                    <ListItemText primary={`${data.filter(f => f.gender && f.gender.startsWith('M')).length} Male`} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faFemale} color="silver" size="2x" />
                    </ListItemIcon>
                    <ListItemText primary={`${data.filter(f => f.gender && f.gender.startsWith('F')).length} Female`} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faUser} color="silver" size="2x" />
                    </ListItemIcon>
                    <ListItemText primary={`${data.filter(f => f.birthDate && f.birthDate && moment().diff(f.birthDate, 'years') > 18 && moment().diff(f.birthDate, 'years') < 50).length} between 18 and 50 years old`} />
                </ListItem>
            </List>
        </div>
    )
}

export default BioStatistics
