import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as userHandle from "../store/actions/user";

import {User} from "../types/user";

import routers, {getLink} from "../routers";
import Button from "./Button";
import {ROLES} from "../utils/auth";
import {StoreProps} from "../types/store";

interface Props {
  dispatch: any
  user: User
}

const NavMenu = ({dispatch, user}: Props) => {

  const logoutHandle = () => {
    dispatch(userHandle.logout())
  }

  const authCheck = () => {
    dispatch(userHandle.check())
  }

  const isModerator = (user: User) => {
    return user.roles.indexOf(ROLES.Moderator) >= 0
  }

  useEffect(() => {
    authCheck()
  }, [])

  return (
    <nav className="navbar bg-primary navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand link-light" href="#">MRG</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link link-light" to={getLink(routers.home.name)}>{routers.home.title}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-light" to={getLink(routers.organization.name)}>{routers.organization.title}</Link>
            </li>
            {user.isAuth && isModerator(user) && <li className="nav-item">
              <Link className="nav-link link-light" to={getLink(routers.control.name)}>{routers.control.title}</Link>
            </li>}
          </ul>
          {/*<form className="d-flex">*/}
          {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
          {/*    <button className="btn btn-outline-success" type="submit">Search</button>*/}
          {/*</form>*/}
          {user.isAuth
            ? <>
              <Link className="nav-link link-light" to={getLink(routers.profile.name)}>
                <span className="text-light" style={{marginRight: 5}}>Пользователь: {user.username}</span>
              </Link>
              <Button schema={'light'} onClick={logoutHandle}>Выйти</Button>
            </>
            : <Link to={getLink(routers.auth.name)} className="nav-link link-light">Войти/Зарегестрироваться</Link>
          }
        </div>
      </div>
    </nav>
  )
}


export default connect((state: StoreProps) => ({
  user: state.user
}))(NavMenu);
