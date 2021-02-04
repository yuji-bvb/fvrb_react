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
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import PeopleIcon from "@material-ui/icons/People";
import { selectAskList, selectInbox } from "../profile/profileSlice";
import { FcGoogle } from "react-icons/fc";

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
            <IconButton
              aria-label="go to map"
              color="inherit"
              className={styles.g_btn}
            >
              <Tooltip title="おすすめスポット！">
                <Button
                  className={styles.react_icons_btn}
                  onClick={() => (window.location.href = "/map")}
                >
                  <FcGoogle className={styles.react_icons} />
                </Button>
              </Tooltip>
            </IconButton>

            <IconButton aria-label="show mails" color="inherit">
              <Tooltip title="ダイレクトメール">
                <a href="#mail">
                  <Badge badgeContent={inbox.length} color="secondary">
                    <MailIcon />
                  </Badge>
                </a>
              </Tooltip>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Tooltip title="友達">
                <a href="#friend">
                  <Badge badgeContent={askList.length} color="secondary">
                    <PeopleIcon />
                  </Badge>
                </a>
              </Tooltip>
            </IconButton>
          </div>
          <div>
            <button className={styles.app__iconLogout} onClick={Logout}>
              <Tooltip title="ログアウト">
                <ExitToAppIcon fontSize="large" />
              </Tooltip>
            </button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
