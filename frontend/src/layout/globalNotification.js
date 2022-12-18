import { useState, useEffect } from 'react';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useAppState } from './../App';

export default function GlobalNotification() {
    const {notification} = useAppState()
    const [show, setShow] = useState(false);


    useEffect(()=>{
        if(notification.title !== '' || notification.text !== ''){
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }
    },[notification])

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{ position: "fixed", bottom:"0", height:"10em", width:"20em", overflowY:"auto" }}
        >
            <ToastContainer className="p-3" position="top-start" style={{ height: "10em" }}>
                {
                <Toast show={show} onClose={()=>{setShow(false)}} bg={notification?.type}>
                    <Toast.Header>
                        <strong className="me-auto">{notification.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{notification.text}.</Toast.Body>
                </Toast>
                }
            </ToastContainer>
        </div>
    )
}