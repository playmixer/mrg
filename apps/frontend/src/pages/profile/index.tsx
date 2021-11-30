import React from "react";
import {connect} from "react-redux";
import SideMenu from "../../components/pages/profile/SideMenu";
import Page404 from "../404";

const Profile = ({children, user}) => {
  if (!user.isAuth) return <Page404/>


  return <div>
    <div className="mb-3">
      <span className="h3">Личный кабинет</span>
    </div>
    <div className="d-flex flex-row">
      <div style={{flex: 1, marginRight: 20}}>
        <SideMenu/>
      </div>
      <div style={{flex: 4}}>
        {children}
      </div>
    </div>
  </div>
}

export default connect((state: StoreProps) => ({
  user: state.user
}))(Profile)
