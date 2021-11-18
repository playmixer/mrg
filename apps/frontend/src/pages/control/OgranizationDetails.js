import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom'
import {connect} from "react-redux";

import AsyncSelect from "react-select/async";

import Page404 from "../404";

import * as actionOrganization from '../../store/actions/organization';
import * as actionUser from '../../store/actions/user';

import Button from "../../components/Button";
import Notification from "../../components/Notification";
import SelectAsync from "../../components/inputs/SelectAsync"


const formInputs = [
  {
    title: "Название",
    name: "title",
  },
  {
    title: "Телефон",
    name: "phone",
  },
  {
    title: "Почта",
    name: "email",
  },
  {
    title: "Представитель",
    name: "retailer",
  },
]

const PT_DETAIL = 0;
const PT_USERS = 1;

const ControlOrganization = ({dispatch, organization, user}) => {
  if (!user.isAuth) return <Page404/>

  const [tab, setTab] = useState(PT_DETAIL);
  const [editable, setEditable] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [textSearch, setTextSearch] = useState('');
  const [org, setOrg] = useState({
    title: "",
    phone: "",
    email: "",
    retailer: "",
    is_activate: false,
    users: []
  });
  const [valuesForm, setValuesForm] = useState({});

  const history = useHistory();
  const {id} = useParams();

  const chooseOrg = () =>
    organization.data.map((v, i) => {
      if (v.id == id) {
        setOrg(v)
        setValuesForm(v)
      }
    })


  const handleChangeInput = (e) => {
    setValuesForm({
      ...valuesForm,
      [e.target.name]: e.target.value
    })
    console.log(e.target.name, e.target.value)
  }

  const handleActivate = (e) => {
    setValuesForm({
      ...valuesForm,
      [e.target.name]: !valuesForm[e.target.name]
    })
    console.log(e.target.name, e.target.value)
  }

  const handleSave = () => {
    if (editable) {
      dispatch(actionOrganization.update(valuesForm))
      Notification("test")
      setEditable(!editable)
      setOrg(valuesForm)
    }
    console.log(valuesForm)
  }

  const handleCancel = () => {
    setEditable(false)
    setValuesForm(org)
  }

  const handleAddUser = () => {
    const payload = {
      username: userSelected.label,
      id: userSelected.value,
      org_id: org.id
    }
    dispatch(actionOrganization.addUser(payload))
  }

  const handleRemoveUser = ({username, id}) => {
    const payload = {
      username,
      id,
      org_id: org.id
    }
    console.log(payload)
    dispatch(actionOrganization.removeUser(payload))
  }

  const handleUserSearch = (text) => {
    setTextSearch(text)
    return text;
  }

  const loadOptions = (inputValue, callback) => {
    let data = [];
    actionUser.search({username: inputValue, is_retailer: false})
      .then(res => {
        data = res.map((v) => ({label: v.username, value: v.id})) || []
      })

    setTimeout(() => {
      callback(() => (data))
    }, 1000)
  }

  useEffect(() => {
    chooseOrg()
  }, [organization])

  if (!org.id) return <Page404/>
  console.log(org)

  return <div>
    <div className="mb-3 h2">
      {org.title}
    </div>
    <div className="mb-3">
      <Button onClick={() => history.goBack()}>Назад</Button>
    </div>
    <div className="mb-3">
      <Button style={{width: 150}} schema={tab === PT_DETAIL ? 'main-primary' : ''}
              onClick={() => setTab(PT_DETAIL)}>Детали</Button>
      <Button style={{width: 150}} schema={tab === PT_USERS ? 'main-primary' : ''}
              onClick={() => setTab(PT_USERS)}>Users</Button>
    </div>

    {tab === PT_DETAIL &&
    <div>
      {formInputs.map((v, i) =>
        <div key={i} className="pb-3">
          <label htmlFor={v.name} className="form-label">{v.title}</label>
          <input type="text" id={v.name} name={v.name} className="form-control"
                 value={editable ? valuesForm[v.name] : org[v.name]} onChange={handleChangeInput}
                 style={{borderRadius: 0}}
                 readOnly={!editable}/>
        </div>
      )}
      <div className="pb-3 form-check">
        <label htmlFor={"is_activate"} className="form-label">Активно</label>
        <input type="checkbox" id={"is_activate"} name={"is_activate"} className="form-check-input"
               onChange={handleActivate}
               style={{borderRadius: 0}}
               disabled={!editable} checked={editable ? valuesForm['is_activate'] : org['is_activate']}/>
      </div>
      {!editable
        ? <Button schema="main-primary" style={{width: 150}} onClick={() => setEditable(true)}>Редактировать</Button>
        : <Button style={{width: 150}} onClick={handleCancel}>Отменить</Button>
      }
      <Button onClick={handleSave}>Сохранить</Button>
    </div>}

    {tab === PT_USERS && <div>
      <div className="mb-3">
        <div className="mb-3">
          <SelectAsync
            title={"Найти"}
            onInputChange={handleUserSearch}
            loadOptions={loadOptions}
            onChange={setUserSelected}
          />
        </div>
        {userSelected.label && <Button onClick={handleAddUser}>Добавить</Button>}
      </div>
      <span className="text h4 mb-3">Пользователи с правами управления</span>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Пользователь</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          org.users.map((v, i) => <tr key={i}>
            <td>{v.username}</td>
            <td className="d-flex flex-column align-items-end">
              <Button schema={"danger"} onClick={() => handleRemoveUser({id: v.id, username: v.username})}>del</Button>
            </td>
          </tr>)
        }
        </tbody>
      </table>
    </div>}
  </div>
}

export default connect(state => ({
  organization: state.organization,
  user: state.user
}))(ControlOrganization);
