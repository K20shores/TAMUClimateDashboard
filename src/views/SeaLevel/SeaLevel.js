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

// Import components for data visualizations using d3
import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

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

const useStyles = makeStyles(styles);

export default function SeaLevel() {
  const audioTune = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
  const classes = useStyles();
  const [which, changePicture] = React.useState(0);
  const [data] = useState([ [0,0], [1,1], [2,4], [3,9], [4,16], [5,25], [6,36], [7,49], [8,64] ]);
  const svgRef = useRef();

  // variable to play audio in loop
  const [playInLoop, setPlayInLoop] = useState(false);

  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])

  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])

  useEffect(() => {
    // setting up container
    const w = 400;
    const h = 300;
    const svg = d3.select('#svg_id')
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top', '100px')
      .style('margin-left', '100px')

    // setting up scaling
    const xScale = d3.scaleLinear()
      .domain([0,8])
      .range([0,w]);
    const yScale = d3.scaleLinear()
      .domain([64,0])
      .range([0,h]);

    // setting up axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(12);
    svg.append('g')
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);
    svg.append('g')
      .call(yAxis);

    // setting up axis labeling
    svg.append('text')
      .attr('x', w/2)
      .attr('y', h+50)
      .text('x');
    svg.append('text')
      .attr('y', h/2)
      .attr('x', -50)
      .text('y');

      //setting up the tooltip
      const tooltip = d3.select('#dat_id')
        .style("opacity", 1)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

      const mouseover = function(event, d) {
        audioTune.play();
        tooltip
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1);
      }
      const mousemove = function(event, d) {
        tooltip.selectAll('*').remove();
        tooltip
          .append('rect')
            .attr('width', 137 + parseInt(d[1].toString().length, 10)*9)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('fill', '#E5FEFF')
        tooltip
          .attr('x', event.x - 200)
          .attr('y', event.y - 180)
          .append('text')
            .attr('y',15)
            .text(`The exact value is: ${d[1]}.`); /*
          .attr('x', 3*w/4)
          .attr('y', h+50);*/
      }
      const mouseleave = function(event,d) {
        tooltip
          .transition()
          .duration(350)
          .style("opacity", 0);
      }

      // Set up the actual data points onto the graph
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr('cx', d => xScale(d[0]))
          .attr('cy', d => yScale(d[1]))
          .attr('r', 7)
          .style("fill", "#69b3a2")
          .style("opacity", 0.3)
          .style("stroke", "black")
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave );
  }, [data]);

  return (
    <div className="SeaLevel">
      <svg id='svg_id'><g>
      <svg id='dat_id'></svg></g>
      </svg>
    <Slider
      aria-label="Temperature"
      valueLabelDisplay="auto"
      step={1}
      marks
      min={0}
      max={photos.length - 1}
      onChange={(_,a) => changePicture(a)}
    />
    <img src={photos[which]} />
    </div>
  );
}

