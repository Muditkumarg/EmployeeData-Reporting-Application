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
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const navigate = useNavigate();
    const initialState = { firstName: "", lastName: "", email: "", phone: "", password: "", conpassword: "" }
    const [data, setData] = React.useState(initialState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const registration = () => {
        axios.post('http://localhost:5000/api/registration', data).then((res) => {
            const { message, success, result } = res.data;
            if (success) {
                swal({
                    text: message,
                    icon: "success"
                }).then(() => {
                    setData(result);
                    navigate('/');
                })
            } else {
                swal({
                    text: message,
                    icon: "error"
                })
            }
        })
    }
    const [errors, setErrors] = React.useState({});
    const handleValidate = (value) => {
        let errors = {};
        const regexForEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const regixForPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!value.firstName) {
            errors.firstName = "first name is required."
        }
        if (!value.lastName) {
            errors.lastName = "last name is required."
        }
        if (!value.password) {
            errors.password = "password is required."
        }
        if (!value.conpassword) {
            errors.conpassword = "confirm password is required"
        }
        if (!regexForEmail.test(value.email) || !regixForPhone.test(value.phone)) {
            swal({
                text: "email or phone fomate wrong!",
                icon: "error"
            })
            errors.phone = "phone [10-12] is required";
            errors.email = "email is required @gmail formate.";
        }
        else {
            if (value.password === value.conpassword) {
                registration();
            } else {
                swal({
                    text: "password is not matched",
                    icon: "error"
                })
                errors.conpassword = "confirm password is required";
            }
        }
        setErrors(errors);
    }
    const handleSubmit = () => {
        handleValidate(data);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField name="firstName" fullWidth label="First Name" onChange={handleInputChange} />
                            <p className="textColor">{errors.firstName}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" name="lastName" onChange={handleInputChange} />
                            <p className="textColor">{errors.lastName}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email Address" name="email" onChange={handleInputChange} />
                            <p className="textColor">{errors.email}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Phone Number" name="phone" onChange={handleInputChange} />
                            <p className="textColor">{errors.phone}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth name="password" label="Password" type="password" onChange={handleInputChange} />
                            <p className="textColor">{errors.password}</p>
                            <TextField fullWidth name="conpassword" label="Confirm Password" type="password" onChange={handleInputChange} />
                            <p className="textColor">{errors.conpassword}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox />} label="remember me"/>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >Sign Up</Button>
                    <Grid>
                        <Grid item>
                            <Link className='link-style' href="/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
