import React, { useState } from 'react';
import ModalA from './Problem2/ModalA';
import ModalB from './Problem2/ModalB';

const Problem2 = () => {
    const [modalAVisible, setModalAVisible] = useState(false);
    const [modalBVisible, setModalBVisible] = useState(false);
    const [modalCVisible, setModalCVisible] = useState(false);

    // Function to open Modal A
    const openModalA = () => {
        setModalBVisible(false);
        setModalCVisible(false);
        setModalAVisible(true);
    };

    // Function to open Modal B
    const openModalB = () => {
        setModalAVisible(false);
        setModalCVisible(false);
        setModalBVisible(true);
    };

    // Function to open Modal C
    const openModalC = () => {
        setModalAVisible(false);
        setModalBVisible(false);
        setModalCVisible(true);
    };

    // Function to close all modals
    const closeModal = () => {
        setModalAVisible(false);
        setModalBVisible(false);
        setModalCVisible(false);
    };

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>All Contacts</button>
                <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>US Contacts</button>
                </div>
                {/* Modals */}
                {modalAVisible && (
                    <ModalA onClose={closeModal} onOpenModalB={openModalB} />
                )}
                {modalBVisible && (
                    <ModalB onClose={closeModal} onOpenModalA={openModalA} />
                )}
                {modalCVisible && (
                    <ModalC onClose={closeModal} />
                )}
            </div>
        </div>
    );
};

export default Problem2;