import React, {useState} from "react";
import {InputText} from "@components/inputs/";
import {SelectAsync} from "@components/inputs/";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

import routers, {getLink} from "routers";

import * as apiHandler from "@api/index";
import * as actionOffer from "@store/actions/offer";

import Button from "@components/Button";
import {notify} from "@components/Notification";


interface Props {
  dispatch: any
}

const OfferNew = ({dispatch}: Props) => {
  const history = useHistory();

  const [inputsValue, setInputsValue] = useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputsValue({
      ...inputsValue,
      [e.target.name]: e.target.value
    })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputsValue);
    dispatch(actionOffer.add(inputsValue))
      .then((res: Offer) => {
        const id = res.id;
        history.push(getLink(routers.controlOffer.name).replace(':id', id));
      })
  }

  const handleSelectOrg = (v: {value: string}) => {
    setInputsValue({
      ...inputsValue,
      organization_id: v.value
    })
  }

  const loadOfferOptions = (valueInput: string, callback: any) => {
    let data: never[] = []
    apiHandler.organizationSearch({title: valueInput})
      .then((res: Response & any) => {
        data = res.data.data.map((v: Organization) => ({label: v.title, value: v.id}));
      })
      .catch((err: RequestError) => notify(err.message, 'warning'))
    setTimeout(() => {
      callback(data)
    }, 1000)
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <InputText
        title={"Название"}
        name={'title'}
        onChange={handleInputChange}
      />
      <InputText
        title={"Начало"}
        name={'date_start'}
        type={"date"}
        onChange={handleInputChange}
        style={{width: 300}}
      />
      <InputText
        title={"Окончание"}
        name={'date_end'}
        type={"date"}
        onChange={handleInputChange}
        style={{width: 300}}
      />
      <InputText
        title={"Описание"}
        name={'description'}
        onChange={handleInputChange}
      />
      <SelectAsync
        className="mb-3"
        title={"Организация"}
        onChange={handleSelectOrg}
        // onInputChange={e => console.log(e)}
        loadOptions={loadOfferOptions}
      />
      <InputText
        title={"Кол-во в руки"}
        name={'quantity_per_hand'}
        onChange={handleInputChange}
      />
      <InputText
        title={"Уровень"}
        name={'client_level'}
        onChange={handleInputChange}
      />
      {/*<InputText*/}
      {/*  type="number"*/}
      {/*  title={"Кол-во купонов"}*/}
      {/*  name={'coupon_count'}*/}
      {/*  onChange={handleInputChange}*/}
      {/*/>*/}
      <Button type={"submit"}>
        Создать
      </Button>
    </form>
  </div>

}

export default connect(state => ({}))(OfferNew);
