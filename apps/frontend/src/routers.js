import React from "react";

import Auth from "./pages/Auth";
import OgranizationDetails from "./pages/control/OgranizationDetails";
import OfferDetails from "./pages/control/OfferDetails";
import Control from "./pages/control";
import Home from "./pages/Home";
import Page404 from "./pages/404";

const routers = {
  auth: {
    link: "/auth",
    title: "Auth",
    page: <Auth/>
  },
  organization: {
    link: "/organization",
    title: "Организация",
    page: <div>organization</div>
  },
  controlOrg: {
    link: "/control/organization/:id",
    title: "Управление Организацией",
    page: <OgranizationDetails/>
  },
  controlOffer: {
    link: "/control/offer/:id",
    title: "Управление акцией",
    page: <OfferDetails/>
  },
  controlOffers: {
    link: "/control/offers",
    title: "Панель управления",
    page: <Control tab={'Акции'}/>
  },
  controlOrgs: {
    link: "/control/organizations",
    title: "Панель управления",
    page: <Control tab={'Организации'}/>
  },
  control: {
    link: "/control",
    title: "Панель управления",
    page: <Control/>
  },
  home: {
    link: "/home",
    title: "Главная",
    page: <Home/>
  },

  //Должна быть в конце
  page404: {
    link: "*",
    title: "404",
    page: <Page404/>
  }
}

export default routers;

export const getLink = (page = 'home') => {
  const url = routers[page].link;
  return url;
}
