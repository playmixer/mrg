import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as userHandle from '../store/actions/user';

const Auth = ({dispatch, user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authLoginHandle = () => {
    dispatch(userHandle.login({
      username,
      password
    }))
  }

  const logoutHandle = () => {
    dispatch(userHandle.logout())
  }

  const authCheck = () => {
    dispatch(userHandle.check())
  }

  useEffect(() => {
    authCheck()
  }, [])

  if (user.isAuth) {
    return <div>
      <div>
        user: {user.username}
      </div>
      <div>
        <button className={"btn btn-primary"} onClick={logoutHandle}>Выйти</button>
      </div>
    </div>
  }

  return <div>
    <div>
      <div className="form-floating mb-3">
        <input type="username" className="form-control" id="floatingInput" placeholder="username"
               value={username}
               onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="floatingInput">Имя пользователя</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" id="floatingPassword" placeholder="password"
               value={password}
               onChange={e => setPassword(e.target.value)}/>
        <label htmlFor="floatingPassword">Пароль</label>
      </div>
      <div className="form-floating">
        <button type="submit" className="btn btn-primary mb-3" onClick={authLoginHandle}>Войти</button>
      </div>
    </div>
  </div>
}

export default connect(state => ({
  user: state.user
}))(Auth);
