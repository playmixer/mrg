import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as storeUser from "../../store/actions/user";

import Profile from "./index";
import Coupon from "../../components/pages/profile/Coupon";
import Pagination from "../../components/Pagination";


const CouponsPage = ({dispatch, user}) => {
  const pageSize = 10;
  const [currentNumPage, setCurrentNumPage] = useState(1)
  const [currentData, setCurrentData] = useState([])


  const getCoupons = () => {
    dispatch(storeUser.coupons())
      .then(() => {
        getCurrentData(currentNumPage);
      })
  }

  const getCurrentData = (num) => {
    const numPage = num ? num : currentNumPage
    console.log(currentNumPage)
    let res = []
    user.coupons?.map((v, i) => {
      if (i >= (numPage - 1) * pageSize && i < numPage * pageSize) {
        res.push(v)
      }
    })
    setCurrentData(res)
  }

  const onChangePage = (id) => {
    setCurrentNumPage(id);
    getCurrentData(id)
  }

  useEffect(() => {
    getCoupons()
    getCurrentData(currentNumPage)
  }, [])

  return <Profile>
    <div className="mb-3 h4">
      Приобретенные купоны
    </div>
    <div>
      {currentData && currentData.map((v, i) => {
        return <Coupon key={i} data={v} className="mb-3"/>
      })}
    </div>
    <Pagination
      countElements={user.coupons?.length}
      pageSize={pageSize}
      currentIndex={currentNumPage}
      onPage={onChangePage}
    />
  </Profile>
}

export default connect(state => ({
  user: state.user
}))(CouponsPage);
