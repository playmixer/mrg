import React, {useEffect} from "react";
import {connect} from "react-redux";

import {ROLES} from "../../utils/auth";
import * as userAction from "../../store/actions/user";

import Page404 from "../404";
import styled from "styled-components";

const OrganizationPage = ({dispatch, user}) => {

  useEffect(() => {
    dispatch(userAction.currentOrganization())
  }, [])

  if (!user.isAuth || !user.organization)
    return <Page404/>

  console.log(user)
  return <div>
    <div className="mb-3 h3">
      Партнер "{user.organization.title}"
    </div>
    <BlockSide>
      Баланс: <span>{user.organization.balance} руб.</span>
    </BlockSide>
    <BlockSide>
      Активна: <span>{user.organization.is_activate ? "Да" : "Нет"}</span>
    </BlockSide>
    <BlockSide>
      Email: <span>{user.organization.email}</span>
    </BlockSide>
    <BlockSide>
      Телефон: <span>{user.organization.phone}</span>
    </BlockSide>
    <BlockSide>
      Представитель: <span>{user.organization.retailer}</span>
    </BlockSide>
  </div>
}

const BlockSide = styled.div`
  margin-bottom: 3px;
  font-size: 18px;
  span {
    font-weight: 600;
  }
`

export default connect(state => ({
  user: state.user,
}))(OrganizationPage);
