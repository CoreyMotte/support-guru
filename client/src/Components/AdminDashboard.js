import * as React from 'react';
import TicketCard from './TicketCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { Container, Box, Typography } from '@mui/material';

const GET_OPEN_TICKETS = gql`
    query FindOpenTickets {
        findOpenTickets {
    _id
    isOpen
    title
    description
    createdAt
    createdBy {
      _id
    }
    priority
    category
  }
}
`;

const AdminDashboard = () => {

    const { data, loading, error } = useQuery(GET_OPEN_TICKETS);

    return (
        <>
        <Container spacing={2} maxWidth="md">
        <Typography variant="h4" align="center" marginTop="30px">All Open Tickets</Typography>
        {data ? data.findOpenTickets.map((ticket) => {
                    return (
                        <TicketCard ticket={ticket}></TicketCard>
                    )
                }) : ""}
        </Container>
        </>
    )
}

export default AdminDashboard;