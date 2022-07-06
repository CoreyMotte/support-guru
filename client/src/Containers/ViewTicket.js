import { useContext, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import { useForm } from '../Utilities/hooks';
import { useMutation, useQuery } from '@apollo/react-hooks';
import TicketCard from '../Components/TicketCard'

import { TextField, Card, Button, Container, Stack, Alert, Input, InputLabel, FormControl, Select, MenuItem, Box } from '@mui/material';

import { gql } from 'graphql-tag';
import { useNavigate, useParams } from 'react-router-dom';

const GET_TICKET = gql`
    query Ticket($id: String!) {
        ticket(_id: $id) {
            _id
            title
            description
            isOpen
            createdAt
            createdBy {
            _id
            }
            priority
            category
  }
}
`

function ViewTicket(props) {
    // Get ticket ID from url params
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_TICKET, { variables: { id } });

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <Container maxWidth="sm">
            <h2>Individual ticket view for ticket {id}</h2>
            
            <TicketCard ticket={data.ticket}></TicketCard>
            


        </Container>

    )
}

export default ViewTicket;