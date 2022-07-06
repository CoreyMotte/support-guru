import * as React from 'react';
import TicketCard from './TicketCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';

const GET_CREATED_BY = gql`
    query FindCreatedBy($id: String!) {
    findCreatedBy(_id: $id) {
        _id
    title
    description
    isOpen
    createdAt
    priority
    category
  }
}
`;

const UserDashboard = ({user}) => {
    const { data, loading, error } = useQuery(GET_CREATED_BY, { variables: { id: user.user_id } });

    return (
        <>
        {data ? data.findCreatedBy.map((ticket) => {
                    return (
                        <TicketCard ticket={ticket}></TicketCard>
                    )
                }) : ""}
        </>
    )
}

export default UserDashboard;