import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TwitterShareButton } from "react-twitter-embed";
import styles from "./myProfile.module.css";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DetailsIcon from "@material-ui/icons/Details";
import { MdAddAPhoto } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Fab,
  Button,
  Hidden,
  InputAdornment,
} from "@material-ui/core";

import { fetchCredEnd, fetchCredStart } from "../auth/authSlice";
import {
  selectProfile,
  fetchAsyncUpdateProfile,
  fetchAsyncDeleteProfile,
  selectFrameBrand,
  selectWheelBrand,
  selectEditedProfile,
  editProfile,
  fetchAsyncGetMyProfile,
  fetchAsyncCreateFrameBrand,
  fetchAsyncCreatewheelBrand,
} from "./profileSlice";

const useStyles = makeStyles((theme) => ({
  profile: {
    textAlign: "center",
    "& .profile-image": {
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: 365,
      },
      [theme.breakpoints.up("lg")]: {
        width: "85%",
        height: 350,
      },
      [theme.breakpoints.up("xl")]: {
        width: "100%",
        height: 500,
        margin: 0,
      },
      objectFit: "containe",
    },
    "& .profile-details": {
      "& span, svg": {
        verticalAlign: "middle",
        color: "lightgrey",
      },
      MdAddAPhoto: {
        fontSize: 30,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 7px 0",
    },
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
    maxHeight: "100%",
  },
  centerAdornmentF: {
    marginLeft: "30%",
  },
  centerAdornmentC: {
    marginLeft: "30%",
  },
  centerAdornmentW: {
    marginLeft: "25%",
  },
  centerAdornmentO: {
    marginLeft: "15%",
  },
  centerText: {
    textAlign: "center",
  },
}));

const myRoadbike = {
  content: {
    backgroundColor: "#292f38",
    marginTop: 15,
    padding: 5,
  },
};
const createBrand = {
  content: {
    backgroundColor: "#292f38",
    width: 300,
    height: 200,
    maxWidth: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
};
const hatena = {
  content: {
    backgroundColor: "#292f38",
    width: 300,
    height: 300,
    maxWidth: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
};

const MyProfile = () => {
  const apiUrl = process.env.REACT_APP_DEV_API_URL;
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const frameBrand = useSelector(selectFrameBrand);
  const wheelBrand = useSelector(selectWheelBrand);
  const editedProfile = useSelector(selectEditedProfile);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [modalIsOpen4, setModalIsOpen4] = useState(false);
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [openDetail, setOpenDetail] = useState(false);

  const updateProfile = async (e) => {
    await dispatch(fetchCredStart());
    e.preventDefault();
    const packet = {
      id: editedProfile.id,
      nickName: editedProfile.nickName,
      frameBrand: editedProfile.frameBrand,
      frame: editedProfile.frame,
      component: editedProfile.component,
      compo: editedProfile.compo,
      wheelBrand: editedProfile.wheelBrand,
      wheel: editedProfile.wheel,
      img: image,
      favCourse: editedProfile.favCourse,
      favGear: editedProfile.favGear,
      favShop: editedProfile.favShop,
      purchase: editedProfile.purchase,
    };
    await dispatch(fetchAsyncUpdateProfile(packet));
    await dispatch(fetchAsyncGetMyProfile());
    await dispatch(fetchCredEnd());
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleInputChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    dispatch(editProfile({ ...editedProfile, [name]: value }));
  };

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const kara = () => setInputText("");

  let frameOptions = frameBrand.map((frame) => (
    <MenuItem key={frame.id} value={frame.id}>
      {frame.item}
    </MenuItem>
  ));

  let wheelOptions = wheelBrand.map((wheel) => (
    <MenuItem key={wheel.id} value={wheel.id}>
      {wheel.item}
    </MenuItem>
  ));

  return (
    <>
      <div className={classes.profile}>
        <img
          src={profile.img ? editedProfile.img : `${apiUrl}media/image/set.png`}
          alt="profile"
          className="profile-image"
          onClick={() => setModalIsOpen1(true)}
        />

        <Modal
          isOpen={modalIsOpen1}
          onRequestClose={() => setModalIsOpen1(false)}
          style={myRoadbike}
        >
          <Typography
            className={styles.modal_title}
            variant="h3"
            color="textPrimary"
            component="p"
          >
            {profile.nickName}'s Favorite Bicycle
          </Typography>
          <Card className={classes.root}>
            <CardMedia className={classes.media} image={profile.img} />
            <CardContent>
              <Typography variant="h6" color="textSecondary" component="p">
                FRAME :
                <Hidden smUp>
                  <br />
                </Hidden>{" "}
                {profile.frameBrand_item} {profile.frame}
              </Typography>

              <Typography variant="h6" color="textSecondary" component="p">
                COMPO :{" "}
                <Hidden smUp>
                  <br />
                </Hidden>{" "}
                {profile.component_name} {profile.compo}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                WHEEL :{" "}
                <Hidden smUp>
                  <br />
                </Hidden>
                {profile.wheelBrand_item} {profile.wheel}
              </Typography>

              <TwitterShareButton
                url={"https://favoroadbike.com"}
                options={{
                  text: "#fvrb",
                  via: "ロードバイクを自慢しよう",
                }}
                className={styles.twi}
              />
            </CardContent>
          </Card>
        </Modal>
        <div className="profile-details">
          <input
            type="file"
            id="imageInput"
            name="img"
            hidden="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {editedProfile.nickName &&
          editedProfile.frame &&
          editedProfile.compo &&
          editedProfile.wheel ? (
            <IconButton onClick={updateProfile}>
              <FaUserEdit className={styles.icon} />
            </IconButton>
          ) : (
            <IconButton disabled>
              <FaUserEdit
                className={styles.icon}
                style={{ color: "#3a3636" }}
              />
            </IconButton>
          )}
          <IconButton onClick={handleEditPicture}>
            <MdAddAPhoto className={styles.icon} />
          </IconButton>
          <IconButton onClick={() => setModalIsOpen4(true)}>
            <HelpOutlineIcon className={styles.icon} />
          </IconButton>
          <Modal
            isOpen={modalIsOpen4}
            onRequestClose={() => setModalIsOpen4(false)}
            style={hatena}
          >
            <div>
              <div className={styles.modal_hatena_con_non}>
                <CheckCircleOutlineIcon className={styles.icon} />
                自分のロードバイクの情報を入力！
              </div>
              <div className={styles.modal_hatena_sm}>
                <small>※メーカーがリストにない時は＋で登録</small>
              </div>
              <div className={styles.modal_hatena_con}>
                <CheckCircleOutlineIcon className={styles.icon} />
                カメラアイコンを押して写真を登録！
              </div>
              <div className={styles.modal_hatena_con_non}>
                <CheckCircleOutlineIcon className={styles.icon} />
                カメラの左のアイコンを押して保存！
              </div>
              <div className={styles.modal_hatena_sm}>
                <small>※保存しないと写真は反映されません</small>
              </div>
              <div className={styles.modal_hatena_con}>
                <CheckCircleOutlineIcon className={styles.icon} />
                自転車アイコンを押すと愛車が見られます！スクショしてツイートしよう！
              </div>
              <div className={styles.modal_hatena_con}>
                <CheckCircleOutlineIcon className={styles.icon} />
                気になる写真はクリックすると詳細が見られます！
              </div>
              <div className={styles.modal_hatena_con}>
                <CheckCircleOutlineIcon className={styles.icon} />
                友達になればメッセージも送れます！
              </div>
            </div>
          </Modal>
          <TextField
            type="text"
            value={editedProfile.nickName}
            style={{ marginTop: 7, width: 120 }}
            name="nickName"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  classes={{ positionStart: classes.centerAdornmentW }}
                  style={{ textAlign: "center" }}
                >
                  <></>
                </InputAdornment>
              ),
            }}
          />
          <hr />
          <Typography variant="h4" component="h4">
            <Fab
              size="small"
              color="primary"
              onClick={() => setModalIsOpen2(true)}
              style={{ marginRight: 10, marginBottom: 5 }}
            >
              <AddIcon />
            </Fab>
            FRAME
          </Typography>
          <Modal
            isOpen={modalIsOpen2}
            onRequestClose={() => setModalIsOpen2(false)}
            style={createBrand}
          >
            <div className={styles.modal_add}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="New FrameBrand"
                type="text"
                focused={true}
                value={inputText}
                onChange={handleInputTextChange}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
                onClick={() => {
                  dispatch(fetchAsyncCreateFrameBrand(inputText));
                  kara();
                  setModalIsOpen2(false);
                }}
              >
                SAVE
              </Button>
            </div>
          </Modal>

          <TextField
            variant="outlined"
            className={styles.text_size}
            select
            value={editedProfile.frameBrand}
            name="frameBrand"
            onChange={handleInputChange}
          >
            {frameOptions}
          </TextField>

          <Hidden xsUp>
            <br />
          </Hidden>
          <TextField
            variant="outlined"
            className={styles.text_size}
            type="text"
            value={editedProfile.frame}
            name="frame"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  classes={{ positionStart: classes.centerAdornmentF }}
                  style={{ textAlign: "center" }}
                >
                  <></>
                </InputAdornment>
              ),
            }}
          />
          <hr />
          <Typography variant="h4" component="h4">
            COMPO
          </Typography>
          <TextField
            variant="outlined"
            className={styles.text_size}
            select
            value={editedProfile.component}
            name="component"
            onChange={handleInputChange}
          >
            <MenuItem value={1}>SHIMANO</MenuItem>
            <MenuItem value={2}>SRAM</MenuItem>
            <MenuItem value={3}>CAMPAGNOLO</MenuItem>
          </TextField>

          <Hidden xsUp>
            <br />
          </Hidden>
          <TextField
            variant="outlined"
            className={styles.text_size}
            type="text"
            value={editedProfile.compo}
            name="compo"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  classes={{ positionStart: classes.centerAdornmentC }}
                  style={{ textAlign: "center" }}
                >
                  <></>
                </InputAdornment>
              ),
            }}
          />
          <hr />
          <Typography variant="h4" component="h4">
            <Fab
              size="small"
              color="primary"
              onClick={() => setModalIsOpen3(true)}
              style={{ marginRight: 10, marginBottom: 5 }}
            >
              <AddIcon />
            </Fab>
            WHEEL
          </Typography>

          <Modal
            isOpen={modalIsOpen3}
            onRequestClose={() => setModalIsOpen3(false)}
            style={createBrand}
          >
            <div className={styles.modal_add}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="New WheelBrand"
                type="text"
                focused={true}
                value={inputText}
                onChange={handleInputTextChange}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
                onClick={() => {
                  dispatch(fetchAsyncCreatewheelBrand(inputText));
                  kara();
                  setModalIsOpen3(false);
                }}
              >
                SAVE
              </Button>
            </div>
          </Modal>
          <TextField
            variant="outlined"
            className={styles.text_size}
            select
            value={editedProfile.wheelBrand}
            name="wheelBrand"
            onChange={handleInputChange}
          >
            {wheelOptions}
          </TextField>
          <TextField
            variant="outlined"
            className={styles.text_size}
            type="text"
            value={editedProfile.wheel}
            name="wheel"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  classes={{ positionStart: classes.centerAdornmentW }}
                  style={{ textAlign: "center" }}
                >
                  <></>
                </InputAdornment>
              ),
            }}
          />
          <div>
            <DetailsIcon
              className={styles.icon}
              onClick={() => setOpenDetail(!openDetail)}
            />
          </div>
          {openDetail && (
            <>
              <Typography variant="h4" component="h4">
                FavCourse & Gear
              </Typography>
              <TextField
                variant="outlined"
                className={styles.text_size}
                type="text"
                value={editedProfile.favCourse}
                name="favCourse"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      classes={{ positionStart: classes.centerAdornmentO }}
                      style={{ textAlign: "center" }}
                    >
                      <></>
                    </InputAdornment>
                  ),
                }}
              />
              <Hidden xsUp>
                <br />
              </Hidden>
              <TextField
                variant="outlined"
                className={styles.text_size}
                type="text"
                value={editedProfile.favGear}
                name="favGear"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      classes={{ positionStart: classes.centerAdornmentO }}
                      style={{ textAlign: "center" }}
                    >
                      <></>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="h4" component="h4">
                FavShop
              </Typography>
              <TextField
                variant="outlined"
                className={styles.text_size}
                type="text"
                value={editedProfile.favShop}
                name="favShop"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      classes={{ positionStart: classes.centerAdornmentO }}
                      style={{ textAlign: "center" }}
                    >
                      <></>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <form noValidate>
                <TextField
                  variant="outlined"
                  id="date"
                  label="Purchase date"
                  type="date"
                  name="purchase"
                  onChange={handleInputChange}
                  value={editedProfile.purchase}
                  className={styles.text_size}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form> */}
              <div>
                <button
                  className={styles.icon}
                  onClick={() => setModalIsOpen(true)}
                >
                  <BsTrash />
                </button>
              </div>
            </>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={createBrand}
          >
            <Typography variant="h6" className={styles.modal_title}>
              Are you sure you want to permanently
              <br /> delete this profile ?
            </Typography>
            <div className={styles.btn_modal_del}>
              <button
                className={styles.btn_modal_del}
                onClick={() => setModalIsOpen(false)}
              >
                <IoMdClose />
              </button>
              <button
                className={styles.btn_modal_del}
                onClick={() => dispatch(fetchAsyncDeleteProfile(profile.id))}
              >
                <BsTrash />
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <Hidden xsDown>
        <button className={styles.fvrb} onClick={() => setModalIsOpen1(true)}>
          <div>MY</div>
          <DirectionsBikeIcon style={{ fontSize: 110 }} />
        </button>
      </Hidden>
      <Hidden smUp>
        <button className={styles.fvrb} onClick={() => setModalIsOpen1(true)}>
          <DirectionsBikeIcon style={{ fontSize: 40 }} />
        </button>
      </Hidden>
    </>
  );
};

export default MyProfile;
