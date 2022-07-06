import { useContext, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import { useForm } from '../Utilities/hooks';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux'
import { logInUserRedux } from '../Redux/Actions/userActions';

import { TextField, Button, Container, Stack, Alert } from '@mui/material';

import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

const LOGIN_USER = gql`
    mutation login(
      $loginInput: LoginInput
    ) {
      loginUser(
          loginInput: $loginInput
      ) {
          _id
          email
          username
          token
          perms
          denied
      }
    }
`

function Login(props) {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, results) {
      const userData = results.data.loginUser
      if (userData.denied === true) {
        navigate('/denied');
      } else {
        context.login(userData);
        navigate('/');
      }


    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values }
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>This is the login page, log in below</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="Email"
          name="email"
          onChange={onChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return (
          <Alert severity="error">
            {error.message}
          </Alert>
        )
      })}
      <Button variant="contained" onClick={onSubmit}>Login</Button>
    </Container>
  )
}

export default Login;