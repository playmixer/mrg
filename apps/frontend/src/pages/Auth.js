import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as userHandle from '../store/actions/user';

const Auth = ({dispatch, user}) => {
  const {username, setUsername} = useState('');
  const authLoginHandle = () => {

  }

  const authCheck = () => {
    userHandle.login({})
  }

  useEffect(() => {
    authCheck()
  }, [])

  console.log(user)
  if (user.isAuth) {
    return <div>
      {user}
    </div>
  }
  console.log(username)

  return <div>
    <div>
      <div className="form-floating mb-3">
        <input type="username" className="form-control" id="floatingInput" placeholder="username"
               onChange={setUsername}/>
        <label htmlFor="floatingInput">Имя пользователя</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="password"/>
        <label htmlFor="floatingPassword">Пароль</label>
      </div>
      <div className="form-floating">
        <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
      </div>
    </div>
  </div>
}

export default connect(state => ({
  user: state.user
}))(Auth);
