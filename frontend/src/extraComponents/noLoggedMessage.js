import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

export default function NoLogged(){
    return(
        <Container style={{flex:"1"}} className='d-flex justify-content-center align-items-start'>
            <Alert variant="warning" className='mt-5'>
                Log in to see your todo's <Link to="/login">Login</Link>
            </Alert>
        </Container>
    )
}