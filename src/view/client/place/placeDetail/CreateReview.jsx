import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert';
import RatingService from '../../../../service/RatingService';
import { useNavigate } from 'react-router';

function Rating({ value, onChange }) {
    const [hover, setHover] = useState(0);
    
    return (
        <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index} style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                style={{ display: 'none' }}
                onClick={() => onChange(ratingValue)}
                required
              />
              <FontAwesomeIcon
                icon={faStar}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                style={{ color: ratingValue <= (hover || value) ? 'gold' : 'grey' }}
                required
              />
            </label>
          );
        })}
      </div>
    );
  }

export default function CreateReview(prop) {
    const userId = localStorage.getItem('id');
    const avatar = localStorage.getItem('avatar');
    const fullName = localStorage.getItem('name')
    const [review, setReview] = useState({
        content: '',
        rating: 0,
        userId: userId,
        placeId: prop.placeId
      });

      const navigate = useNavigate();

    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
      };
    
      const handleRatingChange = (rating) => {
        setReview({ ...review, rating });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();

        if(!review.rating){
          Swal({
            title: "Thông báo!",
            text:  "Xin vui lòng chọn điểm để tạo đánh giá",
            icon: "error",
            timer: 1500
        })
        }
        RatingService.createReview(review)
        .then(response => {
          Swal({
            title: "Thông báo!",
            text: "Viết đánh giá thành công!",
            icon: "success",
            timer: 1000
        }).then(() => {
          window.location.reload();  // Tải lại trang sau khi thông báo thành công
        });
        })
        .catch(error => {
          Swal({
            title: "Thông báo!",
            text: "Viết đánh giá thất bại!",
            icon: "error",
            timer: 1000
        })
        })
        console.log('Review Submitted:', review);
      };
    
      return (
        <div className="container mt-5 text-center">
          <div className='user-reivew'>
              <img className='avatar-user-review' src={avatar ? avatar : ('https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg')} />
              <span>{fullName}</span>
          </div>
          <h1 className='mb-3'>Đánh Giá Địa Điểm</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <Rating value={review.rating} onChange={handleRatingChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Nội dung đánh giá</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="3"
                value={review.content}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Gửi Đánh Giá</button>
          </form>
        </div>
      );
}
