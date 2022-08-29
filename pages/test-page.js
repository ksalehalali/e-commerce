import { useState, useRef } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import axios from "axios";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3Bneomw3YLnOTmNXvBlfurEeaUqcXzVg&v=3",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    ref={props.mapRef}
    onClick={async (e) => {
      console.log("e.latLng.lat()");
      console.log(e.latLng.lat());
      console.log("e.latLng.lng()");
      console.log(e.latLng.lng());

      props.setMarkPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.latLng.lng()},${e.latLng.lat()}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
      );

      console.log("data");
      console.log(data);
      if (data?.features[0]) {
        props.setAddressName(data?.features[0]?.place_name);
      }
      //   Geocode.fromLatLng(
      //     e.latLng.lat().toString(),
      //     e.latLng.lng().toString()
      //   ).then(
      //     (response) => {
      //       const address = response.results[0].formatted_address;
      //       console.log(address);
      //     },
      //     (error) => {
      //       console.error(error);
      //     }
      //   );
    }}
    // onDragEnd={(e) => console.log(e)}
    // defaultOptions={{
    //   mapTypeControlOptions: {
    //     mapTypeIds: ["moon", "satellite"],
    //   },
    // }}
    defaultZoom={8}
    defaultCenter={{ lat: 25.3548, lng: 51.1839 }}
    mapTypeId="roadmap"
    // defaultExtraMapTypes={[["moon"]]}

    // onCenterChanged={(e) =>
    //   props.setMarkPosition({
    //     lat: props.mapRef?.current?.getCenter()?.lat(),
    //     lng: props.mapRef?.current?.getCenter()?.lng(),
    //   })
    // }
  >
    {props.isMarkerShown && (
      <Marker
        draggable
        onDragEnd={(e) => console.log(e)}
        position={props.markPosition}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

function TestPage() {
  const mapRef = useRef();

  const [markPosition, setMarkPosition] = useState(null);
  const [isMarkerShown, setIsMarkerShown] = useState(true);
  const [addressName, setAddressName] = useState("");

  return (
    <div>
      <h2>Map</h2>
      <h3>{addressName}</h3>
      <div>
        <Map
          mapRef={mapRef}
          isMarkerShown={isMarkerShown}
          markPosition={markPosition}
          setMarkPosition={setMarkPosition}
          setIsMarkerShown={setIsMarkerShown}
          setAddressName={setAddressName}
        />
      </div>
    </div>
  );
}
TestPage.layout = "main";

export default TestPage;
