import React, {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import QRCode from "react-qr-code";

import {getFileUrl, getLinkOffer} from "routers";

import ModalComponent from "../../Modal";
import Button from "../../Button";
import {InputText} from "../../inputs/";
import {notify} from "../../Notification";

import {colors} from "@style/colors";



interface PropsCoupon {
  data: Coupon
  className?: any
  style?: any
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
    <CouponDetail>
      <Link to={getLinkOffer(data.offer_id)} className="text-decoration-none">&#10132;</Link>
    </CouponDetail>
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
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 60px;
  border: solid 1px ${_ => colors.bsBlue};
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-top: 0px;
  margin-bottom: 10px;
  
  &:hover {
    box-shadow: 5px -5px 0 ${_ => colors.bsBlue};
    transition-duration: 0.2s;
  }  
`

const CouponDetail = styled.span`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Coupon;
