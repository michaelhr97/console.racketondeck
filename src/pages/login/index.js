import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Box, Container, TextField, Typography, Button, Alert } from '@mui/material';

import authService from '../../services/authService';
import { setAuthorizationToken } from '../../lib/axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const initialValues = { email: '', password: '' };
  const [error, setError] = useState('');

  const handleFormSubmit = async (values) => {
    try {
      const response = await authService.login(values);
      setAuthorizationToken(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {({ handleSubmit, touched, errors, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                autoFocus
                variant='filled'
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                variant='filled'
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                sx={{ mb: 2 }}
              />
              {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Button type='submit' variant='contained' color='primary' fullWidth>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Login;
