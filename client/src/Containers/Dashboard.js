import { AuthContext } from '../Context/authContext';
import { useContext, useEffect, useState, useMemo } from 'react';
import { useForm } from '../Utilities/hooks';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { TextField, Button, Container, Stack, Alert, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import TicketCard from '../Components/TicketCard'
import AdminDashboard from '../Components/AdminDashboard';
import UserDashboard from '../Components/UserDashboard';
import MasterAdminDashboard from '../Components/MasterAdminDashboard';



function Dashboard(props) {

    const { user } = useContext(AuthContext);
    let navigate = useNavigate();

    console.log("context", user);
    




    const handleDashboardRender = () => {
        let userPerms = localStorage.getItem("perms")
        let userId = localStorage.getItem("user_id")
        switch (userPerms) {
            case 'master_admin':
                return (
                    <div>
                        <MasterAdminDashboard />
                    </div>
                )

            case 'admin':
                return (
                    <div>
                        <AdminDashboard />
                    </div>
                )


            case 'normal_user':
                return (
                    <div>
                        <UserDashboard userId={userId} />
                    </div>
                )

        }
    }

    return (
        <>
            <p>This is the dashboard</p>
            <Link to="/new" style={{ textDecoration: "none", marginRight: "20px" }}>Create New Ticket</Link>
            <div>
                {handleDashboardRender()}
            </div>
        </>
    )

}

export default Dashboard;