import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./profile.module.css";
import Modal from "react-modal";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Hidden,
  Grid,
  Link,
} from "@material-ui/core";
import {
  fetchAsyncRequestFriend,
  selectProfile,
} from "../profile/profileSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    maxWidth: "100%",
  },
  media: {
    [theme.breakpoints.down("sm")]: {
      height: "60vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
    },
    height: "65vh",
  },
}));

const roadbike = {
  content: {
    backgroundColor: "#292f35",
    marginTop: 10,
    padding: 5,
  },
};

const Profile = ({ profileData, askData }) => {
  const apiUrl = process.env.REACT_APP_DEV_API_URL;
  const classes = useStyles();
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const gearUrl = `https://www.google.com/search?q=${profileData.favGear}`;
  const courseUrl = `https://www.google.com/search?q=${profileData.favCourse}`;
  const shopUrl = `https://www.google.com/search?q=${profileData.favShop}`;
  const frameUrl = `https://www.google.com/search?q=${profileData.frame}`;
  const wheelUrl = `https://www.google.com/search?q=${profileData.wheel}`;
  const compoUrl = `https://www.google.com/search?q=${profileData.compo}`;

  const newRequest = async () => {
    const askUploadData = new FormData();
    askUploadData.append("askTo", profileData.userPro);
    dispatch(fetchAsyncRequestFriend(askUploadData));
  };

  return (
    <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
      {profileData.img ? (
        <CardMedia
          style={{ width: "100%", cursor: "pointer" }}
          image={profileData.img ? profileData.img : ""}
          onClick={() => setModalIsOpen(true)}
        />
      ) : (
        <CardMedia
          style={{ width: "100%" }}
          image={`${apiUrl}media/image/null.png`}
        />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={roadbike}
      >
        <Typography
          className={styles.modal_title}
          variant="h3"
          color="textPrimary"
          component="p"
        >
          {profileData.nickName}'s Favorite Bicycle
        </Typography>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={profileData.img} />

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={12} md={5}>
                <Typography variant="h6" color="textSecondary" component="p">
                  FRAME :{" "}
                  <Hidden smUp>
                    <br />
                  </Hidden>
                  {profileData.frameBrand_item}{" "}
                  <Link href={frameUrl}>{profileData.frame}</Link>
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  COMPO :{" "}
                  <Hidden smUp>
                    <br />
                  </Hidden>
                  {profileData.component_name}{" "}
                  <Link href={compoUrl}>{profileData.compo}</Link>
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  WHEEL :{" "}
                  <Hidden smUp>
                    <br />
                  </Hidden>
                  {profileData.wheelBrand_item}{" "}
                  <Link href={wheelUrl}>{profileData.wheel}</Link>
                </Typography>
              </Grid>
              <Grid itemxs={12} sm={12} md={5}>
                <Typography variant="h6" color="textSecondary" component="p">
                  FavCourse:{" "}
                  <Hidden smUp>
                    <br />
                  </Hidden>
                  <Link href={courseUrl}>{profileData.favCourse}</Link>
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  FavGear:{" "}
                  <Hidden smUp>
                    <br />
                  </Hidden>
                  <Link href={gearUrl}>{profileData.favGear}</Link>
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  FavShop:{" "}
                  <Hidden smUp>
                    <br />
                  </Hidden>
                  <Link href={shopUrl}>{profileData.favShop}</Link>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>

      <CardContent style={{ padding: 5 }}>
        <Typography variant="h6">{profileData.nickName}</Typography>
        <Typography>{profileData.created_on}</Typography>
        {!askData[0] && profile ? (
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => newRequest()}
          >
            Friend Request
          </Button>
        ) : (
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            disabled
          >
            Friend Request
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
