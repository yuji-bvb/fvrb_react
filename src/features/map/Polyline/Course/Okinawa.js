import { Polyline } from "@react-google-maps/api";

export default function Okinawa() {
  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const path = [
    { lat: 26.20636187, lng: 127.65235384 },
    { lat: 26.30806882, lng: 127.76444554 },
    { lat: 26.35776184, lng: 127.74607777 },
    { lat: 26.43325191, lng: 127.7802288 },
    { lat: 26.574916281, lng: 127.98678201 },
    { lat: 26.68172006, lng: 127.97414285 },
    { lat: 26.62157848, lng: 128.01911813 },
    { lat: 26.67102857, lng: 128.11069839 },
    { lat: 26.7667077, lng: 128.21163528 },
    { lat: 26.86741525, lng: 128.25525284 },
    { lat: 26.83024367, lng: 128.27653885 },
    { lat: 26.84173171, lng: 128.29730988 },
    { lat: 26.75986459, lng: 128.31291652 },
    { lat: 26.63236615, lng: 128.22674148 },
    { lat: 26.62868333, lng: 128.14777725 },
    { lat: 26.5433315, lng: 128.08597915 },
    { lat: 26.55070251, lng: 128.03791397 },
    { lat: 26.42779051, lng: 127.82093399 },
    { lat: 26.27823116, lng: 127.81124259 },
    { lat: 26.09496707, lng: 127.68441507 },
    { lat: 26.20636187, lng: 127.65235384 },
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
