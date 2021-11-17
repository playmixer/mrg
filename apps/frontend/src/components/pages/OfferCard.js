import React, {useState} from "react";
import {getImageUrl, getLinkOffer} from "../../routers";
import {useHistory} from "react-router-dom";
import Modal from "../Modal";
import Button from "../Button";


const OfferCard = ({data, style, have}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onClickOffer = (id) =>
    history.push(getLinkOffer(id))

  return <div className="card" style={{width: 300, height: 355, marginBottom: 35, borderRadius: 0, ...style}}>
    {have && <div className="text-white" style={{position: 'absolute', right: 15, top: 5, fontSize: 30}}>
      &#9733;
    </div>}
    <img src={`/api/v0/stores/?file=offer_${data.id}_promo.jpg`} className="card-img-top" alt="Картинка"
         style={{width: '100%', height: 150, borderRadius: 0}}/>
    <div className="card-body" style={{height: 135}}>
      <h5 className="card-title">{data.title}</h5>
      <p className="card-text">{data.description.substr(0, 115)}{data.description.length> 115 && '...'}</p>
    </div>
    <div className="card-body" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button onClick={() => setShowModal(true)} style={{width: 120}}>Подробнее</Button>
      <Button onClick={() => onClickOffer(data.id)} style={{width: 120}}>Перейти</Button>
    </div>
    <Modal
      handleClose={() => setShowModal(false)}
      show={showModal}
      data={data}
    />
  </div>
}

export default OfferCard;
