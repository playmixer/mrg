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
    link: `${SUBDIR}/auth`,
    title: "Auth",
    page: <Auth/>
  },
  organization: {
    link: `${SUBDIR}/organization`,
    title: "Партнер",
    page: <OrganizationPage/>
  },
  controlOrg: {
    link: `${SUBDIR}/control/organization/:id`,
    title: "Управление Организацией",
    page: <OgranizationDetails/>
  },
  controlOffer: {
    link: `${SUBDIR}/control/offer/:id`,
    title: "Управление акцией",
    page: <OfferDetails/>
  },
  controlOffers: {
    link: `${SUBDIR}/control/offers`,
    title: "Панель управления",
    page: <Control tab={'Акции'}/>
  },
  controlOrgs: {
    link: `${SUBDIR}/control/organizations`,
    title: "Панель управления",
    page: <Control tab={'Партнеры'}/>
  },
  control: {
    link: `${SUBDIR}/control`,
    title: "Панель управления",
    page: <Control/>
  },
  home: {
    link: `${SUBDIR}/home`,
    title: "Главная",
    page: <Home/>
  },
  profile: {
    link: `${SUBDIR}/profile/info`,
    title: "Личный кабинет",
    page: <Info/>
  },
  profileCoupons: {
    link: `${SUBDIR}/profile/coupons`,
    title: "Личный кабинет",
    page: <Coupons/>
  },
  offer: {
    link: `${SUBDIR}/offer/:id`,
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
  const url = routers[page].link;
  return url;
}

export const getLinkOffer = (id) => {
  return routers.offer.link.replace(':id', id)
}

export const getLinkControlOffer = (id) => {
  return routers.controlOffer.link.replace(':id', id)
}

export const getImageUrl = (image) =>
  `${Config.SUBDIRECTORY}/static/frontend/images/${image}`

export const useQuery = () => {
  const {search} = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const getFileUrl = (filename) =>
  `${Config.SUBDIRECTORY}/api/v0/stores/?file=${filename}`
