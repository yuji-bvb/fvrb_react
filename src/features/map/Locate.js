import styles from "./Locate.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";

export default function Locate({ panTo }) {
  return (
    <Tooltip title="現在地">
      <Button
        className={styles.locate}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/compass.svg" alt="compass" />
      </Button>
    </Tooltip>
  );
}
