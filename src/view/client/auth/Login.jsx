import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Swal from "sweetalert";
import axios from "axios";
import logo from "../../../images/Da-Nang.jpg";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "../../../service/AuthService";
import Alert from "@mui/material/Alert";
import { URL_BASE, USER } from "../../../constant/AppConstant";

export let instance = {};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="/">
        Go Da Nang Travel
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    AuthService.login(data)
      .then((response) => {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("roles", response.data.roles[0].authority);
        localStorage.setItem(
          "avatar",
          response.data.userAvatar?.fileUrl
            ? response.data.userAvatar?.fileUrl
            : ""
        );
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        instance = axios.create({
          baseURL: URL_BASE,
          headers: {
            Authorization: response.token,
            "Content-Type": "application/json",
          },
        });

        if (localStorage.getItem("roles") === USER) {
          Swal({
            title: "Thông báo!",
            text: "Đăng nhập thành công!",
            icon: "success",
            timer: 1000,
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch((error) => {
        let message = "";
        if (error.response && error.response.data) {
          message =
            error.response.data.username ||
            error.response.data.password ||
            error.response.data.message;
        }
        Swal({
          title: "Thông báo!",
          text: message,
          icon: "error",
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Go Da Nang Travel
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid item>
                <Link variant="body2" href={"/signup"}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
