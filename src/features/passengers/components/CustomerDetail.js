import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movePassenger } from '../../Dashboard/redux/caravanSlice';
function CustomerDetail({ customer, caravan }) {
    const caravans = useSelector((state) => state.caravan?.data);
    const dispatch = useDispatch();
    const passenger = {...customer};
    delete passenger.tableData;

    return (
        <div>
            <Alert severity="info" >{`Passenger Id: ${customer._fid}`}</Alert>
            <Grid container justifyContent="space-around" spacing={2} style={{ padding: '2rem' }}>
                <Grid item md={10}>
                    <FormControl fullWidth>
                        <InputLabel id="move-caravan">Select new caravan to move passenger to</InputLabel>
                        <Select id="move-caravan" value={''} style={{ width: '100%' }}>
                            {Object.keys(caravans).filter(keyRow => keyRow !== caravan).map(caravanRow => <MenuItem onClick={() => dispatch(movePassenger({ newCaravan: caravanRow, oldCaravan: caravan, passenger }))}>{caravanRow}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

export default CustomerDetail
