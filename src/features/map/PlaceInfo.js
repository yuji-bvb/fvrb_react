import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import styles from "./placeInfo.module.css";

export default function PlaceInfo() {
  const places = [
    { info: "奥多摩湖", location: { lat: 35.7805692, lng: 139.03678894 } },
    { info: "御岳山", location: { lat: 35.78300626, lng: 139.14948463 } },
    { info: "高尾山", location: { lat: 35.62541917, lng: 139.24372673 } },
    { info: "相模湖", location: { lat: 35.61279037, lng: 139.18379907 } },
    { info: "津久井湖", location: { lat: 35.58913219, lng: 139.26044587 } },
    { info: "江ノ島", location: { lat: 35.29971568, lng: 139.478302 } },
    { info: "芦ノ湖", location: { lat: 35.21230774, lng: 139.00204863 } },
    { info: "山中湖", location: { lat: 35.41804482, lng: 138.87415696 } },
    { info: "渡瀬遊水池", location: { lat: 36.21467653, lng: 139.67809589 } },
    { info: "多摩湖狭山湖", location: { lat: 35.7694532, lng: 139.41042964 } },

    {
      info: "多摩サイクリングロード(羽村)(50km)",
      location: { lat: 35.75529777, lng: 139.30896878 },
    },
    {
      info: "多摩サイクリングロード(羽田)(50km)",
      location: { lat: 35.54558356, lng: 139.7505033 },
    },
    {
      info: "国道一号線最高地点",
      location: { lat: 35.21826819, lng: 139.0397283 },
    },
    {
      info: "成木の家(カフェ)",
      location: { lat: 35.83688087, lng: 139.20244217 },
    },
    {
      info: "成木ヒルクライムGOAL",
      location: { lat: 35.84848279, lng: 139.16680098 },
    },
  ];

  const shops = [
    {
      info: "8823サイクルラボ",
      location: { lat: 35.7412222, lng: 139.32512105 },
    },
    { info: "遊輪館", location: { lat: 35.74097837, lng: 139.32387114 } },
    {
      info: "tokyobike谷中",
      location: { lat: 35.72355782683499, lng: 139.7682259976864 },
    },
    {
      info: "tokyobike中目黒",
      location: { lat: 35.6408099910292, lng: 139.6948716044426 },
    },
    {
      info: "tokyobike吉祥寺",
      location: { lat: 35.70381139309231, lng: 139.57394818210753 },
    },
    {
      info: "サイクルセンター吉岡",
      location: { lat: 35.7118935564403, lng: 139.37918297946453 },
    },
    {
      info: "ビアンキバイクストア丸の内",
      location: { lat: 35.684283947606104, lng: 139.76452723145485 },
    },
    {
      info: "TREK Bicycle(直営店)",
      location: { lat: 35.71410377, lng: 139.36384901 },
    },
    {
      info: "ビアンキバイクストア",
      location: { lat: 35.69455814, lng: 139.41479534 },
    },
    { info: "Y'sRoad", location: { lat: 35.74764424, lng: 139.41435814 } },
    {
      info: "ブルーラグ幡ヶ谷",
      location: { lat: 35.6762869698791, lng: 139.67090338468552 },
    },
    {
      info: "ブルーラグ代々木公園",
      location: { lat: 35.66704004415981, lng: 139.69101257622242 },
    },
    {
      info: "BLUE LUG KAMIUMA",
      location: { lat: 35.63939256772258, lng: 139.66193474829197 },
    },
    {
      info: "Y'sRoad茅ヶ崎",
      location: { lat: 35.31821230292936, lng: 139.3992098732879 },
    },
    {
      info: "Y'sRoad横浜(ワールドポーターズ中)",
      location: { lat: 35.45400635077088, lng: 139.63892877101898 },
    },
    {
      info: "セカンドアウトドア船橋14号",
      location: { lat: 35.69099917529762, lng: 139.99520341512084 },
    },
    {
      info: "Y'sRoad船橋",
      location: { lat: 35.687308886075165, lng: 139.99278455972672 },
    },
    {
      info: "Y'sRoad越谷アウトレット",
      location: { lat: 35.879708881392155, lng: 139.82572451233864 },
    },
    {
      info: "Y'sRoad志木",
      location: { lat: 35.82679303908731, lng: 139.5784690976143 },
    },
    {
      info: "Y'sRoadお茶の水レディース館",
      location: { lat: 35.695233349071344, lng: 139.7662941270126 },
    },
    {
      info: "Y'sRoadお茶の水エアロロード・トライアスロン館",
      location: { lat: 35.695168070262774, lng: 139.7663310170173 },
    },
    {
      info: "Y'sRoad池袋本館",
      location: { lat: 35.72921104896408, lng: 139.7166209667921 },
    },
    {
      info: "Y'sRoad池袋チャーリー",
      location: { lat: 35.73284773404589, lng: 139.71351027488708 },
    },
    {
      info: "Y'sRoad入間アウトレット",
      location: { lat: 35.81091199, lng: 139.38046137 },
    },
    {
      info: "Y'sRoad川崎",
      location: { lat: 35.52957195788079, lng: 139.70091193914413 },
    },
    {
      info: "Y'sRoad渋谷本館",
      location: { lat: 35.65821536769836, lng: 139.69695740956965 },
    },
    {
      info: "Y'sRoad府中多摩川",
      location: { lat: 35.66391246151336, lng: 139.43842828273773 },
    },
    {
      info: "Y'sRoad上野本館",
      location: { lat: 35.70533414, lng: 139.77221444 },
    },
    {
      info: "Y'sRoad上野ウエア館",
      location: { lat: 35.70578635, lng: 139.77259565 },
    },
    {
      info: "Y'sRoad上野アサゾー (マニアック)",
      location: { lat: 35.70588736, lng: 139.77345631 },
    },
    {
      info: "Y'sRoadアーバンeコミュータ",
      location: { lat: 35.69175676, lng: 139.7066056 },
    },
    {
      info: "Y'sRoad本館,クロスバイク館",
      location: { lat: 35.69120672, lng: 139.70758595 },
    },
    {
      info: "サイクルメイトカミヤ",
      location: { lat: 35.73755596, lng: 139.33018506 },
    },
  ];

  const [selected, setSelected] = useState(null);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onLoad={onLoad}
          onClick={() => {
            setSelected(marker);
            console.log(selected);
          }}
        />
      ))}
      {shops.map((shop) => (
        <Marker
          key={`${shop.location.lat * shop.location.lng}`}
          position={{
            lat: shop.location.lat,
            lng: shop.location.lng,
          }}
          onLoad={onLoad}
          onClick={() => {
            setSelected(shop);
            console.log(selected);
          }}
          icon={{
            url: "/bikeShop.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 30),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className={styles.black}>{selected.info}</div>
        </InfoWindow>
      ) : null}
    </>
  );
}
