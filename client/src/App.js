import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './Containers/HomePage';
import NavBar from './Components/NavBar'
import Register from './Containers/Register';
import Login from './Containers/Login';
import Dashboard from './Containers/Dashboard';
import CreateTicket from './Containers/CreateTicket';
import ViewTicket from './Containers/ViewTicket';
import { AuthContext } from './Context/authContext';
import jwtDecode from 'jwt-decode';
import './App.css';

function App() {
  let context = useContext(AuthContext);
  console.log(context);
  let isLoggedIn = false;

  React.useEffect(() => {
    
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log('expired token')
        localStorage.removeItem("token")
        context.logout();
        window.location.href = "/";
      } else {
        
        const user_id = localStorage.getItem("user_id")
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        const username = localStorage.getItem("username")
        const perms = localStorage.getItem("perms")

        const userContext = {
          _id: user_id,
          token: token,
          email: email,
          username: username,
          perms: perms,
        }

        console.log("context:", userContext)

        if (userContext.user_id) {
          context.login(userContext);
          isLoggedIn = true;
        }
      }
    }

  }, [isLoggedIn])
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new" element={<CreateTicket />} />
        <Route path="/ticket/:id" element={<ViewTicket />} />
      </Routes>
    </div>
  );
}


export default App;

    // isLoggedIn = true;
