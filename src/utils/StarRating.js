export default function startRating(rating){
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5; // Kiểm tra phần thập phân của rating
    return (
        <div>
      {/* Hiển thị các ngôi sao đầy đủ */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} style={{ color: 'gold' }}><i className="fa-solid fa-star"></i></span>
      ))}

      {/* Hiển thị ngôi sao một phần nếu có */}
      {hasHalfStar && <span style={{ color: 'gold' }}><i className="fa-solid fa-star-half-stroke"></i></span>}

      {/* Hiển thị các ngôi sao rỗng còn lại */}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <span key={index} style={{ color: 'gray' }}><i className="fa-regular fa-star"></i></span>
      ))}
    </div>
    )
}