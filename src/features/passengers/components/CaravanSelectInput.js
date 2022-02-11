import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
function CaravanSelectInput({ customers, caravan, onSelect }) {
  const caravans = useSelector((state) => state.caravan?.data);
  const [ selectedCaravan, setSelectedCaravan ] = useState("")

  return (
    <div>
      <Alert severity="info">{`You are about to move ${customers.length} passengers`}</Alert>
      <Grid
        container
        style={{ margin: '1rem 0px' }}
      >
        <Grid item md={12}>
          <FormControl fullWidth>
            <InputLabel id="move-caravan">Select a caravan</InputLabel>
            <Select
              id="move-caravan"
              value={selectedCaravan}
              style={{ width: '100%' }}
              onChange={(e) => {
                onSelect(e.target.value)
                setSelectedCaravan(e.target.value)
              }}
            >
              {Object.keys(caravans)
                .filter((keyRow) => keyRow !== caravan)
                .map((caravanRow) => (
                  <MenuItem value={caravanRow} >{caravanRow}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}



export default CaravanSelectInput;
