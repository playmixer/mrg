import React, {useState} from "react";
import {getImageUrl, getLinkOffer} from "../../routers";
import {useHistory} from "react-router-dom";
import * as apiHandle from "../../api/index"
import Modal from "../Modal";
import Button from "../Button";
import styled from "styled-components";
import {colors} from "../../style/colors";

interface Props {
  data: Offer
  style: any
  have: boolean
}

const OfferCard = ({data, style, have}: Props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onClickOffer = (id: string) =>
    history.push(getLinkOffer(id))

  return <CardContainer style={{...style}}>
    {have && <div className="text-white" style={{position: 'absolute', right: 15, top: 5, fontSize: 30}}>
      &#9733;
    </div>}
    <CardImg src={`${apiHandle.urlStores}?file=offer_${data.id}_promo.jpg`} className="card-img-top" alt="Картинка"/>
    <div className="card-body" style={{height: 135}}>
      <h5 className="card-title">{data.title}</h5>
      <p className="card-text">{data.description.substr(0, 115)}{data.description.length> 115 && '...'}</p>
    </div>
    <CardBody style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button onClick={() => setShowModal(true)} style={{width: 120, border: 'none'}}>Подробнее</Button>
      <Button onClick={() => onClickOffer(data.id)} style={{width: 120, border: 'none'}}>Перейти</Button>
    </CardBody>
    <Modal
      handleClose={() => setShowModal(false)}
      show={showModal}
      data={data}
    />
  </CardContainer>
}

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  width: 300px;
  height: 355px;
  margin-bottom: 35px;
  border-radius: 0;
  transition-duration: 0.2s;
  
  :hover {
    border: 1px solid rgba(0,0,0,.125);
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 30px;
    box-shadow: 5px -5px 0 ${_ => colors.bsBlue};
    transition-duration: 0.2s;
  }  
`

const CardImg = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 0;
  vertical-align: middle;
`

const CardBody = styled.div`
    flex: 1 1 auto;
    padding: 1rem 1rem;

`

export default OfferCard;
