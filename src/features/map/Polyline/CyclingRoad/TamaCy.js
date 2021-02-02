import { Polyline } from "@react-google-maps/api";

export default function TamaCy() {
  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const path = [
    { lat: 35.75529777, lng: 139.30896878 },
    { lat: 35.70569787, lng: 139.33701285 },
    { lat: 35.68476869, lng: 139.41749096 },
    { lat: 35.67601897, lng: 139.427104 },
    { lat: 35.66929046, lng: 139.43628788 },
    { lat: 35.65471586, lng: 139.46276665 },
    { lat: 35.65276029, lng: 139.51622517 },
    { lat: 35.61105832, lng: 139.62693356 },
    { lat: 35.58859385, lng: 139.66802297 },
    { lat: 35.56504809, lng: 139.67914581 },
    { lat: 35.55247961, lng: 139.70506668 },
    { lat: 35.53879168, lng: 139.70189095 },
    { lat: 35.54558356, lng: 139.7505033 },
  ];

  const options = {
    strokeColor: "#008000",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "#008000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  return (
    <>
      <Polyline onLoad={onLoad} path={path} options={options} />
    </>
  );
}
