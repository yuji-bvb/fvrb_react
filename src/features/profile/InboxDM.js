import React from "react";
import styles from "./inboxDM.module.css";
import { RiUserReceivedLine } from "react-icons/ri";
import { Typography } from "@material-ui/core";

const InboxDM = ({ dm, prof }) => {
  return (
    <li className={styles.list_item}>
      {prof[0] && (
        <Typography variant="h6" className={styles.list_item_mes}>
          {dm.message}
        </Typography>
      )}
      {prof[0] && (
        <Typography variant="h6">
          <RiUserReceivedLine className={styles.badge} />
          {prof[0].nickName}
        </Typography>
      )}
    </li>
  );
};

export default InboxDM;
