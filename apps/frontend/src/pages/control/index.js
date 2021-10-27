import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import NavTabs from "../../components/NavTabs";

import OrganizationList from "./OrganizationList";
import OfferList from "./OfferList";

import * as organizationAction from '../../store/actions/organization'
import Page404 from "../404";

const ORGS = 'Организации'
const COUPS = 'Акции'

const tabs = [ORGS, COUPS];


const Control = ({dispatch, user, organization}) => {
  if (!user.isAuth)
    return <Page404/>;

  const [panel, setPanel] = useState(0);

  return <div>
    <h3 className="mb-3">Панель управления</h3>
    <NavTabs
      tabs={tabs}
      active={panel}
      onChange={setPanel}
      className="mb-3"
    />
    {tabs[panel] === ORGS && <OrganizationList/>}
    {tabs[panel] === COUPS && <OfferList/>}
  </div>
}

export default connect(state => ({
  user: state.user,
  organization: state.organization
}))(Control);
