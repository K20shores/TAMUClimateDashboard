import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
// import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import avatar from "assets/img/faces/marc.jpg";

const statements = [
  {
    title: "fact",
    statements: "Dogs are cats",
    validity: false,
    image: "something",
  },

  {
    title: "fact 2",
    statements: "Dogs are cats",
    validity: false,
    image: "something",
  },
];

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
  const [ShowFact, setShowFact] = React.useState(false);
  const [WhichFact, setFact] = React.useState(0);

  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
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
              <h2>{statements[WhichFact].title}</h2>
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
            <Button color="success" onClick={() => setShowFact(true)}>
              Fact
            </Button>
            <Snackbar
              place="tr"
              color="info"
              message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
              open={ShowFact}
              closeNotification={() => setShowFact(false)}
              close
            />
            <Button color="danger">Fiction</Button>
            <Button color="info" onClick={() => setFact(WhichFact + 1)}>
              Next fact
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
