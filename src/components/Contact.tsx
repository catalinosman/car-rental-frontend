import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


const About = () => {
 
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
            <ConnectWithoutContactIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Contact Us ON
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">phone: 02412422 </Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h5">email : catalin.osman8@gmail.com </Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h5">linkedin : Catalin Osman </Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h5">github : github.com/catalinosman </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};

export default About;










// const Contact  = () => {
//     return (
//         <div className="contact-style">
//             <h2> You can contact us at :
//                 <ul>
//                 <h5><li> phone - 0298421939</li></h5>  
//                 <h5><li> Email - catalin.osman8@gmail.com</li></h5>
//                 <h5><li> LinkedIn - Catalin Osman</li></h5>
//                 </ul>
//             </h2>
//         </div>
//     );
// };

// export default Contact;