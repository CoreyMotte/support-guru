import { useContext, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import { useForm } from '../Utilities/hooks';
import { useMutation } from '@apollo/react-hooks';

import { TextField, Button, Container, Stack, Alert, Input, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

const CREATE_TICKET = gql`
    mutation Mutation($ticketInput: TicketInput) {
        createTicket(ticketInput: $ticketInput) {
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

function CreateTicket(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    console.log("context", context);
    console.log(localStorage.getItem("user_id"))

    function createTicketCallback() {
        console.log(context.user)
        createTicket();
    }

    const { onChange, onSubmit, values } = useForm(createTicketCallback, {
        title: "",
        description: "",
        category: "",
        priority: "",
        createdBy: ""
    });

    
    values.createdBy = context.user.user_id;

    const [createTicket] = useMutation(CREATE_TICKET, {
        update(proxy, { data: { createTicket: ticketData } }) {
            console.log(ticketData);
            navigate(`/ticket/${ticketData._id}`);
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { ticketInput: values }
    });

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Create Ticket</h3>
            <p>This is the new ticket page, enter ticket info below</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Title"
                    name="title"
                    onChange={onChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    multiline
                    minRows={4}
                    maxRows={6}
                    onChange={onChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="category-dropdown">Category</InputLabel>
                    <Select
                        labelId="category-dropdown"
                        name="category"
                        value={values.category}
                        label="Category"
                        onChange={onChange}
                    >
                        <MenuItem value="System Down">System Down</MenuItem>
                        <MenuItem value="Troubleshooting">Troubleshooting</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="priority-dropdown">Priority</InputLabel>
                    <Select
                        labelId="priority-dropdown"
                        name="priority"
                        value={values.priority}
                        label="Priority"
                        onChange={onChange}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Normal">Normal</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </Container>
    )
}

export default CreateTicket;