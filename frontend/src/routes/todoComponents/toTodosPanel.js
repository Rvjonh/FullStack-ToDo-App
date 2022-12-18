import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useInterval } from './../../hooks/useInterval';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ToTodosPanel({ timeToWait=3 }){
    let navigate = useNavigate();

    const [ play, setPlay ] = useState(1000);
    const [ counter, setCounter ]= useState(timeToWait);

    useInterval(()=>{
        setCounter(counter-1);
    }, play);

    useEffect(()=>{
        if(counter <=0){
            setPlay(null);
            navigate("/todos");
        }
    },[counter, navigate])

    const getProgress = ()=>{
        return 100 - (counter/timeToWait)*100;
    }

    return(
        <div className='m-4 d-flex flex-column justify-content-center align-items-center'>
            <h3 className="text-success">Todo submitted successfully</h3>

            <Container className="my-5">
                <h5>You're going to be redirect to your Todo's list</h5>

                <div className='d-flex justify-content-center m-3 position-relative'>
                    <div className="spinner-border text-primary" 
                         style={{width: "5rem", height: "5rem"}}
                         role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className='fw-bold position-absolute text-center' 
                         style={{width: "5rem", height: "5rem", fontSize:"5rem", top:"-30%"}}>
                            {counter}
                    </span>
                </div>

                <ProgressBar variant="primary" animated now={getProgress()} />
            </Container>

            <Link to="/todos">
                <Button>
                    Back to Todos
                </Button>
            </Link>
        </div>
    )
}