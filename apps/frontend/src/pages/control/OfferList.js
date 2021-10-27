import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as offerAction from '../../store/actions/offer';
import Button from "../../components/Button";


const OfferList = ({dispatch, offer}) => {
  const P_LIST = 0
  const P_NEW = 1

  const [action, setAction] = useState(P_LIST)

  useEffect(() => {
    dispatch(offerAction.list())
  }, [])

  console.log(offer)
  return <div>
    <Button style={{width: 100}} schema={action === P_LIST && `main-primary`} onClick={() => setAction(P_LIST)}>
      Список
    </Button>
    <Button style={{width: 100}} schema={action === P_NEW && `main-primary`} onClick={() => setAction(P_NEW)}>
      Добавить
    </Button>
    {action === P_LIST && <div>
      list
    </div>}
    {action === P_NEW && <div>
      
    </div>}
  </div>

}

export default connect(state => ({
  offer: state.offer
}))(OfferList);
