import * as React from 'react';
import TicketCard from './TicketCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { Container, Box, Typography } from '@mui/material';

const GET_CREATED_BY = gql`
    query findCreatedBy($id: String!) {
    findCreatedBy(_id: $id) {
        _id
    title
    description
    isOpen
    createdAt
    priority
    category
      createdBy {
        _id
      }
    }
}
`;

const UserDashboard = ({userId}) => {
    console.log("user id ", userId)
    const { data, loading, error } = useQuery(GET_CREATED_BY, { variables: { id: userId } } );
    console.log("return data ", data)

    return (
        <>
        <Container spacing={2} maxWidth="md">
        <Typography variant="h4" align="center" marginBottom="30px">Your Open Tickets</Typography>
        {data ? data.findCreatedBy.map((ticket) => {
            if (ticket.isOpen === true) {
                return (
                    <TicketCard ticket={ticket}></TicketCard>
                )
                }
                    
                }) : ""}
        
        </Container>
        </>
    )
}

export default UserDashboard;