/*eslint-disable*/
import React from "react";
import { usePapaParse } from 'react-papaparse';

import Slider from '@mui/material/Slider';
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
  
        let years = results.data.map(x => x[0]).slice(1).map(Number);
        setData({
          topex_arr: [years, results.data.map(x => Number(x[1])).slice(1)],
          jason1_arr: [years, results.data.map(x => Number(x[2])).slice(1)],
          jason2_arr: [years, results.data.map(x => Number(x[3])).slice(1)],
          jason3_arr: [years, results.data.map(x => Number(x[4])).slice(1)]
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
      />
      <Slider
        aria-label="Temperature"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={photos.length - 1}
        onChange={(_, a) => changePicture(a)}
      />
      <img src={photos[which]} />
    </div>
  );
}
