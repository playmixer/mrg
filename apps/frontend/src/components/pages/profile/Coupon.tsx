import React, {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import QRCode from "react-qr-code";

import {getFileUrl, getLinkOffer} from "../../../routers";

import ModalComponent from "../../Modal";
import Button from "../../Button";
import {InputText} from "../../inputs/";
import {notify} from "../../Notification";
import {Coupons} from "../../../types/offer";

interface PropsCoupon {
  data: Coupons
  className: any
  style: any
  onActivate: any
}

const Coupon = ({data, className, style, onActivate}: PropsCoupon) => {
  const [isShowCode, setIsShowCode] = useState(false);
  const [isEnterCode, setIsEnterCode] = useState(false)
  const [code, setCode] = useState<string>('');

  const onEnterCode = () => {
    if (code === '1941') {
      setIsEnterCode(true)
      onActivate(data)
    } else notify('Код не верный', 'danger')
  }

  const bodyModal = () => {
    if (!isEnterCode)
      return <div className="mb-3">
        <div>
          <InputText
            title={"Введите код торговой точки"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
            value={code}
           />
          <Button
            onClick={onEnterCode}
          >Ввод</Button>
        </div>
        <div className="mb-3">
          <sub className="text-danger">
            Внимание: после ввода кода торговой точки, купон будет считаться активированным
          </sub>
        </div>
      </div>
    return <div className="d-flex justify-content-center align-items-center">
      <QRCode value={data.code}/>
    </div>
  }
  console.log(data)
  return <CouponComponent
    className={className}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      ...style
    }}>
    <div style={{width: 150}}>
      <img
        src={getFileUrl(data.image_promo)}
        alt=".."
        style={{
          position: 'static',
          opacity: 0.9,
          width: 150,
          maxHeight: '100%'
        }}
      />
    </div>
    <div style={{padding: '5px 10px', width: 400}}>
      <div className="">
        Акция: <b>{data.title}</b>
      </div>
      <div className="">
        Действителен: <b>{data.date_start} - {data.date_end}</b>
      </div>
    </div>
    <div className="d-flex justify-content-center align-items-center" style={{width: 300}}>
      <Button onClick={() => setIsShowCode(true)} style={{width: 200}}>Посмотреть код</Button>
    </div>
    <div style={{width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CouponDetail><Link to={getLinkOffer(data.offer_id)}
                          className="text-decoration-none">&#10132;</Link></CouponDetail>
    </div>
    <ModalComponent
      show={isShowCode}
      handleClose={() => setIsShowCode(false)}
      data={{
        title: 'QR-код',
        description: bodyModal()
      }}
    />
  </CouponComponent>
}

const CouponComponent = styled.div`
  width: 100%;
  height: 60px;
  border: solid 1px #ADD8E6;
  border-left: solid 4px #ADD8E6;
  display: flex;
  &:hover {
    background: whitesmoke;
    border-left: solid 4px #0d6efd;
  }
`

const CouponDetail = styled.span`
`

export default Coupon;
