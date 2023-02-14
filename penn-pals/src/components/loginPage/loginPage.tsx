import Avatar from "@mui/material/Avatar";
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Link} from 'react-router-dom'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllUsers } from "../../service/contactDB";
import logo from "./logo.png";
import {useState} from "react";

const theme = createTheme();

function LoginPage(){
   
  const navigate = useNavigate();

  const [userName, setUser] = useState('')
  const handleUser = (e : any) => {
      setUser(e.target.value)
  }
  const [password, setPassword] = useState('')
  const handlePassword = (e : any) => {
      setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    await getAllUsers().then((data) => {
      for (var i = 0; i < data.length; i = i + 1) {
        if (userName === data[i].userid){
          if(password === data[i].password){
            navigate(`/feed/${data[i].id}`)
            break
          } 
        }
        else if (userName === data[i].email){
          if(password === data[i].password){
            navigate(`/feed/${data[i].id}`)
            break
          } 
        }
      }  
  });

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <img src={logo} alt="logo" height="60" />

          <Avatar sx={{ mt: 4, mb: 2, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, border: 0, borderRadius: "16px" }}
          >
            <TextField
              margin="normal"
              required
              onChange = {handleUser}
              fullWidth
              id="userName"
              label="Username or Email"
              name="userName"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              onChange = {handlePassword}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          <Grid container justifyContent="center">
            <Button
              name="signin"
              text-aline="center"
              onClick = {handleSubmit}
              variant="contained"
              sx={{ mt: 4, mb: 4, bgcolor: "black" }}
            >
              Sign In
            </Button>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link to= "/forgotPassword" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to= "/signUp" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;

