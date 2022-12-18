import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppState } from './../App';


import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import NoAcceptedInput from './todoComponents/noAcceptedInput';
import AcceptedInput from './todoComponents/acceptedInput';
import { useUserLogged } from './../hooks/useUserLogged';

export default function SignUp(){

    useUserLogged('/todos');

    const navigate = useNavigate()

    const { signup, signUpProcess, setSignUpProcess } = useAppState();

    const [email, setEmail] = useState("");
    const [userFlag, setUserFlag] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [repeatedPasswordFlag, setRepeatedPasswordFlag] = useState(false);

    const [MessageError, setMessageError] = useState("");

    const [pending, setPending] = useState(false);

    const passwordRef = useRef(null);
    const repetedPasswordRef = useRef(null);
    const signupButtonRef = useRef(null);


    const handleChangeEmail = (e)=>{
        let userToCheck = e.target.value;
        setUserFlag(!ValidateEmail(userToCheck));
        setEmail(userToCheck);
    }
    const handleChangePassword = (e)=>{
        let passToCheck = e.target.value;
        setPasswordFlag(!checkValidInput(passToCheck))
        setPassword(passToCheck);
    }
    const handleChangeRepeatedPassword = (e)=>{
        let repetedpassword = e.target.value;
        setRepeatedPasswordFlag(!checkValidInput(repetedpassword));
        setRepeatedPassword(repetedpassword);
    }

    const checkValidInput =(str)=>{
        if(str.match(" ")){
            return false;
        }
        if (str.length <= 7 || str.length >= 21){
            return false;
        }
        return true
    }
    const ValidateEmail = (newEmail=null)=>{
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)){
            return (true)
        }
        return (false)
    }

    const handleSignupData = ()=>{
        if(isNewUserDataOk()){
            setMessageError("");
            handleSignUp();
        }else{
            setMessageError("We need you to fill above information. ");
        }
    }
    const isNewUserDataOk = ()=>{
        return checkValidInput(email) && checkValidInput(password) && checkValidInput(repeatedPassword) && (password === repeatedPassword);
    }

    async function handleSignUp(){
        signup({'username':email, 'password':password});
        setPending(true);
    }
    
    useEffect(()=>{
        if (signUpProcess.type === "success"){
            setPending(false);
        }
        if (signUpProcess.type === "fail"){
            setPending(false);
        }

    },[signUpProcess, setSignUpProcess]);

    useEffect(() => {
      return () => {
        setSignUpProcess({type:"waiting"})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleNextInput = (e, reference)=>{
        if(e.keyCode === 13){
            reference.current.focus();
        }
    }

    const handleSuccessRegister=()=>{
        navigate('/login');
    }

    return(
        <Container className="d-flex flex-column align-items-center" >
            <h2 className="my-4">
                Sign up to keep your todos
            </h2>
            <Form className="w-100" style={{maxWidth:"600px"}}>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Email: 
                        {userFlag && <NoAcceptedInput message=" (Email not allowed)"/>}
                    </Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleChangeEmail}
                        autoFocus
                        tabIndex="0"
                        onKeyDown={(e)=>handleNextInput(e, passwordRef)}
                        autoComplete="true"
                        />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Password:
                        {passwordFlag && <NoAcceptedInput message=" (Password not allowed)"/>}    
                    </Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        placeholder="••••••••"
                        tabIndex="0"
                        autoComplete="true"
                        onKeyDown={(e)=>handleNextInput(e, repetedPasswordRef)}
                        ref={passwordRef}
                        />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className="fw-bold">
                        Repeat password: 
                        {repeatedPasswordFlag && <NoAcceptedInput message=" (Password not allowed)"/>}
                        {!repeatedPasswordFlag && password !== repeatedPassword && <NoAcceptedInput message=" (Passwords not equal)"/>}
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="••••••••"
                        value={repeatedPassword}
                        onChange={handleChangeRepeatedPassword}
                        tabIndex="0"
                        autoComplete="true"
                        onKeyDown={(e)=>handleNextInput(e, signupButtonRef)}
                        ref={repetedPasswordRef}
                    />
                </Form.Group>
                        
                <Button variant='primary' onClick={handleSignupData} tabIndex="0"  ref={signupButtonRef}>
                    <span>Sign up  </span>
                    {pending && (
                        <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}

                    {signUpProcess.type === "success" &&
                        <span>&#9989;</span>
                    }
                </Button>
                
            </Form>
            <div className='my-3'>
                {MessageError &&
                    (<span><NoAcceptedInput message={MessageError}/> &#9757;</span>)
                }
                
                {signUpProcess.type !== "success" && <Stack>
                        <AcceptedInput message="You can log in now  &#127773;" />
                        
                        <Button variant='primary' onClick={handleSuccessRegister} tabIndex="0">
                            Login
                        </Button> 
                       
                    </Stack>
                }

                {signUpProcess.type === "fail" && 
                    <NoAcceptedInput message="Fail in signing up, (Try another email) &#10060;" />
                }
            </div>
        </Container>
    )
}