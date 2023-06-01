import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link}  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

import { getUserProfile } from "../../features/users/userSlice";


const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const user = useSelector((state: RootState) => 
    state.user.userProfile
  )

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);


  return (
    
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
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            User's Information
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">First Name : {user.firstName}</Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h6">Last Name : {user.lastName} </Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h6">Email Address : {user.email} </Typography>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Link to="/update">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              
              Update Profile
             
            </Button>
            </Link>
          </Box>
        </Box>
      </Container>
  );
};

export default UserProfile;






// <div className="user-profile-container">
// <div className="user-profile">
//   <h2>User Profile</h2>
//   <p>First Name: {user.firstName}</p>
//   <p>Last Name: {user.lastName}</p>
//   <p>Email: {user.email}</p>
//   <Link to="/update">
//     <button>Edit Profile</button>
//   </Link>
// </div>
// </div>