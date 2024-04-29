import React, { useState, useEffect, useRef } from "react";
import Header from "./Header/Header";
import PlaceList from "./PlaceList/PlaceList";
import "./css/Client.css";
import markerIcon from "../../../images/marker.png";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ImgSliderOnMap from "./Footer/ImgSlideOnMap";
import { divIcon } from "leaflet";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import PlaceService from "../../../service/PlaceService";
import Body from "./Body/Body";

const Home = () => {
  return (
    <>
      <Header/>
      <Body/>
    </>
  );
};

export default Home;
