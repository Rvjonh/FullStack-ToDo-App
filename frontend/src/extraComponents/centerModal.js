import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export function MyVerticallyCenteredModal({ show = null,
    title = '',
    onHide = f => f,
    handleConfirm = f => f,
    bgTitle=null,
    btnConfirmText='btnConfirmText',
    btnConfirmBg='primary',
    children
}) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => onHide()}
        >
            <Modal.Header closeButton className={`bg-${bgTitle}`}>
                <Modal.Title id="contained-modal-title-vcenter" >
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant={btnConfirmBg} onClick={() => handleConfirm()}>{btnConfirmText}</Button>
                <Button onClick={() => onHide()}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}