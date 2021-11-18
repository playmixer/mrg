import React from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {getLink} from "../../routers";

const OfferList = ({data}) => {
  const history = useHistory()

  return <div>
      <table className="table table-striped">
        <thead>
        <tr>
          <th> title</th>
          <th>Начало</th>
          <th>Окончание</th>
          <th>Описание</th>
          <th>Организация</th>
          <th>Кол-во в руки</th>
          <th>Уровень</th>
        </tr>
        </thead>
        <tbody>
        {data.map((v, i) => <tr key={i} onClick={() => {history.push(getLink('controlOffer').replace(':id', v.id))}}>
          <td>{v.title}</td>
          <td>{v.date_start}</td>
          <td>{v.date_end}</td>
          <td>{v.description.substr(0, 150)}{v.description.length > 150 && '...'}</td>
          <td>{v.organization.title}</td>
          <td>{v.quantity_per_hand}</td>
          <td>{v.client_level}</td>
        </tr>)}
        </tbody>
      </table>
    </div>
}

export default OfferList;
