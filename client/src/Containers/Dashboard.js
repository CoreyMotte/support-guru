import { AuthContext } from '../Context/authContext';
import { useContext, useEffect, useState, useMemo } from 'react';
import { useForm } from '../Utilities/hooks';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { TextField, Button, Container, Stack, Alert, Link } from '@mui/material';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import TicketCard from '../Components/TicketCard'
import AdminDashboard from '../Components/AdminDashboard';
import UserDashboard from '../Components/UserDashboard';
import MasterAdminDashboard from '../Components/MasterAdminDashboard';



function Dashboard(props) {

    const { user, logout } = useContext(AuthContext);
    let navigate = useNavigate();



    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

    }, [user]);


    const handleDashboardRender = (user) => {
        switch (user.perms) {
            case 'master_admin':
                return (
                    <div>
                        <MasterAdminDashboard />
                        <AdminDashboard />
                    </div>
                )

            case 'admin':
                if (user.pending_admin || user.denied) {
                    return (
                        <>

                        </>
                    )
                } else {
                    return (
                        <AdminDashboard />
                    )
                }

            default:
                return (
                    <UserDashboard user={user} />
                )

        }
    }

    return (
        <>
            <p>This is the dashboard</p>
            <Link href="/new">Click here to open a new ticket</Link>
            <div>
                {handleDashboardRender(user)}
            </div>
        </>
    )

}

export default Dashboard;