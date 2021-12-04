/*eslint-disable*/
import React from "react";

import Slider from '@mui/material/Slider';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
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



const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  const [which, changePicture] = React.useState(0);
  //changePicture(5);
  return (
    <>
    {temperature_slider}
    <img src={Photo0} />
    </>
  );
}

const temperature_slider = (
<Slider
  aria-label="Temperature"
  valueLabelDisplay="auto"
  step={0.5}
  marks
  min={0}
  max={5}
  onChange={(_,a)=>console.log(a)}
/>
  )

const photos = [
    photo:Photo0,
    photo:Photo1,
    photo:Photo2,
    photo:Photo3,
    photo:Photo4,
    photo:Photo5,
    photo:Photo6,
    photo:Photo7,
    photo:Photo8,
    photo:Photo9,
];