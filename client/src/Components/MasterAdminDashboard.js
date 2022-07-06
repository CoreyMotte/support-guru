import * as React from 'react';
import TicketCard from './TicketCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import UserCard from '../Components/UserCard'

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
            {data ? data.pendingAdminUsers.map((user) => {
                return (
                    <UserCard user={user}></UserCard>
                )
            }) : ""}
        </>
    )
}

export default MasterAdminDashboard;