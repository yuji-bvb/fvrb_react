import { Polyline } from "@react-google-maps/api";

export default function Kagoshima() {
  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const path = [
    { lat: 35.738544, lng: 139.319521 },
    { lat: 35.31744174, lng: 139.36176312 },
    { lat: 35.23316338, lng: 139.10443116 },
    { lat: 35.24096199, lng: 139.05082006 },
    { lat: 35.12291016, lng: 138.91581527 },
    { lat: 35.15940734, lng: 138.67960922 },
    { lat: 34.70405863, lng: 137.7259066 },
    { lat: 35.17799431, lng: 136.90742515 },
    { lat: 35.011135, lng: 135.76884896 },
    { lat: 34.6888159, lng: 135.19618661 },
    { lat: 34.8050413, lng: 134.46834237 },
    { lat: 34.38450573, lng: 132.45509774 },
    { lat: 34.05140177, lng: 131.8041578 },
    { lat: 33.95804918, lng: 130.94173104 },
    { lat: 33.58921238, lng: 130.4075044 },
    { lat: 32.79972805, lng: 130.71100172 },
    { lat: 32.08950042, lng: 130.35531935 },
    { lat: 31.59719699, lng: 130.55581983 },
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
