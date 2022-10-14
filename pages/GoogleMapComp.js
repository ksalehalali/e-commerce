// import { useState, useRef, useEffect } from "react";
// import {
//     withGoogleMap,
//     withScriptjs,
//     GoogleMap,
//     Marker,
// } from "react-google-maps";
// import { compose, withProps } from "recompose";
// import axios from "axios";
// import AutoComplete from "react-google-autocomplete";
// import { Modal } from "antd";
// import { FaLocationArrow } from "react-icons/fa";
// import {
//     CloseCircleFilled,
//     CloseCircleOutlined,
//     CloseOutlined,
//     CloseSquareOutlined,
//     CloseSquareTwoTone,
//     CloudFilled,
// } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { showMap } from "redux/modal/action";
// import styled from "styled-components";

// const API_KEY = "AIzaSyD9C7jA9fYW9c3QeheJ-PgBI-3Z0jYGnYk";

// const LocateBtn = styled.button`
//     position: absolute;
//     right: 92px;
//     bottom: 26px;
//     padding: 5px 10px;
//     border: 1px solid #ddd;
// `;

// function GoogleMapComp({ dataFromMap, datafromSearch }) {
//     const mapRef = useRef();
//     const [markPosition, setMarkPosition] = useState(null);
//     const [isMarkerShown, setIsMarkerShown] = useState(true);
//     const [addressName, setAddressName] = useState("");
//     const [userPosition, setUserPosition] = useState({});
//     const dispatch = useDispatch();

//     useEffect(() => {
//         console.log("dataFrom search", datafromSearch?.coordinates);
//         setUserPosition({
//             latitude: datafromSearch?.coordinates[1],
//             longitude: datafromSearch?.coordinates[0],
//         });
//         setMarkPosition({
//             lat: datafromSearch?.coordinates[1],
//             lng: datafromSearch?.coordinates[0],
//         });
//     }, [datafromSearch]);

//     const Map = compose(
//         withProps({
//             googleMapURL:
//                 "https://maps.googleapis.com/maps/api/js?key=AIzaSyCW4-WlUHVBwKkQPnGSFqv3USkIWlmTQ4A",
//             loadingElement: <div style={{ height: `100%` }} />,
//             containerElement: <div style={{ height: `600px` }} />,
//             mapElement: <div style={{ height: `100%` }} />,
//         }),
//         withScriptjs,
//         withGoogleMap
//     )((props) => (
//         <GoogleMap
//             ref={props.mapRef}
//             onClick={async (e) => {
//                 props.setMarkPosition({
//                     lat: e.latLng.lat(),
//                     lng: e.latLng.lng(),
//                 });
//                 const { data } = await axios.get(
//                     `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.latLng.lng()},${e.latLng.lat()}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
//                 );

//                 if (data?.features[0]) {
//                     props.setAddressName(data?.features[0]?.place_name);
//                     dataFromMap({ positionName: data.features[0].place_name });
//                 }
//             }}
//             defaultZoom={userPosition.latitude > 0 ? 17 : 8}
//             defaultCenter={
//                 userPosition.latitude > 0
//                     ? {
//                           lat: userPosition.latitude,
//                           lng: userPosition.longitude,
//                       }
//                     : { lat: 25.3548, lng: 51.1839 }
//             }
//             mapTypeId="roadmap"
//         >
//             {props.isMarkerShown && (
//                 <Marker
//                     draggable
//                     onDragEnd={(e) => console.log(e)}
//                     position={props.markPosition}
//                     onClick={props.onMarkerClick}
//                 />
//             )}
//             {/* <AutoComplete
//                 apiKey="AIzaSyCW4-WlUHVBwKkQPnGSFqv3USkIWlmTQ4A"
//                 onPlaceSelected={(place) => selectedPlace(place)}
//             /> */}
//         </GoogleMap>
//     ));

//     const getLocation = async () => {
//         console.log("done");
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(async (position) => {
//                 console.log(position);
//                 const { data } = await axios.get(
//                     `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
//                 );
//                 console.log("current position", data.features[0].place_name);
//                 dataFromMap({
//                     position: position.coords,
//                     positionName: data.features[0].place_name,
//                     data: data,
//                 });
//                 setUserPosition({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                 });
//                 setMarkPosition({
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 });
//             });
//         } else {
//             console.log("wrong");
//         }
//     };

//     function getCoordinates(position) {
//         // const { data } = await axios.get(
//         //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoiaGFtdWRlc2hhaGluIiwiYSI6ImNrempnc2JzcjA2bmQyb3RhdnRxd2hsbnUifQ.OeXesE3wZ5B_V42D79rjJQ`
//         // );
//         // console.log("current position", data);
//         setUserPosition({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//         });
//         setMarkPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//         });
//     }

//     const handleLocationError = (error) => {
//         switch (error.code) {
//             case error.PERMISSION_DENIED:
//                 alert("User denied the request for Geolocation");
//                 break;
//             case error.POSITION_UNAVAILABLE:
//                 alert("Location information is unavailable");
//                 break;
//             case error.TIMEOUT:
//                 alert("The request to get user location timed out.");
//                 break;
//             case error.UNKNOWN_ERROR:
//                 alert("An unknown error occurred");
//                 break;

//             default:
//                 alert("An unknown error occurred");
//         }
//     };
//     console.log(userPosition);

//     return (
//         <div className="google-map">
//             {addressName !== "" ? <h3>{addressName}</h3> : ""}
//             <div>
//                 {/* <CloseCircleOutlined
//                     className="close-icon"
//                     onClick={() => {
//                         dispatch(showMap(false));
//                     }}
//                 /> */}
//                 <Map
//                     mapRef={mapRef}
//                     isMarkerShown={isMarkerShown}
//                     markPosition={markPosition}
//                     setMarkPosition={setMarkPosition}
//                     setIsMarkerShown={setIsMarkerShown}
//                     setAddressName={setAddressName}
//                 />
//                 <button className="locate-me" onClick={getLocation}>
//                     Locate Me <FaLocationArrow />
//                 </button>
//             </div>
//         </div>
//     );
// }
// GoogleMapComp.layout = "main";

// export default GoogleMapComp;
