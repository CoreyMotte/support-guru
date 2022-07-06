import * as React from 'react';
import TicketCard from './TicketCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';

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
        {data ? data.findOpenTickets.map((ticket) => {
                    return (
                        <TicketCard ticket={ticket}></TicketCard>
                    )
                }) : ""}
        </>
    )
}

export default AdminDashboard;