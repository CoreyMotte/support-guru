import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';
import { Typography, Container, Box } from '@mui/material';

function Denied() {

    const { user, logout } = useContext(AuthContext);

    return (
        <>
        <Typography variant="h4" align="center" marginTop="30px">Your access has been denied. Please reach out to your supervisor.</Typography>
        </>
    )
}

export default Denied;