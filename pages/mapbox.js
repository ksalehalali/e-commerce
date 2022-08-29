import Head from "next/head";
import React, { useEffect, useState, useRef, useCallback } from "react";

import mapboxGl from "mapbox-gl/dist/mapbox-gl";
import axios from "axios";
import { Button, message, Row, Col, Input, Form } from "antd";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/src/directions";
// import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
// mapboxGl.workerClass = MapboxWorker;

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxGl.workerClass = MapboxWorker;
mapboxGl.accessToken =
  "pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ";

let Marker = null;

function MapboxPage() {
  const map = useRef();
  const [center, setCenter] = useState({ lng: 25.3548, lat: 51.1839 });
  const [markerLngLat, setMarkerLngLat] = useState({ lng: null, lat: null });

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxGl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lat, center.lng],
      zoom: 8,
    });
    map.current.on("load", async function () {
      map.current.on("click", async function (e) {
        if (Marker) {
          Marker.remove();
        }
        setMarkerLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        const marker = new mapboxGl.Marker({
          draggable: true,
        })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map.current);
        Marker = marker;

        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
        );

        if (data?.features[0]) {
          alert(data?.features[0]?.place_name);
        }
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Map</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css"
          type="text/css"
        />
      </Head>

      <div>
        <h2>Map</h2>
        <div>
          <div
            id="map"
            style={{ width: "80vw", height: "100vh", position: "relative" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default MapboxPage;
