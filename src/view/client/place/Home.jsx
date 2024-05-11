import React, { useState, useEffect, useRef } from "react";
import Header from "./Header/Header";
import "./css/Client.css";
import "rc-slider/assets/index.css";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
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
