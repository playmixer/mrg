import React from "react";
import {connect} from "react-redux";

import {ROLES} from "../../utils/auth";

const OrganizationPage = ({dispatch, organization, user}) => {



  console.log(organization)
  console.log(user)
  return <div>
    Партнерская страница
  </div>
}

export default connect(state => ({
  organization: state.organization,
  user: state.user,
}))(OrganizationPage);
