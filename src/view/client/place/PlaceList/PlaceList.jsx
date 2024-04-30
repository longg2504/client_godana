import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseFetchPlace from "../../../../hooks/client/UseFetchPlace";
import LoadingPlaceList from "./LoadingPlace";
import PlaceSlider from "./PlaceSlider";
import { IonIcon } from "@ionic/react";
import { heartOutline, heartCircleOutline } from "ionicons/icons";
import "../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import moment from "moment";
import checkOpenClose from "../../../../utils/CheckOpenClose";
import ShowLocation from "../Body/ShowLocation";
import ShowNoFilterResult from "../Body/ShowNoFilterResult";
import { usePlace } from "../../../../context/PlaceContext";
import PlaceService from "../../../../service/PlaceService";
import startRating from "../../../../utils/StarRating";
import SearchSidebar from "../SideBar/SearchSideBar";
import FavouriteService from "../../../../service/FavouriteService";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function PlaceList(prop) {
  const loading = prop.loading;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showMapStates, setShowMapStates] = useState({});
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isOverLayOpenFormWishList, setIsOverLayOpenFormWishList] =
    useState(false);
  const [
    isOverLayOpenFormCreatNewWishList,
    setIsOverLayOpenFormCreatNewWishList,
  ] = useState(false);
  const [idHouseSelected, setIdHouseSelected] = useState(null);
  const { placeList, placeLiked, setPlaceLiked } = usePlace();
  const id = localStorage.getItem("id");

  const navigate = useNavigate();

  const toggleHover = (index) => {
    setHoveredIndex(index);
  };

  const nextImage = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex + 1) % placeList[activeImageIndex].images.length
    );
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + placeList[activeImageIndex].images.length) %
        placeList[activeImageIndex].images.length
    );
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const getFavoriteList = async () => {
    if (id !== null) {
      try {
        const resp = await FavouriteService.getFavouriteListByUser(id);
        setPlaceLiked(resp.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách yêu thích:", err);
      }
    } else {
      console.error("Id user không tồn tại");
    }
  };
  const [isLikeChecked, setIsLikeChecked] = useState(false);

  useEffect(() => {
    if (id && !isLikeChecked) {
      getFavoriteList();
      setIsLikeChecked(true);
    }
  }, [id]);

  const createFavouriteList = (placeId, userId) => {
    const data = {
      placeId: placeId,
      userId: userId,
    };
    if (id !== null) {
      FavouriteService.createFavouriteList(data);
      try {
        toast.success("Thêm danh sách yêu thích thành công", {
          className: "custom-toast-create-new-wish-list-success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error("Lỗi khi thêm danh sách yêu thích", {
          className: "custom-toast-create-new-wish-list-success",
        });
      }
    } else {
      toast.error("Vui lòng đăng nhập để thêm yêu thích", {
        className: "custom-toast-create-new-wish-list-success",
      });
      navigate("/login");
    }
  };

  const handleRemoveFavorite = async (placeId, userId) => {
    const data = {
      placeId: placeId,
      userId: userId,
    };
    if (id !== null) {
      try {
        FavouriteService.deletedFavourite(data);
        toast.success("Đã xoá khỏi danh sách", {
          className: "custom-toast-create-new-wish-list-success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast.error("Lỗi khi xóa nhà yêu thích", {
          className: "custom-toast-create-new-wish-list-success",
        });
      }
    }
  };

  return (
    <>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000} // Thời gian tự động đóng toast (5 giây)
          // hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="d-flex">
          <SearchSidebar />

          <div className="search-results">
            {loading == true ? (
              <LoadingPlaceList />
            ) : Array.isArray(placeList) && placeList.length > 0 ? (
              placeList?.map((place, index) => {
                const likedPlaceIds = placeLiked.map((item) => item.place.id);
                const isPlaceLiked = likedPlaceIds.includes(place.id);
                const openTime = moment(
                  place.contact.openTime,
                  "HH:mm:ss"
                ).format("HH:mm");
                const closeTime = moment(
                  place.contact.closeTime,
                  "HH:mm:ss"
                ).format("HH:mm");
                return (
                  <div key={index} className="listing">
                    <div>
                      <div>
                        <div>
                          <PlaceSlider place={place} />
                          {isPlaceLiked ? (
                            <div
                              className="outer-div"
                              onMouseEnter={() => toggleHover(index)}
                              onMouseLeave={() => toggleHover(null)}
                            >
                              <i
                                onClick={() => {
                                  handleRemoveFavorite(place.id, id);
                                }}
                                className="fa-solid fa-heart"
                                style={{ color: "#f21202" }}
                              ></i>
                            </div>
                          ) : (
                            <div
                              className="outer-div"
                              onMouseEnter={() => toggleHover(index)}
                              onMouseLeave={() => toggleHover(null)}
                            >
                              {hoveredIndex === index ? (
                                <IonIcon
                                  onClick={() => {
                                    createFavouriteList(place.id, id);
                                    setIdHouseSelected(place.id);
                                  }}
                                  icon={heartCircleOutline}
                                  className="heartCircle-icon"
                                />
                              ) : (
                                <IonIcon
                                  icon={heartOutline}
                                  className="heart-icon"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="div-show-map-details-on-list">
                      {showMapStates[index] && (
                        <div className="house-on-map">
                          <ShowLocation
                            latitude={place.latitude}
                            longitude={place.longitude}
                          />
                          <button
                            onClick={() =>
                              setShowMapStates((prevState) => ({
                                ...prevState,
                                [index]: false,
                              }))
                            }
                          >
                            <i className="fa-solid fa-circle-xmark"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="listing-header">
                        <h3 className="hotel-name">{place?.placeTitle}</h3>
                        <div className="review">
                          <h4>
                            {startRating(place.rating ? place.rating : 0)}
                          </h4>
                          <span style={{ fontSize: "13px" }}>
                            {place.locationRegion?.address +
                              ", " +
                              place.locationRegion?.wardName +
                              ", " +
                              place.locationRegion?.districtName +
                              ", " +
                              place.locationRegion?.provinceName +
                              ", "}
                          </span>
                        </div>
                        <span>{checkOpenClose(openTime, closeTime)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <ShowNoFilterResult />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
