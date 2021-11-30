import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as userHandle from "../store/actions/user";
import * as appActions from "../store/actions/application";

import routers, {getLink} from "../routers";
import Button from "./Button";
import {ROLES} from "../utils/auth";

import {StoreApplicationProps, StoreProps, UserStoreProps} from "../@types/store";

import ModalComponent from "./Modal";

interface Props {
  dispatch: (a: any) => any
  user: UserStoreProps
  application: StoreApplicationProps
}

const NavMenu = ({dispatch, user, application}: Props) => {

  const logoutHandle = () => {
    dispatch(userHandle.logout())
  }

  const authCheck = () => {
    dispatch(userHandle.check())
  }

  const isModerator = (user: UserStoreProps) => {
    return (user.roles || []).indexOf(ROLES.Moderator) >= 0
  }

  const handleChangeCity = (city: string) => {
    dispatch(appActions.selectCity(city))
    dispatch(appActions.closeCityModal())
  }

  useEffect(() => {
    authCheck()
    if (application.cityList.length === 0) {
      dispatch(appActions.updateCityList())
    }
  }, [])

  return (<>
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
                <Link className="nav-link link-light"
                      to={getLink(routers.organization.name)}>{routers.organization.title}</Link>
              </li>
              {user.isAuth && isModerator(user) && <li className="nav-item">
                <Link className="nav-link link-light" to={getLink(routers.control.name)}>{routers.control.title}</Link>
              </li>}
            </ul>
            {/*<form className="d-flex">*/}
            {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
            {/*    <button className="btn btn-outline-success" type="submit">Search</button>*/}
            {/*</form>*/}
            <Button schema={"link"} onClick={() => dispatch(appActions.openCityModal())}>
              {application.currentCity || "Выберите город"}
            </Button>
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
      <ModalComponent
        data={{
          title: "Выберите город",
          description: application.cityList.map((v, i) => <div onClick={() => handleChangeCity(v)}>{v}</div>)
        }}
        show={application.isOpenCity}
        handleClose={() => dispatch(appActions.closeCityModal())}
      />
    </>
  )
}


export default connect((state: StoreProps) => ({
  user: state.user,
  application: state.application
}))(NavMenu);
