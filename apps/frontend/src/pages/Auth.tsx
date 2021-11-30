import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import * as apiHandle from "../api/index";

import {getLink} from "../routers";

import * as userHandle from '../store/actions/user';
import {InputText} from "../components/inputs/";
import Button from "../components/Button";
import {notify} from "../components/Notification";
import {StoreProps} from "../@types/store";

const tabs = {
  auth: 0,
  reg: 1
}

interface PropsFormCreateUser {
  username: string
  password: string
  password2: string
}

const Auth = ({dispatch, user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentTab, setCurrentTab] = useState(tabs.auth);
  const [regForm, setRegForm] = useState<PropsFormCreateUser>({password: "", password2: "", username: ""})

  const history = useHistory();

  if (user.isAuth)
    history.push(getLink())

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

  const handleRegistration = (e) => {
    e.preventDefault()
    apiHandle.authRegistration(regForm)
      .then(res => {
        console.log(res)
        notify("Пользователь зарегестрирован")
      })
      .catch(err => notify(err.response.data?.detail, 'danger'))
  }

  const onChangeRegForm = (e) => {
    setRegForm({
      ...regForm,
      [e.target.name]: e.target.value
    })
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
    <div className="mb-3">
      <ul className="nav justify-content-center nav-tabs">
        <li className="nav-item">
          <a className={`nav-link ${currentTab === tabs.auth && 'active'}`} href="#"
             onClick={() => setCurrentTab(tabs.auth)}>Авторизация</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${currentTab === tabs.reg && 'active'}`} href="#"
             onClick={() => setCurrentTab(tabs.reg)}>Регистрация</a>
        </li>
      </ul>
    </div>
    {currentTab === tabs.auth && <div>
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
    </div>}
    {currentTab === tabs.reg && <div>
      <form onSubmit={handleRegistration}>
        <InputText
          title={"username"}
          name={"username"}
          onChange={onChangeRegForm}
        />
        <InputText
          title={"password"}
          name={"password"}
          type={"password"}
          onChange={onChangeRegForm}
        />
        <InputText
          title={"password2"}
          name={"password2"}
          type={"password"}
          onChange={onChangeRegForm}
        />
        <Button type={"submit"}>Зарегестрироваться</Button>
      </form>
    </div>}
  </div>
}

export default connect((state: StoreProps) => ({
  user: state.user
}))(Auth);
