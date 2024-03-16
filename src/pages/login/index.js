import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import authService from '../../services/authService';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const initialValues = { email: '', password: '' };

  const handleFormSubmit = async (values) => {
    const response = await authService.login(values);
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
