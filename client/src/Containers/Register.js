import { useContext, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import { useForm } from '../Utilities/hooks';
import { useMutation } from '@apollo/react-hooks';

import { TextField, Button, Container, Stack, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
    ) {
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
            perms
        }
    }
`

function Register(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function registerUserCallback() {
        console.log("Callback hit");
        registerUser();
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        admin_requested: ""
    })

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            console.log(userData);
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Register</h3>
            <p>This is the register page, register below to create an account</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Username"
                    name="username"
                    onChange={onChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    onChange={onChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="admin_requested_dropdown">Privileges</InputLabel>
                    <Select
                        labelId="admin_requested_dropdown"
                        name="admin_requested"
                        value={values.admin_requested}
                        label="Admin privileges"
                        onChange={onChange}
                    >
                        <MenuItem value="false">Normal User</MenuItem>
                        <MenuItem value="true">Admin</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            {errors.map(function (error) {
                return (
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant="contained" onClick={onSubmit}>Register</Button>
        </Container>
    )
}

export default Register;