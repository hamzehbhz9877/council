import React, {useEffect} from "react"
import ReactModal from 'react-modal';
import {useHistory} from "react-router-dom";

ReactModal.setAppElement("#modal-wrapper")

const Modal = (props) => {


    const {showModal, close, children} = props;
    const history = useHistory()

    // useEffect(() => {
    //     if (showModal)
    //         history.block(true)
    //
    //     return () => {
    //         history.block(false)
    //     }
    // }, [showModal])

    return (
        <ReactModal
            isOpen={showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={close}
            className="Modal"
            overlayClassName="Overlay"
        >
            {children}
        </ReactModal>
    );
}

export default Modal
