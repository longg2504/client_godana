import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2} className='note'>
                    <Grid xs={12}>
                        <img
                            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vqzw668bzvfp83ba755d.jpg"
                            alt=""
                            width={1000} height={500}
                        />
                        <Typography variant="h3" className='textCenter' sx={{ marginBottom: "3%" }}>
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Link to="/" className='justifyCenter'>
                            <Button variant="contained">Back Home</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default NotFoundPage;