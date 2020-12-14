import { List, ListItem, ListItemText } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';

const NationalityStatistics = ({ data }) => {
    return (
        <div>
            <List component="nav">
                {Object.keys(_.groupBy(data, 'nationality')).map(k =>
                    <ListItem button>
                        <ListItemText primary={`[${data.filter(x => x.nationality === k).length}] ${k}`} secondary={`${Math.round((data.filter(x => x.nationality === k).length / data.length) * 100)}%`} />
                    </ListItem>)
                }
            </List>
        </div>
    )
}

export default NationalityStatistics
