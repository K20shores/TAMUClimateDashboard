/*eslint-disable*/
import React from "react";
import { usePapaParse } from 'react-papaparse';

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
import dataFile from 'assets/csv/sealevels.csv';


const useStyles = makeStyles(styles);

export default function SeaLevelGraph(props) {
  // Declare important things for audio "pop" sound
  const audioTune = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
  const [playInLoop, setPlayInLoop] = useState(false);
  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])
  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])

  // Practice data
  const [data0] = useState(props.topex_arr);
  const [data1] = useState(props.jason1_arr);
  const [data2] = useState(props.jason2_arr);
  const [data3] = useState(props.jason3_arr);

  // set up the graph to display data
  useEffect(() => {
    // setting up container
    const w = 800;
    const h = 400;
    const svg = d3.select('#svg_id')
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top', '100px')
      .style('margin-left', '100px')

    // setting up scaling
    const xScale = d3.scaleLinear()
      .domain([1992, 2021])
      .range([0, w]);
    const yScale = d3.scaleLinear()
      .domain([80 * 0.0393701, -25 * 0.0393701])
      .range([0, h]);

    // setting up axes & putting the x-axis at the bottom
    const xAxis = d3.axisBottom(xScale).ticks(8);
    const yAxis = d3.axisLeft(yScale).ticks(12);
    svg.append('g')
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);
    svg.append('g')
      .call(yAxis);

    // setting up axis & title labeling
    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('x', w / 2)
      .attr('y', h + 50)
      .text('Year');
    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('x', w / 2)
      .attr('y', -15)
      .text('Global mean sea level change since the year 2000');
    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('y', h / 2)
      .attr('x', -50)
      .text('Change in global mean sea level')
      .attr('transform', 'rotate(270 ' + -50 + ' ' + h / 2 + ')');

    //setting up the tooltip
    const tooltip = d3.select('#dat_id')
      .style("opacity", 1)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    // setup the event when first mousing over a datum
    const mouseover = function (event, d) {
      audioTune.play();
      d3.select(event.currentTarget).style("fill", "red");
      tooltip
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1);
      d3.select(event.currentTarget)
        .transition()
        .duration(350)
        .attr('r', 4);
    }
    // setup the event when moving the mouse
    const mousemove = function (event, d) {
      tooltip.selectAll('*').remove();
      tooltip
        .append('rect')
        .attr('width', 325 + parseInt(d[1].toString().length, 10) * 9)
        .attr('height', 20)
        .attr('stroke', 'black')
        .attr('fill', '#E5FEFF')
      tooltip
        .attr('x', event.pageX / 2)
        .attr('y', event.pageY / 2 + 100)
        .append('text')
        .attr('y', 15)
        .text(`The sea level in ${parseInt(d[0])} relative to 2000 levels is: ${d[1]}.`); /*
          .attr('x', 3*w/4)
          .attr('y', h+50);*/
    }
    // setup the event when first leaving a datum
    const mouseleave = function (event, d) {
      d3.select(event.currentTarget).style("fill", "green");
      d3.select(event.currentTarget)
        .transition()
        .duration(350)
        .attr('r', 2);
      tooltip
        .transition()
        .duration(350)
        .style("opacity", 0);
    }

    // setup the actual data points onto the graph
    svg.append('g')
      .selectAll("dot")
      .data(data0)
      .enter()
      .append("circle")
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 2)
      .style("fill", "#69b3a2")
      .style("opacity", 0.7)
      .style("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
    // setup the actual data points onto the graph
    svg.append('g')
      .selectAll("dot")
      .data(data1)
      .enter()
      .append("circle")
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 2)
      .style("fill", "#69b3a2")
      .style("opacity", 0.7)
      .style("stroke", "green")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
    // setup the actual data points onto the graph
    svg.append('g')
      .selectAll("dot")
      .data(data2)
      .enter()
      .append("circle")
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 2)
      .style("fill", "#69b3a2")
      .style("opacity", 0.7)
      .style("stroke", "red")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
    // setup the actual data points onto the graph
    svg.append('g')
      .selectAll("dot")
      .data(data3)
      .enter()
      .append("circle")
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 2)
      .style("fill", "#69b3a2")
      .style("opacity", 0.7)
      .style("stroke", "orange")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }, [data0]);

  return (
    // setup the graph and its tooltip svg
    <svg id='svg_id'><g>
      <svg id='dat_id'></svg></g>
    </svg>
  );
}
