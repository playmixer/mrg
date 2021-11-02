import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as offerAction from '../../store/actions/offer';
import Button from "../../components/Button";
import OfferList from "./OfferList";
import OfferNew from "./OfferNew";


const Offer = ({dispatch, offer}) => {
  const P_LIST = 0
  const P_NEW = 1

  const [action, setAction] = useState(P_LIST)

  useEffect(() => {
    dispatch(offerAction.list())
  }, [])

  return <div>
    <div className="mb-3">
      <Button style={{width: 100}} schema={action === P_LIST && `main-primary`} onClick={() => setAction(P_LIST)}>
        Список
      </Button>
      <Button style={{width: 100}} schema={action === P_NEW && `main-primary`} onClick={() => setAction(P_NEW)}>
        Добавить
      </Button>
    </div>
    {action === P_LIST && <OfferList data={offer.data}/>}
    {action === P_NEW && <OfferNew/>}
  </div>

}

export default connect(state => ({
  offer: state.offer
}))(Offer);
