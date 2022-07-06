import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Backdrop, Fade, Stack, TextField, Alert } from '@mui/material';
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

const APPROVE_USER = gql`
    mutation Mutation($id: String) {
        approveAdminUser(_id: $id) {
            pending_admin
        }
    }
`;

const DENY_USER = gql`
    mutation Mutation($id: String) {
        denyAdminUser(_id: $id) {
            _id
            denied
        }
    }
`;

const UserCard = ({ user: { _id, username, email, pending_admin } }) => {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const [approveAdminStatus] = useMutation(APPROVE_USER, {variables: {id: _id}});
    const [denyAdminStatus] = useMutation(DENY_USER, {variables: {id: _id}});


    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {email}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Username: {username}
                            </Typography>
                            <Typography variant="body2" paddingBottom="20px">
                                Requesting admin: {pending_admin.toString()}
                            </Typography>
                            <Typography variant="p" color="text.secondary">
                                ID: {_id}
                            </Typography> <br />
                        </CardContent>
                        <CardActions>
                            <Button onClick={approveAdminStatus} size="medium">Approve</Button>
                            <Button onClick={denyAdminStatus} size="medium" color="error">Deny</Button>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
            {/* <Modal
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
            </Modal> */}
        </>
    )
    
}

export default UserCard;