import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';
import { Typography, Container, Box } from '@mui/material';

function Denied() {

    const { user, logout } = useContext(AuthContext);

    return (
        <>
        <p>Sorry you are denied!</p>
        </>
    )
}

export default Denied;