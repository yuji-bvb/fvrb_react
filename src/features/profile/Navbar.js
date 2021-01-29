import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./navbar.module.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailIcon from "@material-ui/icons/Mail";
import PeopleIcon from "@material-ui/icons/People";
import { selectAskList, selectInbox } from "../profile/profileSlice";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
    fontWeight: "bold",
  },
  sectionDesktop: {
    display: "flex",
  },
  sectionMobile: {
    display: "none",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const inbox = useSelector(selectInbox);
  const askList = useSelector(selectAskList);

  const Logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            FAVO ROADBIKE
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={inbox.length} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={askList.length} color="secondary">
                {/* <NotificationsIcon /> */}
                <PeopleIcon />
              </Badge>
            </IconButton>
          </div>
          <div>
            <button className={styles.app__iconLogout} onClick={Logout}>
              <ExitToAppIcon fontSize="large" />
            </button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
