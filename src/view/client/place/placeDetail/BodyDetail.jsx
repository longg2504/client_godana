import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaceService from "../../../../service/PlaceService";
import "../css/ClientDetail.css";
import LocationDetail from "./LocationDetail";
import { Link, useParams } from "react-router-dom";
import RatingService from "../../../../service/RatingService";
import ConvertDateReview from "./ConvertDataReview";
import imgError from "../../../../images/loi-hinh-anh.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import startRating from '../../../../utils/StarRating';
import splitTime from "../../../../utils/SplitTime";
import checkOpenClose from "../../../../utils/CheckOpenClose";
import CreateReview from "./CreateReview";
import NerbyPlace from './NerbyPlace';
import { usePlace } from "../../../../context/PlaceContext";

export default function BodyDetail({setPlaceName}) {
  const [place, setPlace] = useState({});
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [placeReivew, setPlaceReviews] = useState([]);
  const [isOverlayReviews, setIsOVerlayReviews] = useState(false);
  const [isOverlayCreateReviews, setIsOVerlayCreateReviews] = useState(false);
  const [isOverLayImages, setIsOverLayImages] = useState(false);
  const [isOverLayImagesSlider, setIsOverLayImagesSlider] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {placeNerby, setPlaceNerby} = usePlace();
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");


  const jwt = localStorage.getItem('jwt')
  const { placeId } = useParams();

  useEffect(() => {
    async function getPlaceDetail() {
      let res = await PlaceService.getPlaceDetailById(placeId);
      setPlace(res.data);
      setLongitude(res.data.longitude);
      setLatitude(res.data.latitude);
      setPlaceName(res.data.placeTitle)

    }
    getPlaceDetail();
  }, [placeId,longitude, latitude]);


  useEffect(() => {
    async function getReviewsPlace() {
      let res = await RatingService.getRatingListByPlaceId(placeId);
      setPlaceReviews(res.data);
    }
    getReviewsPlace();
  }, [placeId]);

  useEffect(()=> {
    async function getAllNerbyPlace(){
      const res = await PlaceService.getAllNerbyPlace(placeId);
      setPlaceNerby(res.data);
    }
    getAllNerbyPlace();

  },[placeId])

  console.log(longitude, "longitude");
  console.log(latitude, "latitude")

  const sixLastestReviews =
    placeReivew?.length >= 6
      ? placeReivew
          .slice(0, 6)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      : placeReivew?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
  const lastestReviews = placeReivew ? placeReivew.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : null;
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
    if (!isOverlayVisible) {
      document.querySelector(".leaflet-control").style.display = "none";
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    } else {
      document.querySelector(".leaflet-control").style = "block";
      document.querySelector(".leaflet-control-attribution").style = "block";
    }
  };

  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const toggleOverlayReviews = () => {
    setIsOVerlayReviews(!isOverlayReviews);
    if (!isOverlayReviews) {
      document.querySelector(".leaflet-control").style.display = "none";
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    } else {
      document.querySelector(".leaflet-control").style = "block";
      document.querySelector(".leaflet-control-attribution").style = "block";
    }
  };

  const toggleOverlayCreateReviews = () => {
    setIsOVerlayCreateReviews(!isOverlayCreateReviews);
    if (!isOverlayCreateReviews) {
      document.querySelector(".leaflet-control").style.display = "none";
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    } else {
      document.querySelector(".leaflet-control").style = "block";
      document.querySelector(".leaflet-control-attribution").style = "block";
    }
  };

  const toggleOverlayImages = () => {
    setIsOverLayImages(!isOverLayImages);
    if (!isOverLayImages) {
      document.querySelector(".leaflet-control").style.display = "none";
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    } else {
      document.querySelector(".leaflet-control").style = "block";
      document.querySelector(".leaflet-control-attribution").style = "block";
    }
  };

  const toggleOverlayImagesSlider = () => {
    setIsOverLayImagesSlider(!isOverLayImagesSlider);
    if (!isOverLayImagesSlider) {
      document.querySelector(".leaflet-control").style.display = "none";
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    } else {
      document.querySelector(".leaflet-control").style = "block";
      document.querySelector(".leaflet-control-attribution").style = "block";
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    toggleOverlayImagesSlider();
  };

  return (
    <>
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
      <div className="body-detail">
        <div>
          <div className="title">
            <h1>
              <svg
                className="svg-title"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                aria-label="Tiêu đề được dịch tự động: Cabin 1 - Cabin sang trọng bên sườn núi với chế độ xem Batulao"
                role="img"
                focusable="false"
              >
                <path d="M9 0a1 1 0 0 1 1 .88V6h5a1 1 0 0 1 1 .88V15a1 1 0 0 1-.88 1H7a1 1 0 0 1-1-.88V10H1a1 1 0 0 1-1-.88V1a1 1 0 0 1 .88-1H9zm1.73 7-1.4.5.24.21.13.13c.12.13.23.25.3.36l.08.1.05.07.04.08H7.31v1.3h1.2l.17.53.1.26.1.3A6.3 6.3 0 0 0 10 12.61c-.5.32-1.12.61-1.87.87l-.33.11-.35.11-.44.14.72 1.15.4-.13.4-.12c1-.35 1.83-.76 2.48-1.22.57.4 1.28.77 2.12 1.08l.37.14.38.12.41.13.72-1.15-.45-.14-.26-.08-.34-.11a9.23 9.23 0 0 1-1.94-.9 6.3 6.3 0 0 0 1.07-1.7l.13-.31.11-.33.17-.52h1.2V8.45h-3.05l-.1-.23A3.7 3.7 0 0 0 11 7.3l-.12-.15-.14-.15zm1.35 2.76-.04.13-.08.22-.1.27a4.99 4.99 0 0 1-.86 1.38 4.95 4.95 0 0 1-.74-1.13l-.12-.25-.1-.27-.08-.22-.04-.13h2.16zM9 1H1v8h5V7l.01-.17H3.83L3.43 8H2l2.26-6h1.48l1.5 4H9V1zM5 3.41 4.25 5.6h1.5L5 3.41z"></path>
              </svg>
              {place.placeTitle}
            </h1>
          </div>
          <div className="review">
            <div>
              <p>
                {Math.round(place.rating*10)/10}
                <i className="fa-solid fa-star"></i>
                <span className="text" style={{ textDecoration: "underline" }}>
                  {place.numberRating} đánh giá
                </span>                
                <span className="text" style={{ textDecoration: "underline" }}>
                  {place.locationRegion?.address +
                    ", " +
                    place.locationRegion?.wardName +
                    ", " +
                    place.locationRegion?.districtName +
                    ", " +
                    place.locationRegion?.provinceName +
                    ", "}
                </span>
              </p>
            </div>
          </div>
          {place.placeAvatar && (
            <div className="image-house-detail">
              <div className="img0">
                <img src={ place.placeAvatar[0]
                      ? place.placeAvatar[0].fileUrl
                      : imgError} />
              </div>
              <div className="imgs">
                <img src={ place.placeAvatar[1]
                      ? place.placeAvatar[1].fileUrl
                      : imgError} />
                <img
                  src={ place.placeAvatar[2]
                    ? place.placeAvatar[2].fileUrl
                    : imgError}
                  style={{ borderRadius: "0px 30px 0px 0px" }}
                />
                <img
                  src={
                    place.placeAvatar[3]
                      ? place.placeAvatar[3].fileUrl
                      : imgError
                  }
                />
                <img
                  src={
                    place.placeAvatar[4]
                      ? place.placeAvatar[4].fileUrl
                      : imgError
                  }
                  style={{ borderRadius: "0px 0px 30px 0px" }}
                />
                <div>
                  <button
                    onClick={toggleOverlayImages}
                    className="btn-show-imgs"
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        height: "16px",
                        width: "16px",
                        fill: "currentcolor",
                        margin: "-3px 1px",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                      ></path>
                    </svg>
                    <span style={{ padding: "0px 8px" }}>
                      Hiển thị tất cả ảnh
                    </span>
                  </button>
                  {
                    <div
                      className={`overlay2 ${isOverLayImages ? "" : "d-none"}`}
                    >
                      <div
                        style={{ width: "100%", height: "100%" }}
                        className={`appearing-div ${
                          isOverLayImages ? "active" : ""
                        }`}
                      >
                        <div>
                          <i
                            onClick={toggleOverlayImages}
                            className="fa-solid fa-xmark close-description"
                          ></i>
                        </div>
                        <div className="container-description-details">
                          <div className="div-show-all-images">
                            <h1>Tổng quan chỗ sẽ đến</h1>
                            <div>
                              <ImageList>
                                {place?.placeAvatar?.map((item, index) => {
                                  const cols = index % 3 === 0 ? 2 : 1;
                                  const rows = item.featured ? 2 : 1;

                                  return (
                                    <ImageListItem
                                      className={`${
                                        index % 3 === 0
                                          ? "img-full-show-all-details"
                                          : "img-show-all-details"
                                      }`}
                                      key={item.fileUrl}
                                      cols={cols}
                                      rows={rows}
                                      onClick={() => handleImageClick(index)}
                                    >
                                      <img
                                        className={`${
                                          index % 3 === 0
                                            ? "img-full-show-all-details"
                                            : "img-show-all-details"
                                        }`}
                                        {...srcset(
                                          item.fileUrl,
                                          250,
                                          200,
                                          rows,
                                          cols
                                        )}
                                        alt={item.description}
                                        loading="lazy"
                                      />
                                      <ImageListItemBar
                                        sx={{
                                          background:
                                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                        }}
                                        position="top"
                                      />
                                    </ImageListItem>
                                  );
                                })}
                              </ImageList>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  
                </div>
              </div>
            </div>
          )}

          <div style={{width: "1200px"}}> 
            <div className="title">
              <h3>
              Thông tin liên Hệ : 
              </h3>
              <div>
                  <ul>
                    <li>Email: {place.contact?.email ? <a href={place.contact?.email}> {place.contact?.email} </a> : "Không có thông tin"} </li>
                    <li>Phone: {place.contact?.phone ?  place.contact?.phone  : "Không có thông tin"} </li>
                    <li>Website: {place.contact?.website ? <a href={place.contact?.website}> {place.contact?.website} </a> : "Không có thông tin"} </li>
                    <li>Thời gian hoạt động: {place.contact?.openTime && place.contact?.closeTime ? checkOpenClose(place.contact?.openTime, place.contact?.closeTime)   : "Không có thông tin"} </li>
                    
                  </ul>
              </div>
            </div>
          </div>
          <div style={{ width: "1200px" }}>
            <div className="title">
              <h3>
                <i className="fa-solid fa-star"></i> {Math.round(place.rating*10)/10} ·
                <span className="text" style={{ textDecoration: "underline" }}>
                  {place.numberRating} đánh giá
                </span>
                <button style={{padding: "3px 13px"}} className={jwt ? `btn-show-all-comfortable` : 'd-none'} onClick={toggleOverlayCreateReviews}>Đánh giá</button>
                {(
                <div className={`overlay2 ${isOverlayCreateReviews ? '' : 'd-none'}`} >
                  <div style={{ width: '60%', height: '700px' }} className={`appearing-div ${isOverlayReviews ? 'active' : ''}`}>
                  <div>
                      <i onClick={toggleOverlayCreateReviews} className="fa-solid fa-xmark close-description" ></i>
                  </div>
                  <div className='active-reviews-container' style={{justifyContent: "center"}}>
                    <div className='active-reviews-extra'>
                      <div className='container-lastest-reviews'>
                        <CreateReview placeId= {placeId} setIsOVerlayCreateReviews={setIsOVerlayCreateReviews} />
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              ) }
              </h3>
              <div className="container-review">
                <div className="review-details">
                  {sixLastestReviews &&
                    sixLastestReviews.map((review, index) => (
                      <div className="content-details" key={index}>
                        <div className="container-details-users">
                          <img
                            className="avatar-user-review"
                            src={review?.userDTO?.avatar ? review?.userDTO?.avatar?.fileUrl : ('https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg')}
                            alt=""
                          />
                          <div>
                            <h3>{review?.userDTO.username}</h3>
                            <h4>{startRating(review.rating)}</h4>
                            <ConvertDateReview
                              date={review?.created_at}
                            ></ConvertDateReview>
                          </div>
                        </div>
                        <div className="content-user-review">
                          <p>{review?.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {placeReivew?.length >= 0 && (
                <button
                  className="btn-show-all-comfortable"
                  onClick={toggleOverlayReviews}
                >
                  Hiển thị tất cả {placeReivew?.length} đánh giá
                </button>
              )}
              {(
                <div className={`overlay2 ${isOverlayReviews ? '' : 'd-none'}`} >
                  <div style={{ width: '60%', height: '700px' }} className={`appearing-div ${isOverlayReviews ? 'active' : ''}`}>
                  <div>
                      <i onClick={toggleOverlayReviews} className="fa-solid fa-xmark close-description" ></i>
                  </div>
                  <div className='active-reviews-container'>
                    <div className='active-reviews-extra'>
                      <div className='container-lastest-reviews'>
                        {
                          lastestReviews && (
                            lastestReviews.map((review, index) => (
                                <div style={{ width: '100%' }}
                                    className='content-details' key={index}>
                                    <div className='container-details-users'>
                                        <img className='avatar-user-review'
                                            src={review?.userDTO?.avatar ?  review?.userDTO?.avatar?.fileUrl :  ('https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg')} alt="" />
                                        <div >
                                            <h3>{review?.userDTO.username}</h3>
                                            <h4>{startRating(review.rating)}</h4>
                                            <ConvertDateReview date={review?.created_at}></ConvertDateReview>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%' }}
                                        className='content-user-review'>
                                        <p>{review?.content}</p>
                                    </div>
                                </div>
                            ))
                        )
                        }
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div style={{ width: "1200px" }}>
            <div className="title"> 
              <h2>Nơi bạn sẽ đến</h2>
              {longitude && latitude &&(
                <LocationDetail
                  latitude={latitude}
                  longitude={longitude}
                />
              )}
            </div>
          </div>
          {placeNerby ? 
            <div style={{width: "1200px", marginTop: "20px"}}>
            <div className="title">
              <h2>Những địa điểm trong bán kính 2km</h2>
              <NerbyPlace/>
            </div>
          </div>
          : " "
          }
          
        </div>
      </div>
    </>
  );
}
