import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import { AuthContext } from '../store/AuthContext';

const InfoModal = () => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    //const {updateIdToken} = useContext(AuthContext);

    /* const extend = () => {
        updateIdToken();
        setShow(false);
    } */


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Attention</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are logged out!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Log out
                </Button>
                <Button variant="primary" onClick={() => handleClose}>
                    Extend
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InfoModal