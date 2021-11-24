import React from "react";
import ReactNotification, {store, ReactNotificationOptions} from 'react-notifications-component'
// import style from 'react-notifications-component/dist/theme.css'
import styled, {} from 'styled-components'

const NotifyContent = styled.div`
  .notifications-component {
    position: fixed;
    right: 20px;
    top: 20px;
    div {
      padding: 2px 5px;
      border-radius: 0px;
      color: #fff;
    }
    
    .notification__item--default {
      border-left: 8px solid #0562c7;
      background-color: #007bff;
    }
    
    .notification__item--success {
      border-left: 8px solid #0562c7;
      background-color: #007bff;
    }
    
    .notification__item--info {
      border-left: 8px solid #138b9e;
      background-color: #17a2b8;
    }

    .notification__item--danger {
      border-left: 8px solid #bd1120;
      background-color: #dc3545;
    }

    .notification__item--warning {
      border-left: 8px solid #bd1120;
      background-color: #dc3545;
    }
  }
`

export const notify = (message: string, type: 'success'|'danger'|'info'|'default'|'warning' = 'default') => {
  const notification: ReactNotificationOptions = {
    insert: "bottom",
    container: "top-right",
    type,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: false
    },
  }

  store.addNotification({
    message,
    ...notification,
  });
}


const Notification = () => {
  return (
    <NotifyContent>
      <ReactNotification/>
    </NotifyContent>
  )

}

export default Notification;
