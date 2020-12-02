import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./friend.module.css";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TextField } from "@material-ui/core";
import { RiMailAddLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import {
  fetchAsyncApproval,
  fetchAsyncSendDM,
  fetchAsyncRequestFriend,
} from "./profileSlice";

const useStyles = makeStyles((theme) => ({
  text: {
    width: 250,
    maxWidth: "100%",
    margin: theme.spacing(3),
  },
}));

const Friend = ({ ask, prof }) => {
  const classes = useStyles();
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  //modalサイズ
  const letter = {
    content: {
      backgroundColor: "#292f35",
      width: 300,
      height: 200,
      maxWidth: "100%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  };
  // modal内入力
  const handleInputChange = () => (event) => {
    const value = event.target.value;
    setText(value);
  };
  //DM送信
  const sendDM = () => {
    const uploadDM = new FormData();
    uploadDM.append("receiver", ask.askFrom);
    uploadDM.append("message", text);
    dispatch(fetchAsyncSendDM(uploadDM));
    setModalIsOpen(false);
  };
  //友達承認
  const changeApproval = async () => {
    const packet = {
      id: ask.id,
      askTo: ask.askTo,
    };
    await dispatch(fetchAsyncApproval(packet));
    if (fetchAsyncApproval.fulfilled) {
      const askUploadData = new FormData();
      askUploadData.append("askTo", ask.askFrom);
      askUploadData.append("approved", true);
      await dispatch(fetchAsyncRequestFriend(askUploadData));
    }
  };

  return (
    <li className={styles.list_item}>
      {prof[0] ? (
        <Typography variant="h6" className={classes.name}>
          {prof[0].nickName}
        </Typography>
      ) : (
        <h4>0</h4>
      )}
      {!ask.approved ? (
        <Button
          size="small"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => changeApproval()}
        >
          Approve
        </Button>
      ) : (
        <button className={styles.mail} onClick={() => setModalIsOpen(true)}>
          <RiMailAddLine />
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={letter}
      >
        <Typography variant="h5" className={styles.modal_title}>
          Message
        </Typography>
        <TextField
          className={classes.text}
          type="text"
          focused={true}
          onChange={handleInputChange()}
        />
        <br />
        <div className={styles.btn_posi}>
          <button
            className={styles.btn_modal}
            onClick={() => setModalIsOpen(false)}
          >
            <IoMdClose />
          </button>
          <button className={styles.btn_modal} onClick={() => sendDM()}>
            <IoIosSend />
          </button>
        </div>
      </Modal>
    </li>
  );
};

export default Friend;
