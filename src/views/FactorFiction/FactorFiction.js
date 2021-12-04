import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function FactorFiction() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Fact or Fiction</h4>
            <p className={classes.cardCategoryWhite}>
              Determine if these statements on climate change are factual or
              not!
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.typo}>
              <div className={classes.note}></div>
              <h2>Statement</h2>
            </div>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img src={avatar} alt="..." />
            </a>
            <div className={classes.typo}>
              <div className={classes.note}></div>
              <p>
                Sample paragraph containing a percieved factual statement about
                climate change. Users must determine whether it is actually true
                or not.
              </p>
            </div>
            <Button color="success">Fact</Button>
            <Button color="danger">Fiction</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
