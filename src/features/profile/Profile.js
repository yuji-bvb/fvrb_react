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
            <Typography variant="h6" color="textSecondary" component="p">
              FRAME :{" "}
              <Hidden smUp>
                <br />
              </Hidden>
              {profileData.frameBrand_item} {profileData.frame}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              COMPO :{" "}
              <Hidden smUp>
                <br />
              </Hidden>
              {profileData.component_name} {profileData.compo}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              WHEEL :{" "}
              <Hidden smUp>
                <br />
              </Hidden>
              {profileData.wheelBrand_item} {profileData.wheel}
            </Typography>
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
