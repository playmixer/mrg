import React from "react";
import {Modal} from "react-bootstrap";

import Button from "./Button";

export const modalActions = {
  OK_CANCEL: 1
}

const ModalComponent = ({data, handleClose, show, onOk, actions, actionsName}) => {


  return <div>
    <Modal show={show} onHide={handleClose} style={{borderRadius: 0}}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.description}</Modal.Body>
      <Modal.Footer>
        {actions === modalActions.OK_CANCEL && <Button schema={"main-primary"} onClick={onOk}>
          {actionsName?.ok || 'Ok'}
        </Button>}
        <Button onClick={handleClose}>
          {actionsName?.cancel || 'Close'}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default ModalComponent;
