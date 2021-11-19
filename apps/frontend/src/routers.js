import React from "react";
import {useLocation} from "react-router-dom"

import Auth from "./pages/Auth";
import OgranizationDetails from "./pages/control/OgranizationDetails";
import OfferDetails from "./pages/control/OfferDetails";
import Control from "./pages/control";
import Home from "./pages/Home";
import Page404 from "./pages/404";
import Profile from "./pages/profile";
import Info from "./pages/profile/Info";
import Coupons from "./pages/profile/CouponsPage";
import OfferPage from "./pages/offer";
import OrganizationPage from "./pages/organization";

import {Config} from './config'

const SUBDIR = Config.SUBDIRECTORY;

const routers = {
  auth: {
    link: `/auth`,
    title: "Auth",
    page: <Auth/>
  },
  organization: {
    link: `/organization`,
    title: "Партнер",
    page: <OrganizationPage/>
  },
  controlOrg: {
    link: `/control/organization/:id`,
    title: "Управление Организацией",
    page: <OgranizationDetails/>
  },
  controlOffer: {
    link: `/control/offer/:id`,
    title: "Управление акцией",
    page: <OfferDetails/>
  },
  controlOffers: {
    link: `/control/offers`,
    title: "Панель управления",
    page: <Control tab={'Акции'}/>
  },
  controlOrgs: {
    link: `/control/organizations`,
    title: "Панель управления",
    page: <Control tab={'Партнеры'}/>
  },
  control: {
    link: `/control`,
    title: "Панель управления",
    page: <Control/>
  },
  home: {
    link: `/home`,
    title: "Главная",
    page: <Home/>
  },
  profile: {
    link: `/profile/info`,
    title: "Личный кабинет",
    page: <Info/>
  },
  profileCoupons: {
    link: `/profile/coupons`,
    title: "Личный кабинет",
    page: <Coupons/>
  },
  offer: {
    link: `/offer/:id`,
    title: "Предложение",
    page: <OfferPage/>
  },

  //Должна быть в конце
  page404: {
    link: "*",
    title: "404",
    page: <Page404/>
  }
}

// const subRouters = () => {
//   let res_routers = {}
//   Object.keys(routers).map(v => {
//     res_routers[v] = routers[v]
//     res_routers[v].link = Config.SUBDIRECTORY + routers[v].link
//   })
//
//   return res_routers
// }

export default routers;

export const getLink = (page = 'home') => {
  const url = SUBDIR + routers[page].link;
  return url;
}

export const getLinkOffer = (id) => {
  return SUBDIR + routers.offer.link.replace(':id', id)
}

export const getLinkControlOffer = (id) => {
  return SUBDIR + routers.controlOffer.link.replace(':id', id)
}

export const getImageUrl = (image) =>
  `${SUBDIR}/static/frontend/images/${image}`

export const useQuery = () => {
  const {search} = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const getFileUrl = (filename) =>
  `${SUBDIR}/api/v0/stores/?file=${filename}`
