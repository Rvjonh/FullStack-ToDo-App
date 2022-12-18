import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useAppState } from './../App';
import { useUserLogged } from './../hooks/useUserLogged';

import { checkValidInput } from './../functions/validInput';
import { ValidateEmail } from './../functions/validEmail';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import ButtonProcess from './../extraComponents/buttonProcess';
import NoAcceptedInput from './todoComponents/noAcceptedInput';

export default function Login(){
    useUserLogged('/todos');

    const {login, error, setError } = useAppState();

    const [email, setEmail] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    
    const [pending, setPending] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [messageError, setMessageError] = useState("");

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const loginButtonRef = useRef(null);

    const handleChangeEmail = (e)=>{
        setEmailFlag(!ValidateEmail(e.target.value));
        setEmail(e.target.value);
    }
    
    const handleChangePassword = (e)=>{
        setPasswordFlag(!checkValidInput(e.target.value));
        setPassword(e.target.value);
    }

    function handleLogin(){
        setErrorLogin(false);
        if (isUserDataOk()){
            setMessageError("");
            loginUser();
        }else{
            emailRef.current.focus();
            setMessageError("We need your exact information account.");
        }
    }
    const isUserDataOk = ()=>{
        return ValidateEmail(email) && checkValidInput(password);
    }
    async function loginUser(){
        login({'username':email, 'password': password})
        setPending(true);
    }

    useEffect(()=>{
        if(error!=null){
            emailRef.current.focus();
            setErrorLogin(true);
        }

        return ()=>{
            setError(null);
            setPending(false);
        }
    },[error, setError])

    const handleNextInput = (e, reference)=>{
        if(e.keyCode === 13){
            reference.current.focus();
        }
    }

    return(
        <Container className="d-flex flex-column align-items-center">
            <h2 className="text-center my-4">Login with your account</h2>
            <Form className="w-100" style={{maxWidth:"600px"}}>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Email:
                        {emailFlag && <NoAcceptedInput message=" (Email not allowed)"/>}
                    </Form.Label>
                    <Form.Control 
                        autoFocus
                        type="email" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleChangeEmail}
                        onKeyDown={(e)=>handleNextInput(e, passwordRef)}
                        ref={emailRef}
                        autoComplete="true"
                        />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Password: 
                        {passwordFlag && <NoAcceptedInput message=" (Password not allowed)"/>}
                    </Form.Label>
                    <Form.Control
                        autoComplete="true"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={handleChangePassword}
                        onKeyDown={(e)=>handleNextInput(e, loginButtonRef)}
                        ref={passwordRef}
                    />
                </Form.Group>

                <Container className="d-flex justify-content-between">
                    <ButtonProcess message="Login"
                                flag={pending}
                                onClick={handleLogin}
                                refe={loginButtonRef}/>
                    <Link to='/login-email'>
                        <b>Email me and log in?</b>
                    </Link>
                </Container>

            </Form>
            <div className='my-3'>

                {messageError &&
                    <NoAcceptedInput message={messageError}/>
                }

                {errorLogin && 
                    <p className='w-100 text-center text-danger fw-bold'>
                        Email or Password wrong &#128528;
                    </p>
                }
            </div>
        </Container>
    )
}