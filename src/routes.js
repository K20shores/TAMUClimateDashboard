/*eslint-disable*/
/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import GreenhouseGases from "views/GreenhouseGases/GreenhouseGases.js";
import FactorFiction from "views/FactorFiction/FactorFiction.js";
import Typography from "views/Typography/Typography.js";
import SeaLevel from "views/SeaLevel/SeaLevel.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import AboutUs from "views/AboutUs/AboutUs.js";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin",
  // },
  {
    path: "/GreenhouseGases",
    name: "Greenhouse Gases",
    icon: Person,
    component: GreenhouseGases,
    layout: "/admin",
  },
  {
    path: "/FactorFiction",
    name: "Fact or Fiction",
    icon: "fact_check",
    component: FactorFiction,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin",
  // },
  {
    path: "/SeaLevel",
    name: "Sea Level Rise",
    icon: BubbleChart,
    component: SeaLevel,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/about-us",
  //   name: "About Us",
  //   icon: People,
  //   component: AboutUs,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
