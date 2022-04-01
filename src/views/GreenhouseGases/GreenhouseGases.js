/*eslint-disable*/
import React from "react";
import * as d3 from 'd3';
import { usePapaParse } from "react-papaparse";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CO2Graph from "./CO2Graph";
import dataFile from "assets/csv/co2data.csv";
import { useState, useEffect } from "react";
import Spectrum from "assets/img/WLSpectrum.jpg";
import GasConcentration from "assets/img/GlobalGas2015.png";
import USGasBD from "assets/img/USGasBD.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "50px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "26pt",
    marginBottom: "6px",
    textDecoration: "none",
  },
  WAGG: {
    color: "#000000",
    fontWeight: "300",
    fontSize: "20pt",
  },
  WAGGD: {
    fontSize: "16pt",
  },
  GGC: {
    fontSize: "20pt",
    fontWeight: "300",
  },
  CIGG: {
    fontSize: "20pt",
    fontWeight: "300",
  },
  MORAG: {
    fontSize: "20px",
    fontWeight: "300",
  },
};

const useStyles = makeStyles(styles);

export default function GreenhouseGases() {
  const [data, setData] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const classes = useStyles();
  useEffect(() => {
    d3.csv(dataFile).then((d) => {
        const parseDate = d3.timeParse("%m/%d/%Y");
        d.forEach((i) => {
            i.Datetime = parseDate(i.Datetime);
            i.average = Number(i.average);
        });
        setData(d);
    });
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Greenhouse Gases</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <p className={classes.WAGG}>What are Greenhouse Gases?</p>
              <p className={classes.WAGGD}>Greenhouse Gases are gases that produce 
              the greenhouse effect. The greenhouse effect is when gases in the atmosphere 
              trap heat that is produced by the Sun. The Sun emits radiant light waves that 
              hit and warm the earth and then bounce off of it in the form of invisible infrared 
              light waves. The greenhouse effect occurs when the waves are trapped by gases in 
              the atmosphere on their way out. This greenhouse effect causes the earth to heat 
              up even more.</p>
              <img src={Spectrum} alt="Spectrum" />
              <p className={classes.GGC}>Concentration of Greenhouse Gases</p>
              <img src={GasConcentration} alt="GasConcentration"/>
              <p className={classes.CIGG}>
                Causes of Increase of Greenhouse Gases
              </p>
              <p className={classes.MORAG}>
              Humans have increased the concentration of greenhouse gases significantly. 
              Carbon dioxide accounts for over 75% of human caused emissions into the atmosphere. 
              This occurs from things like the burning of oil, coal and gas, and deforestation.
              </p>
              <img src={USGasBD} alt="USGasBD" style={{width:"32%"}} />
              <CO2Graph
                data = {data}
                style={{maxWidth:'75%'}}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
