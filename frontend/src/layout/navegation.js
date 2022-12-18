
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylies/navegation.scss';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { useAppState } from './../App';

import  AcceptModal from './../extraComponents/acceptedModal';

export default function Navegation(){
    let navigate = useNavigate();
    const { user, logout } = useAppState();

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }

    const handleToLogin=()=>{
        navigate("/login");
    }
    
    const handletoSignup=()=>{
        navigate("/signup");
    }
    
    const handleUserLink = ()=>{
        navigate("/user");
    }

    return(
        <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
            <Container className='justify-content-end'>

                <Navbar.Brand>
                    <Link className='nav-link text-reset fw-bold text-decoration-none' to="/">Todo App</Link>
                </Navbar.Brand>

                <Nav className='me-auto'>
                    <Link className='nav-link mx-2 button-link' to="/todos">Todos</Link>
                </Nav>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className='ms-auto d-flex justify-content-end'>
                        {user ? (<>

                            <Nav.Link eventKey={2} onClick={handleUserLink} className='nav-link mx-2 button-link d-flex justify-content-end'>
                                User
                            </Nav.Link>

                            <AcceptModal message='Logout'
                                         desc="Do you want to exit?"
                                         acceptBtn="Log out"
                                         handleAccepted={handleLogout}/>

                            </>)
                            :(<>
                                <Nav.Link eventKey={2} onClick={handleToLogin} className='nav-link mx-2 button-link d-flex justify-content-end'>
                                    Log in
                                </Nav.Link>
                                <Nav.Link eventKey={2} onClick={handletoSignup} className='nav-link mx-2 button-link d-flex justify-content-end'>
                                    Sign up
                                </Nav.Link>
                            </>)
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )

}