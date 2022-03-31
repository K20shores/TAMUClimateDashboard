/*eslint-disable*/
import React from "react";
import { usePapaParse } from 'react-papaparse';

import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Import components for data visualizations using d3
import { useState, useRef, useEffect } from 'react';

import styles from "assets/jss/material-dashboard-react/views/sealevelStyle.js";
import dataFile from 'assets/csv/sealevels.csv';

import SeaLevelGraph from './SeaLevelGraph';

export default function SeaLevel() {
  const { readRemoteFile } = usePapaParse();

  const [location, setLocation] = useState('TX')
  // Import data
  const [data, setData] = useState({
    topex_arr: [],
    jason1_arr: [],
    jason2_arr: [],
    jason3_arr: []
  })

  useEffect(() => {
    readRemoteFile(dataFile, {
      complete: (results) => {
        console.log('---------------------------');
        console.log('Results:', results);
        console.log('---------------------------');
  
        // remove the header
        results.data = results.data.slice(1)

        let years = results.data.map(x => x[0]).map(Number);
        let topex_data = results.data.map(x => x[1]).map(Number);
        let jason1_data = results.data.map(x => x[2]).map(Number);
        let jason2_data = results.data.map(x => x[3]).map(Number);
        let jason3_arr = results.data.map(x => x[4]).map(Number);

        let toArrayOfObject = (y, d) => {
          return d.map((x, idx) => {
            return {
              year: y[idx],
              data: x
            }
          })
        }

        setData({
          topex_arr: toArrayOfObject(years, topex_data).filter(x => x.data != 0),
          jason1_arr: toArrayOfObject(years, jason1_data).filter(x => x.data != 0),
          jason2_arr: toArrayOfObject(years, jason2_data).filter(x => x.data != 0),
          jason3_arr: toArrayOfObject(years, jason3_arr).filter(x => x.data != 0),
        })
      },
    });
  }, [])

  // Declare important things for image array of rising sea levels
  const [which, changePicture] = React.useState(0);

  return (
    // setup the graph and its tooltip svg
    <div className="SeaLevel">
      <SeaLevelGraph
        data = {data}
        style={{maxWidth:'75%'}}
      />
      <InputLabel id="location-selector-label">Select Location</InputLabel>
      <Select
        labelId="location-selector-label"
        id="location-selector"
        value={location}
        label="Location"
        onChange={(event) => setLocation(event.target.value)}
        style={{marginTop: '1em'}}
      >
        <MenuItem value={'TX'}>Texas</MenuItem>
        <MenuItem value={'FL'}>Florida</MenuItem>
        <MenuItem value={'NJ'}>New Jersey</MenuItem>
      </Select>
      <Slider
        aria-label="Temperature"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        onChange={(_, a) => changePicture(a)}
      />
      <img src={`../images/frames/${location}_${which}.png`} style={{maxWidth:'100%'}}/>
    </div>
  );
}
