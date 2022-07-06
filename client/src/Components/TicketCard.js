import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Backdrop, Fade, Stack, TextField, Alert } from '@mui/material';
import { useForm } from '../Utilities/hooks';
import { useNavigate } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import { useMutation } from '@apollo/react-hooks';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    alignItems: 'center'
};

const UPDATE_TICKET = gql`
    mutation Mutation($updateTicketInput: UpdateTicketInput) {
        updateTicket(updateTicketInput: $updateTicketInput) {
            _id
            title
            description
    
  }
}
`

const CLOSE_TICKET = gql`
    mutation Mutation($id: String) {
  closeTicket(_id: $id) {
    isOpen
  }
}
`

function TicketCard({ ticket: { _id, title, description, isOpen, category, priority, createdAt }}) {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);


    function updateTicketCallback() {
        updateTicket();
        handleClose();
        console.log('firing');
    }

    const [closeTicket, { data }] = useMutation(CLOSE_TICKET, {variables: {id: _id}});

    const { onChange, onSubmit, values } = useForm(updateTicketCallback, {
        _id: "",
        title: "",
        description: "",
    });

    values._id = _id
    console.log(_id)

    const [updateTicket, { loading }] = useMutation(UPDATE_TICKET, {
        update(proxy, { data: { updateTicket: updateTicketData } }) {
            console.log(updateTicketData);
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { updateTicketInput: values }
    });


    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Opened {createdAt}
                            </Typography>
                            <Typography variant="body2" paddingBottom="20px">
                                {description}
                            </Typography>
                            <Typography variant="p" color="text.secondary">
                                Category: {category}
                            </Typography> <br />
                            <Typography variant="p" color="text.secondary">
                                Priority: {priority}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleOpen} size="medium">Update</Button>
                            <Button onClick={closeTicket}size="small" color="error">Close</Button>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Update Ticket
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2, mb: 4 }}>
                            Please enter your desired changes below, and click confirm to save changes:
                        </Typography>
                        <Stack spacing={2} paddingBottom={2}>
                            <TextField
                                label="Title"
                                name="title"
                                defaultValue={title}
                                onChange={onChange}
                                
                            />
                            <TextField
                                label="Description"
                                name="description"
                                multiline
                                minRows={4}
                                maxRows={6}
                                defaultValue={description}
                                onChange={onChange}
                                
                            />
                        </Stack>
                        <Button variant="contained" onClick={onSubmit}>Submit</Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
    
}

export default TicketCard;