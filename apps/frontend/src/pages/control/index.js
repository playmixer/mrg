import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"

import NavTabs from "../../components/NavTabs";
import OrganizationList from "./OrganizationList";
import Offer from "./Offer";
import Page404 from "../404";

import routers, {getLink} from "../../routers";


const ORGS = 'Партнеры'
const COUPS = 'Акции'


const Control = ({user, tab}) => {
  const history = useHistory();

  const tabs = [
    {
      name: ORGS,
      link: getLink(routers.controlOrgs.name)
    },
    {
      name: COUPS,
      link: getLink(routers.controlOffers.name)
    }
  ];

  if (!user.isAuth || user.roles.indexOf('moderator') < 0)
    return <Page404/>;

  const [panel, setPanel] = useState(0);

  const handleChangeTab = (e) => {
    setPanel(e)
    history.push(tabs[e].link)
  }

  const getOffer = () => {
    tabs.map((v, i) => {
      if (v.name === tab) {
        setPanel(i)
      }
    })
  }

  useEffect(() => {
    getOffer()
  }, [])

  return <div>
    <h3 className="mb-3">Панель управления</h3>
    <NavTabs
      tabs={tabs.map(v => (v.name))}
      active={panel}
      onChange={handleChangeTab}
      className="mb-3"
    />
    {tabs[panel]?.name === ORGS && <OrganizationList/>}
    {tabs[panel]?.name === COUPS && <Offer/>}
  </div>
}

export default connect(state => ({
  user: state.user,
}))(Control);
