/*eslint-disable*/
import React from "react";

// Import components for data visualizations using d3
import { useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import dataFile from 'assets/csv/sealevels.csv';

export default function SeaLevelGraph(props) {
  let canvas = useRef(null);
  let tooltipSvg = useRef(null);
  let mmToInches = 0.0393701;
  const w = 800;
  const h = 400;

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

  // set up the graph to display data
  useEffect(() => {
    drawGraph()
  }, [
    canvas.current, 
  ]);

  function drawGraph() {
    // setting up container
    const svg = d3.select(canvas.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top', '100px')
      .style('margin-left', '100px')
      .style('margin-bottom', '5em')

    // setting up scaling
    const xScale = d3.scaleLinear()
      .domain([1992, 2021])
      .range([0, w]);

    const yScale = d3.scaleLinear()
      .domain([80, -25])
      .range([h, 0]);

    addAxes(svg, xScale, yScale);

    svg.append('g')
      .selectAll("dots")
      .data(props.data.topex_arr)
      .join("circle")
        .attr('cx', d => {
          console.log(d[0], xScale(d[0]))
          return xScale(d[0])
        }
        )
        .attr('cy', d => {
          console.log(d[1], yScale(d[1]))
          return yScale(d[1])
        }
        )
        .attr('r', 2)
        .style("fill", "#69b3a2")
        .style("opacity", 0.7)
        .style("stroke", "black")
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
      .attr('x', w / 2)
      .attr('y', -15)
      .text('Global mean sea level change since the year 2000');

    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('y', h / 2)
      .attr('x', -50)
      .text('Change in global mean sea level')
      .attr('transform', 'rotate(270 ' + -50 + ' ' + h / 2 + ')');
  }

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

  return (
    // setup the graph and its tooltip svg
    <svg id='svg_id' ref={canvas}>
    </svg>
  );
}
