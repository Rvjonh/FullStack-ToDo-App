import { useState } from 'react';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';


export default function AcceptModal({handleAccepted=f=>f, 
                                    message="button",
                                    tittle="Are you sure?",
                                    desc="You're going to XXX this",
                                    acceptBtn="Delete",
                                    ...props}){
                                        
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAcceptans = ()=>{
        handleAccepted();
        handleClose();
    }

    return(
    <>
        <Button variant="danger" onClick={handleShow} {...props}>
            {message}
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{tittle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{desc}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleAcceptans}>
                    {acceptBtn}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export function ConfirmNotification({ show, setShow }){

    return (
        <ToastContainer className="p-3 position-sticky" position="bottom-start">
            <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
                <span>&#9989;</span>
                <strong className="me-auto">Delete Confirm</strong>
            </Toast.Header>
            <Toast.Body>You've have deleted this todo item</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}