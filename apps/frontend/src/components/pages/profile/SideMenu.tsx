import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import styled from "styled-components";

import routers, {getLink} from "routers";

const SideMenu = ({}) => {
  const history = useHistory();
  const location = useLocation();

  return <div style={{width: '100%'}}>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to={getLink(routers.profile.name)}>
          <NavBtn className={location.pathname === getLink(routers.profile.name) ? `bg-primary text-light` : ''}>Инфо</NavBtn>
        </Link>
      </li>
      <li className="nav-item">
        <Link to={getLink(routers.profileCoupons.name)}>
          <NavBtn className={location.pathname === getLink(routers.profileCoupons.name) ? `bg-primary text-light` : ''}>Купоны</NavBtn>
        </Link>
      </li>
    </ul>
  </div>
}

const NavBtn = styled.div`
padding: 5px;
height: 40px;
`

export default SideMenu;
