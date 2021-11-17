import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import styled from "styled-components";

import {getLink} from "../../../routers";

const SideMenu = ({}) => {
  const history = useHistory();
  const location = useLocation();


  console.log(location.pathname)


  return <div style={{width: '100%'}}>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to={getLink('profile')}>
          <NavBtn className={location.pathname === getLink('profile') && `bg-primary text-light`}>Инфо</NavBtn>
        </Link>
      </li>
      <li className="nav-item">
        <Link to={getLink('profileCoupons')}>
          <NavBtn className={location.pathname === getLink('profileCoupons') && `bg-primary text-light`}>Купоны</NavBtn>
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
