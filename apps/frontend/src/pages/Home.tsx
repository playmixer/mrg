import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import * as userAction from "../store/actions/user";
import * as offerAction from "../store/actions/offer";

import routers, {getLink, useQuery} from "../routers"

import OfferCard from "../components/pages/OfferCard";
import Pagination from "../components/Pagination";
import {OfferStoreProps, StoreApplicationProps, StoreProps, UserStoreProps} from "../@types/store";
import {Offer, OfferAddress} from "../@types/offer";

interface Props {
  dispatch
  offer: OfferStoreProps
  user: UserStoreProps
  application: StoreApplicationProps
}


const Home = ({dispatch, offer, user, application}: Props) => {
  const history = useHistory();
  const query = useQuery();
  const page = Number(query.get('page')) || 1;

  const [pageNum, setPageNum] = useState(page);
  const pageSize = 8;

  const getCountPage = () => {
    let count = Math.floor(filterOffers(offer.data).length / pageSize);
    if (filterOffers(offer.data).length % pageSize > 0) count ++;

    return count;
  }

  const onChangePage = (num) => {
    setPageNum(num)
  }

  const getUserCoupons = () => {
    dispatch(userAction.coupons())
  }

  const userHaveCoupon = (offer_id) => {
    if (user.coupons)
      for (let i = 0; i < user.coupons?.length; i++) {
        if (offer_id === user.coupons[i].offer_id) return true
      }
    return false
  }

  const filterOffers = (offerList) => {
    const city = application.currentCity?.toLowerCase();
    if (city) {
      const res = offerList.filter((v) => {
        // console.log(v.addresses)
        let isInclude = false
        v.addresses?.map((v: OfferAddress) => {
          if (v.value?.toLowerCase()?.includes(city)) {
            isInclude = true
            return
          }
        })
        return isInclude
      })
      return res
    }
    return offerList
  }

  useEffect(() => {
    dispatch(offerAction.list())

    history.push(`${getLink(routers.home.name)}?page=${pageNum}`)
    if (user.isAuth)
      getUserCoupons()

  }, [pageNum])
// console.log(offer)
  return <div>
    <div className="mb-3">
      <span className="h3">Главная страница</span>
    </div>
    <div className="d-flex flex-row flex-wrap justify-content-start mb-3">
      {
        filterOffers(offer.data).map((v: Offer, i) => {
          if (i >= (pageNum - 1) * pageSize && i < pageNum * pageSize)
            return <div key={i}>
              <OfferCard data={v} have={userHaveCoupon(v.id)} style={{marginRight: 20}}/>
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

export default connect((state: StoreProps) => ({
  user: state.user,
  offer: state.offer,
  application: state.application
}))(Home);
