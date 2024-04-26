import React, { useState, useEffect } from "react";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./css/Client.css";
import logo from "../../../images/logoGoDana.png";
import { usePlace } from "../../../context/PlaceContext";


function Header() {
  const {searchValue,setSearchValue } = usePlace();

  console.log(searchValue);
  return (
    <>
      <div className="header">
        <img
          className="img-header"
          src={logo}
          alt=""
          width="100px"
          height="100px"
        />
        <div className="search-box">
          <input className="search-input" type="text"  value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  />
          <button className="search-button" type="submit" >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>

        <div className="header-2">
          <span>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "40px" }}
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
