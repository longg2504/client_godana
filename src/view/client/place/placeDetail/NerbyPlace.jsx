import React, { useState } from 'react';
import { usePlace } from '../../../../context/PlaceContext';
import startRating from '../../../../utils/StarRating';
import checkOpenClose from '../../../../utils/CheckOpenClose';
import PlaceNerbySlider from './PlaceNerbySlider';
import '../css/ClientDetail.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function NerbyPlace() {
    const { placeNerby } = usePlace();
    const [translateX, setTranslateX] = useState(0);
    const itemWidthPercent = 100 / 4; // 25% width of the viewport

    const handleNext = () => {
        if (translateX > -(placeNerby.length - 4) * itemWidthPercent) {
            setTranslateX(current => current - itemWidthPercent);
        }
    };

    const handleBack = () => {
        if (translateX < 0) {
            setTranslateX(current => current + itemWidthPercent);
        }
    };

    return (
        <div className='search-results-detail'>
            <IconButton className="button-nav left" onClick={handleBack} disabled={translateX === 0}>
                <ArrowBackIosIcon />
            </IconButton>
            <div className="listings-container" style={{ overflow: 'hidden', width: '100%', display: 'flex' }}>
                <div className="listings-slider" style={{ transform: `translateX(${translateX}%)`, transition: 'transform 0.3s ease-out', display: 'flex', width: 'max-content' }}>
                    {placeNerby.map((place, index) => (
                        <div key={index} className="listing" style={{ width: `${itemWidthPercent}%`, margin: '0 20px' }}>
                            <PlaceNerbySlider place={place} />
                            <div className="listing-header" style={{ marginTop: '20px' }}>
                                <h3 className="hotel-name">{place?.placeTitle}</h3>
                                <div className="review">
                                    <h4>
                                        {startRating(place.rating ? place.rating : 0)}
                                    </h4>
                                    <span style={{ fontSize: "13px" }}>
                                        {place.locationRegion?.address + ", " + place.locationRegion?.wardName + ", " + place.locationRegion?.districtName + ", " + place.locationRegion?.provinceName + ", "}
                                    </span>
                                </div>
                                <span>{checkOpenClose(place.contact.openTime, place.contact.closeTime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <IconButton className="button-nav right" onClick={handleNext} disabled={translateX <= -(placeNerby.length - 4) * itemWidthPercent}>
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
}
