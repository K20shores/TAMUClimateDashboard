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
import Photo0 from 'assets/img/frames/frame0.jpg';
import Photo1 from 'assets/img/frames/frame1.jpg';
import Photo2 from 'assets/img/frames/frame2.jpg';
import Photo3 from 'assets/img/frames/frame3.jpg';
import Photo4 from 'assets/img/frames/frame4.jpg';
import Photo5 from 'assets/img/frames/frame5.jpg';
import Photo6 from 'assets/img/frames/frame6.jpg';
import Photo7 from 'assets/img/frames/frame7.jpg';
import Photo8 from 'assets/img/frames/frame8.jpg';
import Photo9 from 'assets/img/frames/frame9.jpg';
import dataFile from 'assets/csv/sealevels.csv';

import SeaLevelGraph from './SeaLevelGraph';

const photos = [
  Photo0,
  Photo1,
  Photo2,
  Photo3,
  Photo4,
  Photo5,
  Photo6,
  Photo7,
  Photo8,
  Photo9,
];

export default function SeaLevel() {
  const { readRemoteFile } = usePapaParse();

  const [location, setLocation] = useState('Hawaii')
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
        <MenuItem value={'Hawaii'}>Hawaii</MenuItem>
        <MenuItem value={'Texas'}>Texas</MenuItem>
        <MenuItem value={'Florida'}>Florida</MenuItem>
        <MenuItem value={'New Jersey'}>New Jersey</MenuItem>
      </Select>
      <p>
        {location}
      </p>
      <Slider
        aria-label="Temperature"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={photos.length}
        onChange={(_, a) => changePicture(a-1)}
      />
      <img src={photos[which]} style={{maxWidth:'100%'}}/>
    </div>
  );
}
