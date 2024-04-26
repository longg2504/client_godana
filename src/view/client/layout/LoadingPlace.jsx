import React from 'react'

const LoadingPlaceList = () => {
    const numberOfDivLoading = 30;
    const loadingDivs = Array.from(
        { length: numberOfDivLoading },
        (_, index) => (
            <div key={index} className="listing">
                <div>
                    <img style={{width:'100%'}}
                     src='https://haycafe.vn/wp-content/uploads/2022/05/Background-xam-1.jpg'></img>
                </div>
                <div>
                    <div className='loading-group'>
                        <div>
                            <button className='loading-btn-1'></button>
                        </div>
                        <div>
                            <button className='loading-btn-5'></button>
                        </div>
                    </div>
                    <div>
                        <button className='loading-btn-2'></button>
                        <button className='loading-btn-3'></button>
                        <button className='loading-btn-4'></button>
                    </div>

                </div>
            </div>
        ))
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{loadingDivs}</div>
    )
}

export default LoadingPlaceList