import React from 'react'
import "../../client/place/css/Client.css"

const ShowNoFilterResult = () => {
    return (
        <div style={{textAlign: "center"}}>
            <div className='no-filter-results'>
                <h2>Không có kết quả tìm kiếm phù hợp</h2>
                <p>Hãy thử thay đổi tìm kiếm của bạn</p>
            </div>
        </div>
    )
}

export default ShowNoFilterResult