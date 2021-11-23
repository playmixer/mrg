import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useParams, useHistory} from "react-router-dom";

import {YMaps, Map, Placemark} from "react-yandex-maps";

import {getFileUrl, getLink, getLinkControlOffer} from "../../routers";
import * as actionOffer from "../../store/actions/offer"

import Button from "../../components/Button";
import ModalComponent, {modalActions} from "../../components/Modal";
import Page404 from "../404";


const OfferPage = ({dispatch, user, offer}) => {
  const {id} = useParams();
  const history = useHistory();
  const [currentOffer, setCurrentOffer] = useState({
    quantity_per_hand: 1
  });
  const [showModal, setShowModal] = useState(false);
  const [coordinate, setCoordinate] = useState([55.75, 37.57]);
  const [ymaps, setYmaps] = useState(null)

  const getCurrentOffer = () => {
    let res = null;
    offer.data.map((v, i) => {
      if (v.id == id) {
        setCurrentOffer(v)
        res = v;
      }
    })
    return res
  }

  const handleBuyCoupon = () => {
    dispatch(actionOffer.buy({id}))
    handleModalClose()
  }

  const handleModalBuyCoupon = () => {
    setShowModal(true)
    // handleBuyCoupon()
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const selectAddress = (v) => {
    setCoordinate([v.geo_lat, v.geo_lon])
  }


  useEffect(() => {
    const offer = getCurrentOffer()

    if (offer.addresses?.length)
      setCoordinate([offer.addresses[0]?.geo_lat, offer.addresses[0]?.geo_lon])
  }, [])

  if (!currentOffer.id)
    return <Page404/>
console.log(currentOffer)
  console.log(user)
  return <div>
    <div className="mb-3 h3">
      {currentOffer.title}
    </div>
    <div className="mb-3 d-flex flex-row justify-content-between">
      <Button onClick={() => history.goBack()} style={{transform: 'rotate(180deg)'}}><span>&#10132;</span></Button>
      {user.roles?.indexOf('moderator') >= 0 && <Button onClick={() => history.push(getLinkControlOffer(currentOffer.id))}>Редактировать</Button>}
    </div>
    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
      <div className="mb-3" style={{width: 400, marginRight: 15}}>
        <img src={getFileUrl(currentOffer.image_promo)} alt="" style={{height: 200, width: 400}}/>
      </div>
      <div>
        <div className="mb-3">
          <div className="h6">
            Атрибуты
          </div>
          <div className="mb-3">
            Кол-во купонов в одни руки: <b>{currentOffer.quantity_per_hand}</b>
          </div>
          <div className="mb-3">
            Необходимый уровень: <b>{currentOffer.client_level}</b>
          </div>
          <div className="mb-3">
            От партнера: <b>{currentOffer.organization.title}</b>
          </div>
        </div>
        <div className="mb-3">
          <div className="h6">
            Описание
          </div>
          {currentOffer.description}
        </div>
        <div className="mb-3">
          {user.isAuth
            ? <Button schema="main-primary" onClick={handleModalBuyCoupon}>Получить купон</Button>
            : <span>Для покупки необходимо <Link to={getLink('auth')} className="link-primary">авторизироваться</Link>
        </span>}
        </div>
      </div>
    </div>
    <div className="mb-3">
      <div className="mb-3 h4">
        Адреса
      </div>
      <div className="mb-3">
        <ul className="list-group" style={{borderRadius: 0}}>
          {currentOffer.addresses.map((v, i) => {
            return <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
            <span>
              <a onClick={() => selectAddress(v)}>{v.value}</a>
            </span>
            </li>
          })}
        </ul>

      </div>
      <div>
        {!!currentOffer.addresses?.length && <YMaps
          // query={{
          //   apiKey: "8921d1f3-5bf7-4f8f-adbf-638843b4a7df"
          // }}
        >
          <div>
            <Map
              state={{center: coordinate, zoom: 17}}
              style={{height: 400, width: '100%'}}
              onLoad={ymaps => {
                setYmaps(ymaps)
              }}
            >
              <Placemark
                geometry={coordinate}
                key={coordinate}
                options={{
                  iconLayout: "default#image",
                  // iconImageHref: mapIcon,
                  iconImageSize: [30, 42],
                  iconImageOffset: [-3, -42],
                }}
                draggable={false}
              />
            </Map>
          </div>
        </YMaps>}
      </div>
    </div>
    <ModalComponent
      show={showModal}
      data={{
        title: 'Подтверждение',
        description: 'Получить купон?',
      }}
      handleClose={handleModalClose}
      actions={modalActions.OK_CANCEL}
      onOk={handleBuyCoupon}
      actionsName={{
        cancel: 'Отмена',
        ok: 'Да'
      }}
    />
  </div>
}


export default connect(state => ({
  user: state.user,
  offer: state.offer
}))(OfferPage);
