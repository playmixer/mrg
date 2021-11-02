import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";


import Button from "../../components/Button";
import InputText from "../../components/inputs/InputText";
import * as organizationAction from "../../store/actions/organization";
import Table from "../../components/Table";

const DataList = ({data}) => {
  const history = useHistory()

  return <div>
    <table className="table">
      <thead>
      <tr>
        <th>Название</th>
        <th>Телефон</th>
        <th>Почта</th>
        <th>ФИО представителя</th>
        <th>Активна</th>
      </tr>
      </thead>
      <tbody>
      {
        data && data.map((v, i) => {
          return (
            <tr key={i} onClick={() => history.push(`/control/organization/${v.id}`)}>
              <td>{v.title}</td>
              <td>{v.phone}</td>
              <td>{v.email}</td>
              <td>{v.retailer}</td>
              <td><input type="checkbox" className="form-check-input" checked={v.is_activate} readOnly={true}/></td>
            </tr>

          )
        })
      }
      </tbody>
    </table>
  </div>
}

const OrganizationList = ({dispatch, organization}) => {
  const P_LIST = 0
  const P_NEW = 1

  const [orgsData, setOrgsData] = useState([])
  const [formValues, setFormValues] = useState({})
  const [action, setAction] = useState(P_LIST)

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleAddOrganization = (e) => {
    e.preventDefault()
    dispatch(organizationAction.add(formValues))
    setAction(P_LIST)
  }

  useEffect(() => {
    dispatch(organizationAction.list())
    setOrgsData(organization.data)
  }, [])


  return <div>
    <Button style={{width: 100}} schema={action === P_LIST && `main-primary`} onClick={() => setAction(P_LIST)}>
      Список
    </Button>
    <Button style={{width: 100}} schema={action === P_NEW && `main-primary`} onClick={() => setAction(P_NEW)}>
      Добавить
    </Button>
    {action === P_LIST && <DataList data={orgsData}/>}
    {action === P_NEW && <div>
      <form onSubmit={handleAddOrganization}>
        <InputText
          title={"Название"}
          name={"title"}
          placeholder={"Рога и Копыта"}
          onChange={handleChange}
        />
        <InputText
          title={"Телефона"}
          name={"phone"}
          placeholder={"+79123456789"}
          onChange={handleChange}
        />
        <InputText
          title={"Почта"}
          name={"email"}
          placeholder={"example@example.ru"}
          onChange={handleChange}
        />
        <InputText
          title={"Представитель"}
          name={"retailer"}
          placeholder={"Иванов Иван Иванович"}
          onChange={handleChange}
        />
        <Button type={"submit"} schema={"primary"}>Добавить</Button>
      </form>
    </div>}
  </div>
}

export default connect(state => ({
  organization: state.organization
}))(OrganizationList);
