import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from '../../../service/AuthService';
import Alert from '@mui/material/Alert';
import Swal from "sweetalert";


// Yup schema for form validation
const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required')
}).required();

export default function SignUp() {
  const { control, handleSubmit, setError, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });
  const [serverError, setServerError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const onSubmit = async data => {
    const { rePassword, ...submissionData } = data;

    const formData = new FormData();
    formData.append('email', submissionData.email);
    formData.append('username', submissionData.username);
    formData.append('password', submissionData.password);
    formData.append('fullName', submissionData.fullName);

    try {
      console.log(submissionData)
      const response = await AuthService.register(formData);
      setSuccessMessage('Tạo tài khoản thành công ! Bạn có thể đăng nhập.');
      setTimeout(() => setSuccessMessage(''), 2000);
      reset();
    } catch (error) {
      setServerError(error.response.data.message || 'Failed to register. Please try again.');
      console.log(error, "error")
      // Handling form-specific errors, if error details are structured appropriately
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            {serverError && <Alert severity="error">{serverError}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      required
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Username"
                      required
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      required
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      fullWidth
                      label="Password"
                      required
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="rePassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      fullWidth
                      label="Re-enter Password"
                      required
                      error={!!errors.rePassword}
                      helperText={errors.rePassword?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
