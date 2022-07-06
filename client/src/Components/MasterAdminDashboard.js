import * as React from 'react';
import TicketCard from './TicketCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import UserCard from '../Components/UserCard'
import { Container, Box, Typography } from '@mui/material';

const GET_PENDING_USERS = gql`
    query PendingAdminUsers {
        pendingAdminUsers {
            _id
            username
            email
            pending_admin
  }
}
`

const MasterAdminDashboard = () => {

    const { data } = useQuery(GET_PENDING_USERS);


    return (
        <>
        <Container spacing={2} maxWidth="md">
        <Typography variant="h4" align="center" marginTop="30px">Pending Admin Users</Typography>
            

            {data ? data.pendingAdminUsers.map((user) => {
                return (
                    <UserCard user={user}></UserCard>
                )
            }) : "There are no pending admin users."}
        </Container>

        </>
    )
}

export default MasterAdminDashboard;