import { Polyline } from "@react-google-maps/api";

export default function Hokkaido() {
  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const path = [
    { lat: 42.79615091, lng: 141.6652969 },
    { lat: 43.06847849, lng: 141.3505832 },
    { lat: 43.85591232, lng: 141.52911103 },
    { lat: 44.72087541, lng: 141.7923118 },
    { lat: 45.41727191, lng: 141.67577411 },
    { lat: 44.93545023, lng: 142.58095931 },
    { lat: 44.35697663, lng: 143.35557783 },
    { lat: 44.02119216, lng: 144.27842939 },
    { lat: 43.66080371, lng: 145.13173313 },
    { lat: 42.98662154, lng: 144.38349405 },
    { lat: 42.92430602, lng: 143.20246378 },
    { lat: 41.9306665, lng: 143.24356556 },
    { lat: 42.12780753, lng: 142.93616956 },
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
