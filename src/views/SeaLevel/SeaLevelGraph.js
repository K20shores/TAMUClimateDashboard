/*eslint-disable*/
import React from "react";

// Import components for data visualizations using d3
import { useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import { makeStyles } from "@material-ui/core/styles";
import dataFile from 'assets/csv/sealevels.csv';

const styles = {
  point: {
    opacity: 0.7,
    width: 4,
    height: 4,
    stroke: 'gray',
    transition: 'all .2s ease-in-out',
    "&:hover": {
      width: 10,
      height: 10,
    },
  },
  topex: {
    fill: '#84a49c',
    "&:hover": {
      fill: "#f4dcd4",
    },
  },
  jason1: {
    fill: '#f48484',
    "&:hover": {
      fill: "#f4dcd4",
    },
  },
  jason2: {
    fill: '#3c3444',
    "&:hover": {
      fill: "#f4dcd4",
    },
  },
  jason3: {
    fill: '#f4bc64',
    "&:hover": {
      fill: "#f4dcd4",
    },
  },
};

const useStyles = makeStyles(styles);

export default function SeaLevelGraph(props) {
  const classes = useStyles();
  let canvas = useRef(null);
  let tooltipSvg = useRef(null);
  let [showInfo, setShowInfo] = useState(false);
  // React.useEffect(function effectFunction() {
  //   if (showInfo) {
  //     openTune.play();
  //   } else {
  //     closeTune.play();
  //   }
  // }, [showInfo]);

  let mmToInches = 0.0393701;
  const w = screen.width*0.8;
  const h = 400;
  let xScale = d3.scaleLinear()
    .domain([1993, 2022])
    .range([0, w]);

  const yScale = d3.scaleLinear()
    .domain([-25 * mmToInches, 80 * mmToInches])
    .range([h, 0]);

  // Declare important things for audio "pop" sound
  const audioTune = new Audio('');
  const openTune = new Audio('');
  const closeTune = new Audio('');
  const [playInLoop, setPlayInLoop] = useState(false);
  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])
  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])

  // set up the graph to display data
  useEffect(() => {
    drawGraph()
  }, [
    canvas.current, 
    props.data.topex_arr
  ]);

  function drawGraph() {
    // setting up container
    const svg = d3.select(canvas.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-bottom', '50px')
      .style('margin-left', '30px')


    addAxes(svg, xScale, yScale);

    console.log(props.data)
    if (props.data.topex_arr.length > 0) {
      plotData(svg, props.data.topex_arr, `${classes.point} ${classes.topex}`)
      plotData(svg, props.data.jason1_arr, `${classes.point} ${classes.jason1}`)
      plotData(svg, props.data.jason2_arr, `${classes.point} ${classes.jason2}`)
      plotData(svg, props.data.jason3_arr, `${classes.point} ${classes.jason3}`)
    }
  }

  function addAxes(svg, xScale, yScale) {
    const xAxis = d3.axisBottom(xScale).ticks(8);
    svg.append('g')
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);
    const yAxis = d3.axisLeft(yScale).ticks(12);
    svg.append('g')
      .call(yAxis);

    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('x', w / 2)
      .attr('y', h + 50)
      .text('Year');

    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('y', 210)
      .attr('x', -50)
      .text('Change in global mean sea level')
      .attr('transform', 'rotate(270 ' + -50 + ' ' + h / 2 + ')');
  }

  function plotData(svg, data, group) {
    svg.append('g')
      .selectAll(group)
      .data(data)
      .join('rect')
        .attr('x', d => { return xScale(d.year) })
        .attr('y', d => { return yScale(d.data * mmToInches) })
        .attr('class', group)
      .style("align-content", 'center');
      // .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      // .on("mouseleave", mouseleave);
  }

  // setup the tooltip
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
    tooltip
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);
    d3.select(event.currentTarget)
      .transition()
      .duration(350)
      .attr('width', 8)
      .attr('height', 8);
  }
  // setup the event when moving the mouse
  const mousemove = function (event, d) {
    tooltip.selectAll('*').remove();
    tooltip
      .append('rect')
      .attr('width', 325 + parseInt((d[1]+"").length, 10) * 9)
      .attr('height', 20)
      .attr('stroke', 'black')
      .attr('fill', '#E5FEFF')
    tooltip
      .attr('x', event.pageX / 2)
      .attr('y', event.pageY / 2 + 100)
      .append('text')
      .attr('y', 15)
      .text(`The sea level in ${parseInt(d[0])} relative to 2000 levels is: ${d[1]}.`)
        .attr('x', 3*w/4)
        .attr('y', h+50);
  }
  // setup the event when first leaving a datum
  const mouseleave = function (event, d) {
    d3.select(event.currentTarget)
      .transition()
      .duration(350)
      .attr('width', 4)
      .attr('height', 4);
    tooltip
      .transition()
      .duration(350)
      .style("opacity", 0);
  }

  return (
    // setup the graph and its tooltip svg
    <>
      <center>
      <div id='graph title' style={{fontSize:'24pt', marginBottom:'20px'}}>
      Sea Levels from 1992 to 2021
      </div>
      </center>
      {showInfo &&
      <center>
      <div id='caption' style={{maxWidth:'85%', fontSize:'12pt', background:'-webkit-radial-gradient(center, ellipse cover, rgba(183, 223, 235, 0.5) 0%, rgba(183, 223, 235, 0) 80%)', borderRadius:'25px'}}>
      Satellite altimeters prove themselves to be a valuable tool for climate change researchers by providing a near-global coverage 
      of the ocean sea-levels for nearly the past three decades [1]. As these satellites get older and they yield more data, the 
      influence of short-term variability is reduced, and a clear trend associated with our human activity may emerge [1]. Some 
      places, like the northeastern Pacific near Hawaii, seem particularly noteable for researchers due to their strange sea-level 
      variations over the past three decades [1]. The measured trends in these regions are still impacted by short-term, natural changes; 
      however, with more and more data the impact of human-related activities can be better understood. The satellite altimeter record of 
      sea-level change derives from data provided by satellite altimeters including the Envisat, TOPEX/Poseiden, Jason-1, OSTM/Jason-2, 
      and Jason-3.
      </div>
      </center>
      }
      <center>
      <svg id='svg_id' onClick={() => {setShowInfo(!showInfo)}} ref={canvas} width="100%">
      </svg></center>
      {showInfo &&
      <center>
      <div id='caption' style={{maxWidth:'60%', fontSize:'8pt', background:'-webkit-radial-gradient(center, ellipse cover, rgba(183, 223, 235, 0.5) 0%, rgba(183, 223, 235, 0) 80%)', borderRadius:'20px'}}>
        This graph shows the observed sea-level change since the start of the satellite altimeter record in 1993 (black line). 
        The red and blue lines represent independent estimates of contributions to the sea-level rise: thermal expansion due to 
        global heating (red) and added water due mostly to meltwater from glaciers (blue). Added together (purple line), the 
        estimates track the changes in the sea level very well. This indicates to researchers that they are on the right track! 
        NOAA Climate.gov graphic, adapted from Figure 3.15a in State of the Climate in 2018 [2].
      </div>
      </center>
      }
    </>
  );
}