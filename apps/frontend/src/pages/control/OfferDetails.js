import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {connect} from "react-redux";

import * as offerAction from '../../store/actions/offer';

import Page404 from "../404";
import Button from "../../components/Button";
import {getLink} from "../../routers";
import InputText from "../../components/inputs/InputText";


const T_DETAIL = 0;
const T_COUPON = 1;


const OfferDetails = ({dispatch, auth, offer}) => {
  const {id} = useParams();
  const history = useHistory();

  const [currentOffer, setCurrentOffer] = useState(null);
  const [valueForm, setValueForm] = useState();
  const [valueInputs, setValueInputs] = useState();
  const [editable, setEditable] = useState(false);
  const [tab, setTab] = useState(T_DETAIL);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(valueInputs)
    if (!editable) return true;

    let val = {...valueInputs};
    delete val.coupon_count;
    val.organization = '';
    delete val.organization;
    dispatch(offerAction.update(val))
    setEditable(false)
  }

  const chooseOffer = () => {
    offer.data.map(v => {
      if (v.id == id) {
        let val = v
        setCurrentOffer(v)
        setValueForm(v)
        setValueInputs(v)
      }
    })
  }

  const handleInputChange = (e) => {
    setValueInputs({
      ...valueInputs,
      [e.target.name]: e.target.value
    })
  }

  const getValue = (name) => {
    return !editable ? valueForm[name] : valueInputs[name];
  }

  useEffect(() => {
    chooseOffer()
  }, [])

  if (!currentOffer) return <Page404/>

  return <div>
    <div className="mb-3">
      <span className="h3">{currentOffer.title}</span>

    </div>
    <div className="mb-3">
      <Button onClick={() => history.push(getLink('controlOffers'))}>Назад</Button>
    </div>
    <div className="mb-3">
      <Button schema={tab === T_DETAIL && 'main-primary'} style={{width: 150}} onClick={() => setTab(T_DETAIL)}>
        Детали
      </Button>
      <Button schema={tab === T_COUPON && 'main-primary'} style={{width: 150}} onClick={() => setTab(T_COUPON)}>
        Купоны
      </Button>
    </div>

    {tab === T_COUPON && <div>
      coups
    </div>}

    {tab === T_DETAIL && <div>
      <form onSubmit={handleSubmit}>
        <InputText
          title={"Название"}
          name={'title'}
          value={getValue('title')}
          onChange={handleInputChange}
          disabled={!editable}
        />
        <InputText
          title={"Начало"}
          name={'date_start'}
          value={getValue('date_start')}
          type={"date"}
          onChange={handleInputChange}
          disabled={!editable}
        />
        <InputText
          title={"Окончание"}
          name={'date_end'}
          value={getValue('date_end')}
          type={"date"}
          onChange={handleInputChange}
          disabled={!editable}
        />
        <InputText
          title={"Описание"}
          name={'description'}
          value={getValue('description')}
          onChange={handleInputChange}
          disabled={!editable}
        />
        {/*<SelectAsync*/}
        {/*  className="mb-3"*/}
        {/*  title={"Организация"}*/}
        {/*  onChange={handleSelectOrg}*/}
        {/*  // onInputChange={e => console.log(e)}*/}
        {/*  loadOptions={loadOfferOptions}*/}
        {/*/>*/}
        <InputText
          title={"Организация"}
          name={'organization'}
          value={!editable ? valueForm?.organization.title : valueInputs?.organization.title}
          disabled
          // onChange={handleInputChange}
        />
        <InputText
          title={"Кол-во в руки"}
          name={'quantity_per_hand'}
          value={getValue('quantity_per_hand')}
          onChange={handleInputChange}
          disabled={!editable}
        />
        <InputText
          title={"Уровень"}
          name={'client_level'}
          value={getValue('client_level')}
          onChange={handleInputChange}
          disabled={!editable}
        />
        {/*<InputText*/}
        {/*  type="number"*/}
        {/*  title={"Кол-во купонов"}*/}
        {/*  name={'coupon_count'}*/}
        {/*  value={valueForm.coupon_count}*/}
        {/*  onChange={handleInputChange}*/}
        {/*  disabled={true}*/}
        {/*/>*/}
        {!editable ? <Button style={{width: 150}} onClick={() => setEditable(true)}>
            Редактировать
          </Button> :
          <Button style={{width: 150}} onClick={() => {
            setEditable(false)
            setValueInputs(valueForm)
          }}>
            Отменить
          </Button>}
        <Button type={"submit"} schema={editable && 'main-primary'} style={{width: 150}}>
          Изменить
        </Button>
      </form>
    </div>}
  </div>
}

export default connect(state => ({
  offer: state.offer,
  auth: state.auth
}))(OfferDetails);
