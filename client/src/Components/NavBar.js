import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';

function NavBar() {
    let navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/');
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div">
                        <Link to='/' style={{ textDecoration: "none", color: "white" }}>SupportGuru</Link>
                    </Typography>
                    <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
                        {user ?
                            <>
                                <Link to="/dashboard" style={{ textDecoration: "none", color: "white", marginRight: "20px"}}>Dashboard</Link>
                                <Button style={{ textDecoration: "none", color: "white"}} onClick={onLogout}>Logout</Button>
                            </>
                            :
                            <>
                                <Link to='/login' style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>Login</Link>
                                <Link to='/register' style={{ textDecoration: "none", color: "white" }}>Register</Link>
                            </>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;