import { Polyline } from "@react-google-maps/api";

export default function Aomori() {
  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const path = [
    { lat: 35.738544, lng: 139.319521 },
    { lat: 36.9618131, lng: 140.04723608 },
    { lat: 37.76340263, lng: 140.47707617 },
    { lat: 38.57851585, lng: 140.95772803 },
    { lat: 39.54791857, lng: 141.16173865 },
    { lat: 40.196732279, lng: 140.784686942 },
    { lat: 40.82302072, lng: 140.7476145 },
  ];

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
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
