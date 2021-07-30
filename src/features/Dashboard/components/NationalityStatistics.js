import { Paper, Table , TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

import _ from 'lodash';
import React from 'react';

const NationalityStatistics = ({ data }) => {
    return (
        <TableContainer component={Paper} style={{width: "100%"}}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nationality</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">%</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(_.groupBy(data, 'nationality')).map(nationality =>
                        <TableRow key={nationality}>
                            <TableCell component="th" scope="row">
                                {nationality}
                            </TableCell>
                            <TableCell align="right">{data.filter(x => x.nationality === nationality).length}</TableCell>
                            <TableCell align="right">{Math.round((data.filter(x => x.nationality === nationality).length / data.length) * 100)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NationalityStatistics
