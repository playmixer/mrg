import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as offerAction from "../../store/actions/offer";
import styled from "styled-components";


const OfferCoupons = ({dispatch, offer, data}) => {
  const [coupons, setCoupons] = useState({})

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
  flex-direction: row;
  justify-content: flex-start;
`

export default connect(state => ({
  offer: state.offer
}))(OfferCoupons);
