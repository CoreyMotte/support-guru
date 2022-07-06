import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';
import { Typography, Container, Box } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

function HomePage() {

    const { user, logout } = useContext(AuthContext);

    return (
        <>
        <Container spacing={2} maxWidth="lg" sx={{alignItems: "center"}}>
            <Typography variant="h3" align="center" marginTop="30px" sx={{fontWeight: "bold"}}>Welcome to Support Guru</Typography>
            <Box mt={20}>
            <Typography variant="h4" align="center" marginTop="30px">Support Guru is a simple ticketing system to manage incoming requests from your clients.</Typography>
            <Typography variant="h5" align="center" marginTop="30px">Register an account or log in to get started!</Typography>
            </Box>
            </Container>
        </>
    )
}

export default HomePage;
// {
//     user ?
//         <>
//             <Typography>{user.email} is logged in</Typography>
//         </>
//         :
//         <>
            
//         </>
// }