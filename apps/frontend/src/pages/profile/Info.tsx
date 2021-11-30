import React from "react";
import {connect} from "react-redux";
import Profile from "./index";
import {StoreProps} from "../../@types/store";

const Info = ({user}) => {

  const styleAttribute = {width: 200}

  return <Profile>
    <div className="mb-3 h4">
      Персональные данные
    </div>
    <div className="mb-3 d-flex flex-row">
      <div style={styleAttribute}>Пользователь:</div><b>{user.username}</b>
    </div>
    <div className="mb-3 d-flex flex-row">
      <div style={styleAttribute}>Телефон:</div><b>+79621112233</b>
    </div>
    <div className="mb-3 d-flex flex-row">
      <div style={styleAttribute}>Уровень лояльности:</div><b>1</b>
    </div>
  </Profile>
}

export default connect((state: StoreProps) => ({
  user: state.user
}))(Info)
