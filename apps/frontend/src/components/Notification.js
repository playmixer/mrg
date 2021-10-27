import React from "react";
import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export const notify = (message, type = 'default') => {
  const notification = {
    insert: "bottom",
    container: "top-right",
    type,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: false
    },
  }

  let title;
  switch (type) {
    case "success":
      title = 'Выполнено'
      break
    case "danger":
      title = 'Опасно'
      break
    case "info":
      title = 'Информация'
      break
    case "default":
      title = 'Выполнено'
      break
    case "warning":
      title = 'Осторожно'
      break
    default:
      title = "Внимание"
  }

  store.addNotification({
    message,
    ...notification,
  });
}


const Notification = () => {
  const style = {
    'notification-container--bottom-right': {
      right: 150
    }
  }
  return <ReactNotification className={style}/>
}

export default Notification;
