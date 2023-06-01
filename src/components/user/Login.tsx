import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { loginUser, logoutUser } from "../../features/users/userSlice";
import { LoginUser } from "../../features/users/userSlice";
import { useNavigate, Link } from "react-router-dom";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
  
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
      reValidateMode: "onChange",
      defaultValues: {
        email: "",
        password: "",
        token: ""
      },
    });
  
    const onSubmitLogin = async (data: LoginUser) => {
      await dispatch(loginUser(data));
      reset();
      navigate("/vehicles");
      window.location.reload();
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmitLogin)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                autoFocus
                {...register("email", { required: true })}
                error={Boolean(errors.email)}
                helperText={errors.email && "*Email is required"}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register("password", { required: true })}
                error={Boolean(errors.password)} // Set error prop based on the presence of errors.password
                helperText={errors.password && "*Password is required"} // Display error message if errors.password exists
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login ;




