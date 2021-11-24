import React from "react";
import {Modal} from "react-bootstrap";

import Button from "./Button";

interface PropsActions {
  OK_CANCEL: number
}

export const modalActions: PropsActions = {
  OK_CANCEL: 1
}

interface Props {
  data: {
    title: string
    description: any
  }
  handleClose?: any
  show: boolean
  onOk?: any
  actions?: any
  actionsName?: any
}

const ModalComponent = ({data, handleClose, show, onOk, actions, actionsName}: Props) => {

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
          {actionsName?.cancel || 'Закрыть'}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default ModalComponent;
