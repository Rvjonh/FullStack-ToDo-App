import { useEffect , useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";

import { useUserLogged } from './../hooks/useUserLogged';
import { ValidateEmail } from './../functions/validEmail';

import Container from 'react-bootstrap/esm/Container';

import TodoDataService from './../services/todo';
import { useAppState } from './../App';

import Spinner from '../extraComponents/spinnerImg';

export default function LoginCode() {
    useUserLogged("/todos");

    const navigate = useNavigate();
    const params = useParams();


    const { loadUserData } = useAppState();

    const [errorFlag, setErrorFlag] = useState("");

    

    useEffect(() => {

        if(!ValidateEmail(params.email)){
            navigate("/");
        }
        
        if(ValidateEmail(params.email)){
            
            TodoDataService.loginWithCode(params.email, params.code).then(res=>{
                loadUserData(res.data.token, res.data.username)
            }).catch(err=>{
                setErrorFlag("Email or Code not available.")
            })
           
        }

    }, [params, loadUserData, navigate]);

    if(!ValidateEmail(params.email)){
        return <></>
    }

    return (
        <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <h2 className='text-center'>Loading Session</h2>

            {errorFlag ? 
                <>
                    <p>{errorFlag}</p>
                    <Link to='/signup' >Sign up for FREE</Link>
                </>
                :
                <Spinner text="Log in Session..." />
            }

        </Container>    
    )
}