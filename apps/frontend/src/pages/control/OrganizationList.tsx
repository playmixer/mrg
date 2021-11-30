import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";


import Button from "../../components/Button";
import {InputText} from "../../components/inputs/";
import * as organizationAction from "../../store/actions/organization";
import routers, {getLink} from "../../routers";

interface PropsDetail {
  data: Organization[]
}

const DataList = ({data}: PropsDetail) => {
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
            <tr key={i} onClick={() => history.push(getLink(routers.controlOrg.name).replace(':id', v.id))}>
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

interface Props {
  dispatch: React.Dispatch<any>
  organization: OrganizationStoreProps
}

const OrganizationList = ({dispatch, organization}: Props) => {
  const P_LIST = 0
  const P_NEW = 1

  const [orgsData, setOrgsData] = useState<Organization[]>([])
  const [formValues, setFormValues] = useState<Organization>({
    balance: 0,
    email: "",
    id: "",
    is_activate: false,
    phone: "",
    retailer: "",
    title: ""
  })
  const [action, setAction] = useState(P_LIST)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleAddOrganization = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(organizationAction.add(formValues))
    setAction(P_LIST)
  }

  useEffect(() => {
    dispatch(organizationAction.list())
    setOrgsData(organization.data)
  }, [])


  return <div>
    <Button style={{width: 100}} schema={action === P_LIST ? `main-primary` : undefined} onClick={() => setAction(P_LIST)}>
      Список
    </Button>
    <Button style={{width: 100}} schema={action === P_NEW ? `main-primary` : undefined} onClick={() => setAction(P_NEW)}>
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

export default connect((state: StoreProps) => ({
  organization: state.organization
}))(OrganizationList);
