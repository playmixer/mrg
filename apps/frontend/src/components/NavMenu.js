import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as userHandle from "../store/actions/user";

import Button from "./Button";
import {getLink} from "../routers";

const NavMenu = ({dispatch, user, routers}) => {

  const logoutHandle = () => {
    dispatch(userHandle.logout())
  }

  const authCheck = () => {
    dispatch(userHandle.check())
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
              <Link className="nav-link link-light" to={routers.home.link}>{routers.home.title}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-light" to={routers.organization.link}>{routers.organization.title}</Link>
            </li>
            {user.isAuth && user.roles.indexOf('moderator') >= 0 && <li className="nav-item">
              <Link className="nav-link link-light" to={routers.control.link}>{routers.control.title}</Link>
            </li>}

          </ul>
          {/*<form className="d-flex">*/}
          {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
          {/*    <button className="btn btn-outline-success" type="submit">Search</button>*/}
          {/*</form>*/}
          {user.isAuth
            ? <>
              <Link className="nav-link link-light" to={getLink('profile')}>
                <span className="text-light" style={{marginRight: 5}}>Пользователь: {user.username}</span>
              </Link>
              <Button schema={'light'} onClick={logoutHandle}>Выйти</Button>
            </>
            : <Link to={routers.auth.link} className="nav-link link-light">Auth</Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default connect(state => ({
  user: state.user
}))(NavMenu);
