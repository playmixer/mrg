import React, {useEffect} from "react";
import {connect} from "react-redux";

import * as userAction from "../../store/actions/user";

import Page404 from "../404";
import styled from "styled-components";
import {StoreProps} from "../../@types/store";

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
    <div className="mb-3">
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
    <div className="mb-3 h4">
      Предложения
    </div>
    <div className="d-flex flex-column mb-3">
      {user.organization?.offers?.map((v, i) => <div key={i} className="card" style={{marginBottom: 5, padding: 5}}>
        <div className="card-body">
          <h6 className="card-title">{v.title}</h6>
          <p className="card-text">
            {v.description}
          </p>
          <div className="d-flex flex-row justify-content-evenly">
            <div>
              <div>Активна: {v.is_activate ? "Y" : "N"}</div>
            </div>
            <div>
              <div>Начало: {v.date_start}</div>
              <div>Окончание: {v.date_end}</div>
            </div>
            <div>
              <div>Кол-во в руки: {v.quantity_per_hand}</div>
              <div>Уровень клиента: {v.client_level}</div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  </div>
}

const BlockSide = styled.div`
  margin-bottom: 3px;
  font-size: 18px;
  span {
    font-weight: 600;
  }
`

export default connect((state: StoreProps) => ({
  user: state.user,
}))(OrganizationPage);
