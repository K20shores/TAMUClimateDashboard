/*eslint-disable*/
import React from "react";

// Import components for data visualizations using d3
import { useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  point: {
    opacity: 0.7,
    width: 4,
    height: 4,
    stroke: 'gray',
    transition: 'all .2s ease-in-out',
    "&:hover": {
      width: 15,
      height: 15,
    },
  },
  co2: {
    fill: '#84a49c',
    "&:hover": {
      fill: "#f4dcd4",
    },
  },
};

const useStyles = makeStyles(styles);

export default function CO2Graph(props) {
  const classes = useStyles();
  let canvas = useRef(null);
  let tooltipRef = useRef(null);
  let [showInfo, setShowInfo] = useState(false);
  const formatDate = d3.timeFormat("%b %Y");

  const w = props.width * .8;
  const h = 400;
  // https://sharkcoder.com/data-visualization/d3-react
  const xScale = d3.scaleTime()
    .domain(d3.extent(props.data, function(d) {
      return new Date(d.Datetime);
    }))
    .range([0,w]);

  const yMinValue = d3.min(props.data, (d) => d.average), yMaxValue = d3.max(props.data, (d) => d.average);
  const yScale = d3.scaleLinear()
    .domain([yMinValue, yMaxValue])
    .range([h, 0]);

  useEffect(() => {
    drawGraph()
  }, [
    canvas.current, props.data 
  ]);

  function drawGraph() {
    // setting up container
    const svg = d3.select(canvas.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-left', '100px')
      .style('margin-bottom', '50px')
    d3.select(tooltipRef.current)
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    addAxes(svg, xScale, yScale);

    if (props) {
      plotData(svg, props.data, `${classes.point} ${classes.co2}`)
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
      .attr('y', h / 2)
      .attr('x', -50)
      .text('Global Monthly CO2')
      .attr('transform', 'rotate(270 ' + -50 + ' ' + h / 2 + ')');
  }

  function plotData(svg, data, group) {
    svg.append('g')
      .selectAll(group)
      .data(data)
      .join('rect')
        .attr('x', d => { 
          return xScale(d.Datetime) 
        })
        .attr('y', d => { 
          return yScale(d.average) 
        })
        .attr('class', group)
      .style("align-content", 'center')
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }

  // setup the event when first mousing over a datum
  const mouseover = function (event, d) {
    const tooltip = d3.select(tooltipRef.current);
    tooltip
      .style("opacity", 0)
      .transition()
      .duration(100)
      .style("opacity", 1);
  }
  // setup the event when moving the mouse
  const mousemove = function (event, d) {
    const [x, y] = d3.pointer(event)
    const tooltip = d3.select(tooltipRef.current);
    tooltip.selectAll('*').remove();
    tooltip
      .append('text')
        .text(`${d.average} ppm on ${formatDate(d.Datetime)}`)
        .attr('x', 10)
        .attr('y', 20)
        .attr("font-size", "2em")
        .attr("color", "black")
  }
  // setup the event when first leaving a datum
  const mouseleave = function (event, d) {
    const tooltip = d3.select(tooltipRef.current);
    tooltip
      .transition()
      .duration(150)
      .style("opacity", 0);
  }

  return (
    // setup the graph and its tooltip svg
    <>
      <center>
      <div id='graph title' style={{fontSize:'24pt', marginBottom:'20px'}}>
      Monthly Average CO2
      </div>
      </center>
      {showInfo &&
      <center>
      <div id='caption' style={{maxWidth:'85%', fontSize:'12pt', background:'-webkit-radial-gradient(center, ellipse cover, rgba(183, 223, 235, 0.5) 0%, rgba(183, 223, 235, 0) 80%)', borderRadius:'25px'}}>
      Humans have increased the concentration of greenhouse gases significantly. 
      Carbon dioxide accounts for over 75% of human caused emissions into the atmosphere. 
      This occurs from things like the burning of oil, coal and gas, and deforestation.
      </div>
      </center>
      }
      <svg id='svg_id' onClick={() => {setShowInfo(!showInfo)}} ref={canvas}>
        <svg id='tooltip' ref={tooltipRef}/>
      </svg>
      {showInfo &&
      <center>
      <div id='caption' style={{maxWidth:'60%', fontSize:'14pt', background:'-webkit-radial-gradient(center, ellipse cover, rgba(183, 223, 235, 0.5) 0%, rgba(183, 223, 235, 0) 80%)', borderRadius:'20px'}}>
        This graph shows the "average monthly Carbon Dioxide globally over marine surface sites'-NOAA.
      </div>
      </center>
      }
    </>
  );
}
