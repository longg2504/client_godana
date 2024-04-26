import React, { useEffect, useState } from 'react';
import AutoPlaySwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import "./css/Slider.css"
import { Link } from 'react-router-dom';


const VirtualizeSwipeableViews = virtualize(AutoPlaySwipeableViews);

export default function PlaceSlider({ place }) {
    const theme = useTheme();
    const maxSteps = place ? place?.placeAvatar.length ? place?.placeAvatar.length > 7 ? 7 : place?.placeAvatar.length : place?.placeAvatar.length : place?.placeAvatar.length;
    const [activeStep, setActiveStep] = useState(0);
    const [buttonOpacity, setButtonOpacity] = useState(0);


    const huy = activeStep;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
    };


    const handleMouseLeave = () => {
        if (buttonOpacity === 1) {
            setButtonOpacity(0);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <VirtualizeSwipeableViews
                index={activeStep}
                onChangeIndex={setActiveStep}
                enableMouseEvents
                slideRenderer={({ index }) => (
                    <div key={index} className="custom-image-container">
                        <Link to={`/place/${place.id}`}>
                            <img className='img'
                                onMouseEnter={() => setButtonOpacity(1)}
                                onMouseLeave={() => setButtonOpacity(0)}
                                src={place.placeAvatar[huy].fileUrl}
                                alt={`Image ${index + 1}`}
                                style={{
                                    width: '96%',
                                    height: '250px',
                                    
                                }}
                            />
                        </Link>
                    </div>
                )}
            />
            <MobileStepper
                style={{ opacity: buttonOpacity }}
                onMouseOut={() => setButtonOpacity(1)}
                onMouseLeave={handleMouseLeave}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        className="stepper-button"
                        size="small"
                        onClick={handleNext}
                        // disabled={activeStep === maxSteps - 1}
                        style={{ opacity: buttonOpacity }}
                        onMouseOut={() => setButtonOpacity(1)}
                        onMouseLeave={handleMouseLeave}
                    >

                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button className="stepper-button"
                        onMouseOut={() => setButtonOpacity(1)}
                        onMouseLeave={handleMouseLeave}
                        style={{ opacity: buttonOpacity }}
                        size="small" onClick={handleBack}
                    // disabled={activeStep === 0}>
                    >

                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}

                    </Button>
                }
            />
        </Box>
    );
}

