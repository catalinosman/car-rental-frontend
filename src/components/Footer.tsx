import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
    
    function Copyright() {
      return (
        <Typography variant="body2" color="white">
          {'Copyright © '}
          <Link color="inherit" href="https://www.linkedin.com/in/catalin-osman-5b2197259/">
            Catalin Osman
          </Link>{' '}
          {'.'}
        </Typography>
      );
    }
    
    
    const Footer = () => {
      return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}
          >
            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: "#1976d2"
              }}
            >
              <Container maxWidth="xl">
                <Copyright  />
              </Container>
            </Box>
          </Box>
      );
    }


export default Footer;