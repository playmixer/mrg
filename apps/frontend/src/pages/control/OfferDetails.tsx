import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import styled from "styled-components";
import {AddressSuggestions, DaDataSuggestion} from 'react-dadata';

import * as offerAction from '../../store/actions/offer';
import * as apiHandle from '../../api/index';

import Page404 from "../404";
import Button from "../../components/Button";
import {getFileUrl} from "../../routers";
import {InputText, InputFile} from "../../components/inputs/";
import {notify} from "../../components/Notification";
import {InputArea} from "../../components/inputs/InputArea";
import OfferCoupons from "./OfferCoupons";



const T_DETAIL = 0;
const T_COUPON = 1;
const T_PROMO = 2;
const T_ADDRESS = 3;


interface PropsTabAddress {
  dispatch: (a: any) => any
  data: Offer
}

const TabAddress = ({dispatch, data}: PropsTabAddress) => {
  const [addressList, setAddressList] = useState<OfferAddress[]>([]);
  const [inputValue, setInputValue] = useState<DaDataSuggestion<any>>();
  const [isAdding, setIsAdding] = useState(false);

  const handleSaveAddress = () => {
    if (data) {
      const payload = {
        id: data.id,
        data: addressList
      }
      dispatch(offerAction.addAddress(payload))
    }
  }

  const handleRemoveAddressFromList = (index: number) => {
    const addresses = addressList.filter((v, i) => {
      if (i !== index) return v
    })
    console.log(addresses)
    setAddressList(addresses)
  }

  const handleAddAddress = () => {
    setAddressList([
      {
        value: inputValue?.value,
        geo_lat: inputValue?.data.geo_lat,
        geo_lon: inputValue?.data.geo_lon
      },
      ...addressList,
    ])
    setInputValue(undefined)
  }
  // setTimeout(() => {
  //   let el = document.querySelector('div[class="react-dadata__suggestions"]')
  //   console.log(el.children)
  // }, 5000)

  const onChangeInputValue = (e: DaDataSuggestion<any>) => {
    setInputValue(e)
    if (e.data?.geo_lat && e.data?.geo_lon)
      setIsAdding(true)
    else
      setIsAdding(false);
  }

  useEffect(() => {
    if (data && data.addresses) {
      // @ts-ignore
      setAddressList([
        ...addressList,
        ...data.addresses
      ])
    }
  }, [])


  console.log(addressList)
  return <div>
    <label style={{marginBottom: '0.5rem'}}>Добавить адрес</label>
    <div className="d-flex align-items-start">
      <DadataWrapper>
        <AddressSuggestions
          token={"73bc8a01cb91921ce864967a763c2222d9962681"}
          onChange={onChangeInputValue}
          value={inputValue}
        />
      </DadataWrapper>
      <div className="mb-3">
        <Button onClick={handleAddAddress} disabled={!isAdding}>Добавить</Button>
      </div>
    </div>
    <div className="mb-3">
      <ul className="list-group" style={{borderRadius: 0}}>
        {addressList.map((v, i) => {
          return <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
            <span>{v.value}</span>
            <Button schema={"danger"} onClick={() => handleRemoveAddressFromList(i)}>-</Button>
          </li>
        })}
      </ul>
    </div>
    <div className="mb-3">
      <Button onClick={handleSaveAddress}>Сохранить</Button>
    </div>
  </div>
}

const DadataWrapper = styled.div`
  width: 100%;
  .react-dadata__input {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .react-dadata__input:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
  div.react-dadata__suggestions {
    display: flex;
    flex-direction: column;
    color: red;
  }
  button.react-dadata__suggestion {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
  }
  button.react-dadata__suggestion:hover {
    background: var(--bs-primary);
    color: #fff;
  }
  button.react-dadata__suggestion.react-dadata__suggestion--current {
    background: var(--bs-primary);
    color: #fff;
  }
`

interface Props {
  dispatch: (a: any) => any
  offer: OfferStoreProps
}


const OfferDetails = ({dispatch, offer}: Props) => {
  const {id} = useParams<{id: string}>();
  const history = useHistory();


  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [valueForm, setValueForm] = useState<Offer>({
    addresses: [],
    client_level: 0,
    date_end: "",
    date_start: "",
    description: "",
    id: "",
    image_promo: "",
    is_activate: false,
    quantity_per_hand: 0,
    title: "",
    organization: undefined
  });
  const [valueInputs, setValueInputs] = useState<Offer>({
    organization: undefined,
    addresses: [],
    client_level: 0,
    date_end: "",
    date_start: "",
    description: "",
    id: "",
    image_promo: "",
    is_activate: false,
    quantity_per_hand: 0,
    title: ""
  });
  const [editable, setEditable] = useState(false);
  const [tab, setTab] = useState(T_DETAIL);
  const [imagePromo, setImagePromo] = useState<any>();
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editable) return true;

    const formInputs = ['client_level', 'date_end', 'date_start', 'description', 'id', 'quantity_per_hand', 'title']

    let val = {...valueInputs};
    Object.keys(val).map((v) => {
      if (formInputs.indexOf(v) < 0)
        delete val[v]
    })
    dispatch(offerAction.update(val))
      .then((res) => {
        setEditable(false)
        setCurrentOffer(res)
        setValueForm(res)
      })
  }

  const chooseOffer = () => {
    offer.data?.map(v => {
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

  const handleUploadImage = () => {
    const image = imagePromo?.target.files[0];
    const form = new FormData();
    form.append(
      "file",
      image,
      image.name
    )
    form.append('name', `offer_${currentOffer?.id}_promo.jpg`)
    apiHandle.upload(form)
      .then((res: RequestResult) => {
        console.log(res)
        notify("Промо картинка обновлена")
        setUploadingImage(true)
        setTimeout(() => {
          setUploadingImage(false)
        }, 1000)
      })
  }

  useEffect(() => {
    chooseOffer()
  }, [])

  if (!currentOffer) return <Page404/>

  const styleNav = {width: 150};

  return <div>
    <div className="mb-3">
      <span className="h3">{currentOffer.title}</span>
    </div>
    <div className="mb-3">
      <Button onClick={() => history.goBack()}>Назад</Button>
    </div>
    <div className="mb-3 h4">
      Параметры
    </div>
    <div className="mb-3">
      <Button schema={tab === T_DETAIL ? 'main-primary' : undefined} style={styleNav} onClick={() => setTab(T_DETAIL)}>
        Основные
      </Button>
      <Button schema={tab === T_PROMO ? 'main-primary' : undefined} style={styleNav} onClick={() => setTab(T_PROMO)}>
        Изображение
      </Button>
      <Button schema={tab === T_ADDRESS ? 'main-primary' : undefined} style={styleNav} onClick={() => setTab(T_ADDRESS)}>
        Адреса
      </Button>
      <Button schema={tab === T_COUPON ? 'main-primary' : undefined} style={styleNav} onClick={() => setTab(T_COUPON)}>
        Купоны
      </Button>
    </div>

    {tab === T_COUPON && <OfferCoupons data={currentOffer}/>}

    {tab === T_ADDRESS && <TabAddress data={currentOffer} dispatch={dispatch}/>}

    {tab === T_PROMO && <div>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <div style={{marginRight: 10, width: 300}}>
          <InputFile
            title={"Промо картинка"}
            name={'image_promo'}
            onChange={setImagePromo}
          />
        </div>
        <div className="mb-3" style={{width: 120}}>
          <Button onClick={handleUploadImage}>Установить</Button>
        </div>
        <div className="mb-3" style={{flex: 1}}>
          {!uploadingImage && <img src={getFileUrl(currentOffer?.image_promo)} alt="" style={{height: 200}}/>}
        </div>
      </div>
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
          style={{width: 300}}
        />
        <InputText
          title={"Окончание"}
          name={'date_end'}
          value={getValue('date_end')}
          type={"date"}
          onChange={handleInputChange}
          disabled={!editable}
          style={{width: 300}}
        />
        <InputArea
          title={"Описание"}
          name={'description'}
          value={getValue('description')}
          onChange={handleInputChange}
          disabled={!editable}
          placeholder={"Описание"}
        />
        <InputText
          title={"Организация"}
          name={'organization'}
          value={!editable ? valueForm?.organization?.title : valueInputs?.organization?.title}
          disabled
          // onChange={handleInputChange}
        />
        <InputText
          type={"number"}
          title={"Кол-во в руки"}
          name={'quantity_per_hand'}
          value={getValue('quantity_per_hand')}
          onChange={handleInputChange}
          disabled={!editable}
          style={{width: 100}}
        />
        <InputText
          type={"number"}
          title={"Уровень"}
          name={'client_level'}
          value={getValue('client_level')}
          onChange={handleInputChange}
          disabled={!editable}
          style={{width: 100}}
        />
        {!editable ? <Button style={{width: 150}} onClick={() => setEditable(true)}>
            Редактировать
          </Button> :
          <Button style={{width: 150}} onClick={() => {
            setEditable(false)
            setValueInputs(valueForm)
          }}>
            Отменить
          </Button>}
        <Button type={"submit"} schema={editable ? 'main-primary' : undefined} style={{width: 150}}>
          Сохранить
        </Button>
      </form>
    </div>}
  </div>
}

const Container = styled.div`
  margin-bottom: 3px;
`

export default connect((state: StoreProps) => ({
  offer: state.offer,
  user: state.user
}))(OfferDetails);
