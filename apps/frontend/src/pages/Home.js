import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import * as userAction from "../store/actions/user";
import * as offerAction from "../store/actions/offer";

import routers, {getLink, useQuery} from "../routers"

import OfferCard from "../components/pages/OfferCard";
import Pagination from "../components/Pagination";


const Home = ({dispatch, offer, user}) => {
  const history = useHistory();
  const query = useQuery();
  const page = Number(query.get('page')) || 1;

  const [pageNum, setPageNum] = useState(page);
  const pageSize = 8;

  const getCountPage = () => {
    let count = Math.floor(offer.data.length / pageSize);
    if (offer.data.length % pageSize > 0) count ++;

    return count;
  }

  const onChangePage = (num) => {
    setPageNum(num)
  }

  const getUserCoupons = () => {
    dispatch(userAction.coupons())
  }

  const userHaveCoupon = (offer_id) => {
    for (let i = 0; i < user.coupons?.length; i++) {
      if (offer_id === user.coupons[i].offer_id) return true
    }
    return false
  }

  useEffect(() => {
    dispatch(offerAction.list())
    history.push(`${getLink(routers.home.name)}?page=${pageNum}`)
    if (user.isAuth)
      getUserCoupons()

  }, [pageNum])

  return <div>
    <div className="mb-3">
      <span className="h3">Главная страница</span>
    </div>
    <div className="d-flex flex-row flex-wrap justify-content-start mb-3">
      {
        offer.data.map((v, i) => {
          if (i >= (pageNum - 1) * pageSize && i < pageNum * pageSize)
            return <div key={i}>
              <OfferCard data={v} have={userHaveCoupon(v.id)} isAuth={user.isAuth} style={{marginRight: 20}}/>
            </div>
          }
        )}
    </div>
    <Pagination
      onPage={onChangePage}
      currentIndex={pageNum}
      countPage={getCountPage()}
    />
  </div>
}

export default connect(state => ({
  user: state.user,
  offer: state.offer
}))(Home);
