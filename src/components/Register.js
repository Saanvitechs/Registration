import React, { useState } from 'react';
import { TextField, Button, Card, Typography, Grid, Box, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import authService from '../services/authService';
import './Register.module.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(''); // State for backend error messages

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password,
      };
      
      await authService.register(userData);
      
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setBackendError(error.response.data.message); // Set the backend error message
      } else {
        setBackendError("Registration failed. Please try again.");
      }
      
      }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="center" style={{ height: '100vh', backgroundImage: `url(${require('./images/signup.svg').default})`, backgroundSize: 'cover', paddingRight: '50px' }}>
      <Grid item xs={12} sm={8} md={4}>
        <Card raised style={{ padding: '40px', borderRadius: '20px', backgroundColor: 'white', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
            Create New Account
          </Typography>
          {backendError && (
            <Typography variant="body2" color="error" style={{ marginBottom: '15px' }}>
              {backendError}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                style={{ marginBottom: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                style={{ marginBottom: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                style={{ marginBottom: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                style={{ marginBottom: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}
              />
               <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                style={{ marginBottom: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                style={{ marginBottom: '20px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                style={{ backgroundColor: '#F5F5F5', borderRadius: '10px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ borderRadius: '30px', padding: '10px' }}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: '20px', color: '#212429' }}>
            Already Registered? <a href="/login" style={{  textDecoration: 'none' }}>Login</a>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
