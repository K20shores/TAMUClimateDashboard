import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  WAGG: {
    color: "#000000",
    fontWeight: "300",
    fontSize: "20px",
  },
  WAGGD: {
    fontSize: "17px",
  },
  GGC: {
    fontSize: "20px",
    fontWeight: "300",
  },
  CIGG: {
    fontSize: "20px",
    fontWeight: "300",
  },
  MORAG: {
    fontSize: "20px",
    fontWeight: "300",
  },
};

const useStyles = makeStyles(styles);

export default function GreenhouseGases() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Greenhouse Gases</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <p className={classes.WAGG}>What are Greenhouse Gases?</p>
              <p className={classes.WAGGD}>Greenhouse Gases are gases that</p>
              <p className={classes.GGC}>Concentration of Greenhouse Gases</p>
              <p className={classes.CIGG}>
                Causes of Increase of Greenhouse Gases
              </p>
              <p className={classes.MORAG}>
                Map of Refineries Around the Globe
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
