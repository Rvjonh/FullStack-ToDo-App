import { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import ButtonProcess from './../extraComponents/buttonProcess';
import NoAcceptedInput from './todoComponents/noAcceptedInput';

import { MyVerticallyCenteredModal } from './../extraComponents/centerModal';
import { DeleteUser } from './deleteUser';

import TodoDataService from './../services/todo';
import { useAppState } from './../App';

export default function User() {
    const { user, token, setNotification, updateUserData } = useAppState();

    const [newUser, setNewUser] = useState({ email: '', password: '' });
    const [emailFlag, setEmailFlag] = useState(null);
    const [passwordFlag, setPasswordFlag] = useState(null);

    const [confirmationPasswordModal, setConfirmationPasswordModal] = useState(false)
    const [actualPassword, setActualPassword] = useState('')

    const [updating, setUpdating] = useState(false);

    const [messageUpdate, setMessageUpdate] = useState('');


    const handleInputFiled = (e) => {
        if (e.target.type === 'email') {
            setEmailFlag(!ValidateEmail(e.target.value));
        }

        if (e.target.type === 'password') {
            setPasswordFlag(!checkValidInput(e.target.value));
        }

        setNewUser({ ...newUser, [e.target.type]: e.target.value });
    }


    const checkValidInput = (str) => {
        if (str.match(" ")) {
            return false;
        }
        if (str.length <= 7 || str.length >= 21) {
            return false;
        }
        return true
    }
    const ValidateEmail = (newEmail = null) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
            return (true)
        }
        return (false)
    }


    const handleUpdateButton = () => {
        const isEmailValid = ValidateEmail(newUser.email)
        const isPasswordValid = checkValidInput(newUser.password);
        
        if(isEmailValid || isPasswordValid){
            setConfirmationPasswordModal(true);
            setUpdating(true);
        }else if(!isEmailValid && newUser.email.length > 0){
            setEmailFlag(true);
            setMessageUpdate('Enter a valid email');
        }else if(!isPasswordValid && newUser.password.length > 0){
            setPasswordFlag(true);
            setMessageUpdate('Enter a valid password');
        }else{
            setMessageUpdate('Nothing to update');
        }
    }

    const handleCloseConfirmation = () => {
        setConfirmationPasswordModal(false);
        setActualPassword('')
        setUpdating(false);
    }
    
    const handleConfirm = ()=>{
        setConfirmationPasswordModal(false);

        if(checkValidInput(actualPassword)){
            const data = {
                "username": user,
                "password": actualPassword,
                "new_username":newUser.email,
                "new_password": newUser.password
            }

            TodoDataService.updateUser(data, token).then(res=>{
                
                if(newUser.email.length > 0){
                    updateUserData(newUser.email)
                }
                setNewUser({ email: '', password: '' });
                setNotification({title:"Updated Account", text: "Your account was updated!", type:"success"})
                setActualPassword('')
                setUpdating(false);
                setMessageUpdate('');

            }).catch(err=>{

                setMessageUpdate('Password no valid, enter your actual password');
                setActualPassword('')
                setUpdating(false);
            })
        }else{
            setMessageUpdate('Password no valid, enter your actual password');
            setActualPassword('')
            setUpdating(false);
        }
    }


    return (
        <Container className="d-flex flex-column align-items-center">
            <h2 className="text-center my-4">User's information</h2>

            <Card className='my-4' style={{ width: '100%', maxWidth: "800px" }}>
                {messageUpdate && 
                    <Alert variant="warning" style={{marginBottom:'0rem'}}>
                        {messageUpdate}
                    </Alert>
                }
            </Card>

            <Form className="w-100" style={{ maxWidth: "600px" }}>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Email:
                        {emailFlag && <NoAcceptedInput message=" (Email not allowed)" />}
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={user}
                        value={newUser.email}
                        onChange={handleInputFiled}
                        tabIndex='0'
                        disabled={updating}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Password:
                        {passwordFlag && <NoAcceptedInput message=" (Password not allowed)" />}
                    </Form.Label>
                    <Form.Control
                        type="password"
                        value={newUser.password}
                        onChange={handleInputFiled}
                        tabIndex='0'
                        disabled={updating}
                    />
                </Form.Group>

                <Container className='d-flex justify-content-between'>

                    <ButtonProcess message="Update"
                        className='bg-success'
                        variant="success"
                        flag={updating}
                        onClick={handleUpdateButton}
                        disabled={updating}
                        />
                </Container>

            </Form>

            <MyVerticallyCenteredModal title="Do you want to update your information?"
                                        show={confirmationPasswordModal}
                                        onHide={handleCloseConfirmation}
                                        handleConfirm={handleConfirm}
                                        btnConfirmText="Update"
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
            

            <DeleteUser />

        </Container>
    )
}