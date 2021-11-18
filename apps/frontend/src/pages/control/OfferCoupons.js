import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";

import * as offerAction from "../../store/actions/offer";
import Button from "../../components/Button";
import InputText from "../../components/inputs/InputText";

const coupons_data = {
  count: 0,
  purchased: 0,
  activated: 0
}

const OfferCoupons = ({dispatch, offer, data}) => {
  const [coupons, setCoupons] = useState(coupons_data);
  const [isOpenCreateCoupons, setIsOpenCreateCoupons] = useState(false);
  const [inputForm, setInputForm] = useState({
    offer_id: data.id,
    count: 100
  });

  const onChangeForm = (e) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateCoupons = () => {
    dispatch(offerAction.createCoupons(inputForm))
      .then(res => {
        setCoupons(res)
        setIsOpenCreateCoupons(false)
      })
  }

  useEffect(() => {
    dispatch(offerAction.getCoupons({offer_id: data.id}))
      .then(setCoupons)
  }, [])

  return <div>
    <AttrContainer>
      <AttrDiv>
        Всего: <span>{coupons.count}</span>
      </AttrDiv>
      <AttrDiv>
        Куплено: <span>{coupons.purchased}</span>
      </AttrDiv>
      <AttrDiv>
        Активировано: <span>{coupons.activated}</span>
      </AttrDiv>
    </AttrContainer>
    <CreateCouponsContainer>
      <div>
        <a href={"#"} onClick={() => setIsOpenCreateCoupons(!isOpenCreateCoupons)}>Создать купоны</a>
      </div>
      {isOpenCreateCoupons && <div>
        <div>
          <InputText
            title={"Количество купонов"}
            name={"count"}
            type={"number"}
            style={{width: 200}}
            value={inputForm.count}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <Button onClick={handleCreateCoupons}>Создать</Button>
        </div>
      </div>}
    </CreateCouponsContainer>
  </div>
}

const AttrDiv = styled.div`
  margin-bottom: 3px;
  margin-right: 15px;
  
  span {
    font-weight: bold;
  }
`
const AttrContainer = styled.div`
  display: flex;
  margin-bottom: 3px;
`
const CreateCouponsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 3px;
`

export default connect(state => ({
  offer: state.offer
}))(OfferCoupons);
