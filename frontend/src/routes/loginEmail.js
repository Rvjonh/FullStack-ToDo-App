import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import ButtonProcess from '../extraComponents/buttonProcess';
import NoAcceptedInput from './todoComponents/noAcceptedInput';

import { useUserLogged } from './../hooks/useUserLogged';
import { ValidateEmail } from '../functions/validEmail';
import { Link } from 'react-router-dom';

import TodoDataService from './../services/todo';
import { useAppState } from './../App';

export default function LoginEmail(){
    useUserLogged("/todos");

    const { setNotification } = useAppState();

    const [email, setEmail] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);

    const [pending, setPending] = useState(false);

    const handleChangeEmail = (e)=>{
        setEmailFlag(!ValidateEmail(e.target.value));
        setEmail(e.target.value);
    }

    const handleSendEmailLogin=()=>{
        setPending(true);
        
        TodoDataService.loginEmail(email).then(res=>{
            setNotification({title:"Email Sent",text:"Check your email to log in", type:"success"})
        }).catch(err=>{
            if(err.response.status === 404){
                setNotification({title:"User not registered",text:"We cannot send you and email sign up", type:"warning"})
            }else{
                setNotification({title:"Something went wrong",text:"We cannot send you and email at the moment", type:"warning"})
                setPending(false);
            }
        })
    }

    return(
        <Container className="d-flex flex-column align-items-center">
            <h2>Login Email</h2>
            <p>Enter your email account, you will find an email to log, in your email account.</p>
            <p>if you do not have an account <Link to ='/signup'>register here</Link></p>
            <Form className="w-100" style={{maxWidth:"600px"}} onSubmit={e=>e.preventDefault()}>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Email:
                        {emailFlag && <NoAcceptedInput message=" (Email not allowed)"/>}
                    </Form.Label>
                    <Form.Control 
                        autoFocus
                        type="email" 
                        placeholder="your-email@example.com"
                        value={email}
                        onChange={handleChangeEmail}
                        autoComplete="true"
                        tabIndex="0"
                        disabled={pending}
                        />
                </Form.Group>

                <ButtonProcess message="Login"
                                tabIndex="0"
                                flag={pending}
                                onClick={handleSendEmailLogin}
                                disabled={pending}
                                />
                    
            </Form>
        </Container>
    )
}