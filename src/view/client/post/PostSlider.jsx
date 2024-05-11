import React, { useEffect, useState } from 'react';
import AutoPlaySwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import "../place/css/Slider.css";
import { Link } from 'react-router-dom';

const VirtualizeSwipeableViews = virtualize(AutoPlaySwipeableViews);

export default function PostSlider({ post }) {
    const theme = useTheme();
    
    // Kiểm tra số lượng ảnh trong post.postAvatar
    const maxSteps = post?.postAvatar?.length > 0 ? (post?.postAvatar.length > 7 ? 7 : post?.postAvatar.length) : 0;

    const [activeStep, setActiveStep] = useState(0);
    const [buttonOpacity, setButtonOpacity] = useState(0);

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

    // Nếu không có ảnh trong post.postAvatar, không hiển thị slider
    if (maxSteps === 0) {
        return null;
    }

    return (
        <Box sx={{ maxWidth: 550, flexGrow: 1 }}>
            <VirtualizeSwipeableViews
                index={activeStep}
                onChangeIndex={setActiveStep}
                enableMouseEvents
                slideRenderer={({ index }) => (
                    <div key={index} className="custom-image-container">
                        <Link>
                            <img
                                className='img'
                                onMouseEnter={() => setButtonOpacity(1)}
                                onMouseLeave={() => setButtonOpacity(0)}
                                src={post.postAvatar[activeStep] ? post.postAvatar[activeStep].fileUrl : ""}
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
                        style={{ opacity: buttonOpacity , top:"150px"}}
                        onMouseOut={() => setButtonOpacity(1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        className="stepper-button"
                        onMouseOut={() => setButtonOpacity(1)}
                        onMouseLeave={handleMouseLeave}
                        style={{ opacity: buttonOpacity , top:"150px"}}
                        size="small"
                        onClick={handleBack}
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </Button>
                }
            />
        </Box>
    );
}
