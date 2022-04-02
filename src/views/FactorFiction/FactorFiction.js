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

import avatar from "assets/img/faces/snow-leopard.jpg";

const statements = [
  {
    title:
      "Over a million species of animals are at risk of extinction due to climate change.",
    statements: "Dogs are cats",
    validity: true,
    image: "something",
    true_message: "You're correct! This in, in fact, a true statement.",
    false_message: "This actually is a TRUE statement.",
  },

  {
    title:
      "If all the polar ice caps in the world melted, the Earth's sea level would rise by 200 feet.",
    statements: "Dogs are cats",
    validity: true,
    image: "something",
    true_message: "You're correct! This is, in fact, a true statement.",
    false_message: "This actually is a TRUE statement.",
  },

  {
    title: "The Earth's climate has always changed.",
    statements: "Dogs are cats",
    validity: false,
    image: "something",
    true_message: ".",
    false_message:
      "You're correct! This is, in fact, a myth. While the Earth's climate has varied for billions of years, the rapid change we see today isn't natural. The warming we currently see with the Earth's climate would normally take hundreds of thousands of years, but instead has occured over the last few decades due to an increase in green house gases in the Earth's atmosphere. On record, 17 of the 18 warmest years globally have all taken place after 2001.",
  },

  {
    title: "fact 4",
    statements: "Dogs are cats",
    validity: false,
    image: "something",
    true_message: ".",
    false_message: ".",
  },

  {
    title: "fact 5",
    statements: "Dogs are cats",
    validity: false,
    image: "something",
    true_message: ".",
    false_message: ".",
  },

  {
    title: "fact 6",
    statements: "Dogs are cats",
    validity: false,
    image: "something",
    true_message: ".",
    false_message: ".",
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
  const [Answer, setAnswer] = React.useState(false);

  function onNextButtonClick() {
    if (WhichFact < statements.length - 1) {
      setFact(WhichFact + 1);
    } else {
      setFact(0);
    }
  }

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
                Species both on land and in the ocean have insuffiecient
                habitats for long-term survial due to climate change, putting
                them at risk of extinction within the next few decades.
              </p>
            </div>
            <Button
              color="success"
              onClick={() => {
                setAnswer(true == statements[WhichFact].validity);
                setShowFact(true);
              }}
            >
              Fact
            </Button>
            <Snackbar
              place="tr"
              color="info"
              message={
                Answer
                  ? statements[WhichFact].true_message
                  : statements[WhichFact].false_message
              }
              open={ShowFact}
              closeNotification={() => setShowFact(false)}
              close
            />
            <Button
              color="danger"
              onClick={() => {
                setAnswer(false == statements[WhichFact].validity);
                setShowFact(true);
              }}
            >
              Fiction
            </Button>
            <Button color="info" onClick={onNextButtonClick}>
              Next fact
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
