import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";

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
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar",
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit",
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)",
    },
    "& td, & th": {
      display: "table-cell",
    },
  },
  center: {
    textAlign: "center",
  },
  noMargin: {
    margin: "unset",
  },
};

const useStyles = makeStyles(styles);

export default function AboutUs() {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Who We Are</h4>
            <p className={classes.cardCategoryWhite}>
              Read about the team who made this dashboard
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.tableUpgradeWrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th />
                    <th />
                    <th className={classes.center}>Biography</th>
                    <th className={classes.center}>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kyle Shores</td>
                    <td>
                      <CardAvatar className={classes.noMargin} profile>
                        <img src={avatar} alt="..." />
                      </CardAvatar>
                    </td>
                    <td className={classes.center}>30</td>
                    <td className={classes.center}>200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
