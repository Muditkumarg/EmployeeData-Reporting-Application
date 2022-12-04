import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './login.css'
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const initialState = { email: "", password: "" };
  const [data, setData] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }
  const login = () => {
    axios.post('http://localhost:5000/api/login', data).then((res) => {
      const { message, success, result } = res.data;
      if (success) {
        swal({
          text: message,
          icon: "success"
        }).then(() => {
          setData(result);
          navigate("/DataGrid")
        })
      }
      else {
        swal({
          text: message,
          icon: "error"
        })
      }
    })
  }
  const [error, setError] = useState({});
  const Error_validation = (value) => {
    let error = {};
    const regexForEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!value.email || !regexForEmail.test(value.email)) {
      error.email = "Please Enter Email";
    }
    if (!value.password) {
      error.password = "Please Enter Password";
    }
    return setError(error)
  }
  const OnSubmitClick = (e) => {
    Error_validation(data);
    login();
  }
  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Avatar><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign in </Typography>
        <Box >
          <Grid item xs={12} >
            <TextField margin="normal" fullWidth label="Email Address" name="email" onChange={handleInputChange} autoComplete="email" />
            <p className='textColor'>{error.email}</p>
          </Grid>
          <Grid item xs={12}>
            <TextField margin="normal" fullWidth label="Password" name="password" onChange={handleInputChange} type="password" autoComplete="current-password" />
            <p className='textColor'>{error.password}</p>
          </Grid>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" onClick={OnSubmitClick} >Sign In</Button>
          <Grid container>
            <Grid item>
              <Link className='link-style' href="/SignUp" variant="body2"> {"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}