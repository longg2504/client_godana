import React, { useState, useEffect, useRef } from "react";
import "../css/Client.css";
import Header from "../Header/Header";
import PlaceList from "../PlaceList/PlaceList";
import UseFetchCategory from "../../../../hooks/client/UseFetchCategory";
import PlaceService from "../../../../service/PlaceService";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../../../images/marker.png";
import { divIcon } from "leaflet";
import ImgSlideOnMap from "../Footer/ImgSlideOnMap";
import PlaceSlider from "../PlaceList/PlaceSlider";
import { usePlace } from "../../../../context/PlaceContext";
import { IonIcon } from "@ionic/react";
import { heartOutline, heartCircleOutline } from "ionicons/icons";
import Pagination from "./Pagination";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { Link } from "react-router-dom";

export default function Body() {
  const [loading, setLoading] = useState(true);
  const [placeLocations, setPlaceLocations] = useState([]);
  const itemsPerLoad = 7;
  const categories = UseFetchCategory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexInt, setCurrentIndexInt] = useState(itemsPerLoad);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMapList, setshowMapList] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [placeLiked, setplaceLiked] = useState([]);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [showBtnCurrentLocation, setShowBtnCurrentLocation] = useState(false);
  const [hasClickedButtonSpinner, setHasClickedButtonSpinner] = useState(false);
  const [mapZoomed, setMapZoomed] = useState(false);
  const itemWidth = 220;
  const {
    searchValue,
    setSearchValue,
    categoryId,
    setCategoryId,
    district,
    ward,
    address,
    rating,
    placeList,
    setPlaceList,
    comfortableSelected, setComfortableSelected
  } = usePlace();

  const updateCategoryPosition = () => {
    const translateX = -currentIndex * itemWidth;
    return { transform: `translateX(${translateX}px)` };
  };

  const handleLeftArrowClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (currentIndex < categories.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSelectedComfotable = (id) => {
    setComfortableSelected(id);
  };

  const mapRef = useRef();

  const getUserLocation = () => {
    setShowUserLocation(true);
    if (userLocation) {
      mapRef.current.setView(userLocation, 20); // Set view to user location with a zoom level of 15
    }
  };

  const handleShowCurrentLocation = () => {
    if (!hasClickedButtonSpinner) {
      setShowSpinner(true);

      setTimeout(() => {
        getUserLocation();
        setShowSpinner(false);
      }, 500);
      setHasClickedButtonSpinner(true);
    } else {
      getUserLocation();
    }
  };

  const handleShowMap = () => {
    setshowMapList((prevShowMap) => !prevShowMap);
    setShowBtnCurrentLocation((prevBtn) => !prevBtn);
    if (!showMapList) {
      setShowUserLocation(false);
    }
    if (hasClickedButtonSpinner) {
      setHasClickedButtonSpinner(false);
    }
  };

  const icon = new L.Icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
  });

  const customIconCurrent = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
  });

  const customIcon = (title) => {
    return divIcon({
      className: "test",
      html: `
      <div class="custom-div-icon">
      <img src='${markerIcon}' width='20px' height='20px' alt='Location Marker'/>
      <div class='custom-div-icon-leaflet'>${title}</div>
      </div>
      `,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    } else {
      alert("Trình duyệt không hỗ trợ xác định vị trí.");
    }
  }, []);

  useEffect(() => {
    if (placeList && placeList.length > 0) {
      const locations =
        placeList &&
        placeList?.map((item) => {
          if (item && item.latitude && item.longitude) {
            return {
              lng: item.longitude,
              lat: item.latitude,
              info: {
                placeName: item.placeTitle,
                images: item.placeAvatar.map((image) => image.fileUrl),
                id: item.id,
              },
            };
          }
          return null;
        });
      setPlaceLocations(locations);
    }
  }, [placeList]);

  const [isOverLayOpenFormWishList, setIsOverLayOpenFormWishList] =
    useState(false);
  const [
    isOverLayOpenFormCreatNewWishList,
    setIsOverLayOpenFormCreatNewWishList,
  ] = useState(false);

  const toggleOpenFormWishList = () => {
    setIsOverLayOpenFormWishList(!isOverLayOpenFormWishList);
  };
  const toggleOpenFormCreatNewWishList = () => {
    setIsOverLayOpenFormCreatNewWishList(!isOverLayOpenFormCreatNewWishList);
    if (isOverLayOpenFormWishList) {
      setIsOverLayOpenFormWishList(false);
    }
    if (!isOverLayOpenFormWishList) {
      setIsOverLayOpenFormWishList(true);
    }
  };

  useEffect(() => {
    async function getPlaceListByCategoryAndSearch() {
      let res = await PlaceService.getPlaceListByCategoryAndSearch(
        categoryId,
        searchValue,
        district,
        ward,
        address,
        rating
      );
      setPlaceList(res.data.content);
      setLoading(false);
    }
    getPlaceListByCategoryAndSearch();
  }, [categoryId, searchValue, district, ward, address, rating]);

  const refreshPlaces = async () => {
    const res = await PlaceService.getPlaceListByCategoryAndSearch(
      categoryId,
      searchValue,
      district,
      ward,
      address,
      rating
    );
    setPlaceList(res.data.content);
    setLoading(false);
  }
  useEffect(() => {
    refreshPlaces();
  }, []);

  return (
    <div>
      <>
        
        <div className="category-container">
          <div className="category-container">
            <button className="arrow left-arrow" onClick={handleLeftArrowClick}>
              <i className="fa-solid fa-circle-chevron-left"></i>
            </button>
            <div className="category" style={updateCategoryPosition()}>
              <div
                onClick={() => {
                  setCategoryId("");
                  handleSelectedComfotable(-1);
                }}
                className={`category-item ${
                  comfortableSelected === -1
                    ? "category-item-selected-comfortable"
                    : ""
                }`}
              >
                <i
                  className="fas fa-globe"
                  alt="Tất cả"
                  style={{ width: "30px", height: "30px" }}
                />
                <p>Tất cả</p>
              </div>
              {categories.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setCategoryId(item.id);
                    handleSelectedComfotable(index);
                  }}
                  className={`category-item ${
                    comfortableSelected === index
                      ? "category-item-selected-comfortable"
                      : ""
                  }`}
                >
                  <i
                    className={item.svg}
                    alt={item.title}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
            <button
              className="arrow right-arrow"
              onClick={handleRightArrowClick}
            >
              <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
          </div>

          <div
            className="spinner"
            style={{ display: showSpinner ? "block" : "none" }}
          >
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>

        <button className="show-map" onClick={handleShowMap}>
          {showMapList ? "Ẩn bản đồ" : "Hiện bản đồ"}
        </button>
        {showBtnCurrentLocation && (
          <button
            className="btn-show-current-location"
            onClick={handleShowCurrentLocation}
          >
            <i className="fa-solid fa-location-crosshairs"></i>
          </button>
        )}

        {showMapList && placeLocations.length ? (
          <div id="map-container" style={{ height: "500px" }}>
            <MapContainer
              center={userLocation || [0, 0]}
              zoom={100}
              style={{ height: "200%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution={`
                                    &copy; <a href="https://www.openstreetmap.org/copyright">Điều khoản sử dụng</a>
                                    `}
              />
              {placeLocations.map((location, index) => (
                <Marker
                  key={index}
                  position={[location.lat, location.lng]}
                  icon={customIcon(location.info.placeName)}
                >
                  <Popup>
                    <div
                      style={{
                        width: "115.3%",
                        right: "21px",
                        position: "relative",
                        top: "-14px",
                        borderRadius: "5px 5px 5px 5px",
                      }}
                    >
                      <div>
                        <ImgSlideOnMap place={location.info} />
                      </div>
                      <div style={{ margin: "0px 20px" }}>
                        <h2>{location.placeName}</h2>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {showUserLocation && (
                <Marker
                  position={userLocation}
                  icon={customIconCurrent}
                ></Marker>
              )}
            </MapContainer>
          </div>
        ) : (
          <PlaceList loading={loading} refreshPlaces={refreshPlaces}/>
        )}
      </>
    </div>
  );
}
