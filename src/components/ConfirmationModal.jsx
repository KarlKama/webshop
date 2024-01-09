import React, { useState,  useRef, forwardRef, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = forwardRef(({modalMessage, confirmed}, ref) => { // Childist käivitame parenti funktsiooni, selleks kasutame forwardRefi

    const idToBeDeleted = useRef(); // idToBeDeleted.current = 
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({ // saab deklada mis funktsioonid on kättesaadavad
        handleShow(id) {
            setShow(true); //re-renderdab
            idToBeDeleted.current = id; // kasutame useRefi et hoida id väärtust
        },
        closeModal() {
            setShow(false);
        }
    }));

    const handleClose = () => setShow(false);


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Attention</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete {modalMessage}!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => confirmed(idToBeDeleted.current)}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

export default ConfirmationModal