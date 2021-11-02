import React from "react";

const NavTabs = ({tabs, onChange, active, className}) => {

  return <ul className={`nav nav-tabs ${className}`}>
    {tabs.map((v, i) => {
      return <li className="nav-item" key={i}>
        <a className={`nav-link ${active === i && 'active'}`}
           style={{borderRadius: 0}}
           key={i}
           onClick={() => onChange(i)}
        >
          {v}
        </a>
      </li>
    })}
  </ul>
}

export default NavTabs;
