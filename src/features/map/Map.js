import React, { useState, useCallback, useRef } from "react";
import styles from "./Map.module.css";
import Locate from "./Locate";
import PlaceInfo from "./PlaceInfo";
import Hokkaido from "./Polyline/Course/Hokkaido";
import Aomori from "./Polyline/Course/Aomori";
import Kagoshima from "./Polyline/Course/Kagoshima";
import Okinawa from "./Polyline/Course/Okinawa";
import TamaCy from "./Polyline/CyclingRoad/TamaCy";
import Modal from "react-modal";
import Search from "./Search";
import DescriptionIcon from "@material-ui/icons/Description";
import Tooltip from "@material-ui/core/Tooltip";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 35.738544,
  lng: 139.319521,
};

const hatena = {
  content: {
    backgroundColor: "white",
    width: 300,
    height: 350,
    maxWidth: "100%",
    top: "45%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
};

export default function App() {
  Modal.setAppElement("#root");
  const [modalDescription, setModalDescription] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KYE,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <div className={styles.title}>
        <h1>
          Favo Map{" "}
          <span role="img" aria-label="bike">
            🚲
          </span>
        </h1>
      </div>
      <div className={styles.search_locate}>
        <Locate panTo={panTo} />
        <Search panTo={panTo} />{" "}
        <div className={styles.btn} onClick={() => setModalDescription(true)}>
          <Tooltip title="アイコンの説明">
            <DescriptionIcon fontSize="large" />
          </Tooltip>
        </div>{" "}
      </div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <PlaceInfo />
        <Hokkaido />
        <Aomori />
        <Kagoshima />
        <Okinawa />
        <TamaCy />
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
              console.log(marker);
            }}
            icon={{
              url: `/tempoPin.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 30),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className={styles.black}>
              <h2>
                <span role="img" aria-label="bear">
                  🚴‍♀️
                </span>{" "}
                サイクルスポット！
              </h2>
              <p>RoadBike Spot! {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <Modal
        isOpen={modalDescription}
        onRequestClose={() => setModalDescription(false)}
        style={hatena}
      >
        <ul>
          <li className={styles.doted}>
            <div>
              <span className={styles.red}>ー</span>
              <span className={styles.red}>ー</span>
              <span className={styles.red}>ー</span>
              <span className={styles.red}>ー</span>
            </div>
            <span className={styles.black}> 過去に走ったルート</span>
          </li>
          <li className={styles.doted}>
            <div>
              <span className={styles.green}>ー</span>
              <span className={styles.green}>ー</span>
              <span className={styles.green}>ー</span>
            </div>
            <span className={styles.black}> サイクリング道路</span>
          </li>
          <li className={styles.doted}>
            <img src="bikeShop.svg" alt="pin"></img>
            <span className={styles.black}>自転車屋</span>
          </li>
          <li className={styles.doted}>
            <img src="redpin.svg" alt="pin"></img>
            <span className={styles.black}>おすすめスポット</span>
          </li>
          <li className={styles.doted}>
            <img src="tempoPin.svg" alt="pin"></img>
            <span className={styles.black}>目印（保存されません）</span>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
