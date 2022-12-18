import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppState } from './../App';


import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import ButtonProcess from './../extraComponents/buttonProcess';

import { checkValidInput } from './../functions/validInput';
import { MyVerticallyCenteredModal } from './../extraComponents/centerModal';

import TodoDataService from './../services/todo';


export function DeleteUser(){
    const navigate = useNavigate();

    const { user, token, logout, setNotification } = useAppState();

    const [confirmationPasswordModal, setConfirmationPasswordModal] = useState(false)
    const [actualPassword, setActualPassword] = useState('')
    
    const [deleting, setDeleting] = useState(false);

    const [messageUpdate, setMessageUpdate] = useState({type:'warning', msg:''});



    const handleDeleteAccountButton = () => {
        setConfirmationPasswordModal(true);
    }
    
    const handleCloseConfirmation = () => {
        setConfirmationPasswordModal(false);
        setActualPassword('')
        setDeleting(false);
    }

    const handleConfirmDeletetion = () =>{
        setConfirmationPasswordModal(false);
        
        if(checkValidInput(actualPassword)){
            setDeleting(true);
            setMessageUpdate({...messageUpdate, type:'warning', msg:''});
            
            const data = {
                "username":user,
                "password":actualPassword
            }

            TodoDataService.deleteUser(data, token).then(res =>{
                logout('');
                setNotification({title:"Delete Account", text: "Your account was deleted!", type:"danger"})
                navigate('/signup',{
                    state:{
                        "deleteAccount":true
                    }
                });
            }).catch(err =>{
                setMessageUpdate({...messageUpdate, msg:'Password no valid, enter your actual password'});
                setActualPassword('')
                setDeleting(false);
            })

        }else{
            setMessageUpdate({...messageUpdate, msg:'Password no valid, enter your actual password'});
            setActualPassword('')
        }
    }


    return(
    <>
        <Card className='my-4' style={{ width: '100%', maxWidth:'800px', minHeight:"3rem" }} bg='danger' >
            {messageUpdate.msg && 
                <Alert variant={messageUpdate.type} style={{marginBottom:'0rem'}}>
                    {messageUpdate.msg}
                </Alert>
            }
        </Card>

        <Card border="danger" style={{ width: '18rem' }}>
            <Card.Header className='bg-danger'>
                <strong>Danger zone</strong>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className='text-center'>Do you want to <b>delete</b> your account?</Card.Title>
                
                <ButtonProcess message="Delete Account"
                    variant="danger"
                    flag={deleting}
                    onClick={handleDeleteAccountButton}
                    disabled={deleting}
                    />
            </Card.Body>
        </Card>

        <MyVerticallyCenteredModal title="Do you want to DELETE your account?"
                                    bgTitle="danger"
                                    show={confirmationPasswordModal}
                                    onHide={handleCloseConfirmation}
                                    handleConfirm={handleConfirmDeletetion}
                                    btnConfirmText="Delete"
                                    btnConfirmBg="danger"
                                    >
            
            <h5>Enter your password to confirm</h5>
            <p>The changes will be apply after a small conection with the server</p>

            <Form.Group className='mb-3'>
                <Form.Label className="fw-bold">
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    value={actualPassword}
                    onChange={(e)=>setActualPassword(e.target.value)}
                    tabIndex='0'
                />
            </Form.Group>

        </MyVerticallyCenteredModal>
    </>
    )
}