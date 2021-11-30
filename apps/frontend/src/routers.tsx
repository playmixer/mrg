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
console.log('config', Config)

const SUBDIR = Config.SUBDIRECTORY;

interface RouteProps {
  name: string
  link: string
  title: string
  page: any
}

interface RoutersProps {
  auth: RouteProps
  organization: RouteProps
  controlOrg: RouteProps
  controlOffer: RouteProps
  controlOffers: RouteProps
  controlOrgs: RouteProps
  control: RouteProps
  home: RouteProps
  profile: RouteProps
  profileCoupons: RouteProps
  offer: RouteProps
  page404: RouteProps
}

const routers: RoutersProps = {
  auth: {
    name: 'auth',
    link: `/auth`,
    title: "Auth",
    page: <Auth/>
  },
  organization: {
    name: 'organization',
    link: `/organization`,
    title: "Партнер",
    page: <OrganizationPage/>
  },
  controlOrg: {
    name: 'controlOrg',
    link: `/control/organization/:id`,
    title: "Управление Организацией",
    page: <OgranizationDetails/>
  },
  controlOffer: {
    name: 'controlOffer',
    link: `/control/offer/:id`,
    title: "Управление акцией",
    page: <OfferDetails/>
  },
  controlOffers: {
    name: 'controlOffers',
    link: `/control/offers`,
    title: "Панель управления",
    page: <Control tab={'Акции'}/>
  },
  controlOrgs: {
    name: 'controlOrgs',
    link: `/control/organizations`,
    title: "Панель управления",
    page: <Control tab={'Партнеры'}/>
  },
  control: {
    name: 'control',
    link: `/control`,
    title: "Панель управления",
    page: <Control/>
  },
  home: {
    name: 'home',
    link: `/home`,
    title: "Главная",
    page: <Home/>
  },
  profile: {
    name: 'profile',
    link: `/profile/info`,
    title: "Личный кабинет",
    page: <Info/>
  },
  profileCoupons: {
    name: 'profileCoupons',
    link: `/profile/coupons`,
    title: "Личный кабинет",
    page: <Coupons/>
  },
  offer: {
    name: 'offer',
    link: `/offer/:id`,
    title: "Предложение",
    page: <OfferPage/>
  },

  //Должна быть в конце
  page404: {
    name: 'page404',
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
  // @ts-ignore
  const url = SUBDIR + routers[page].link;
  return url;
}

export const getLinkOffer = (id: string) => {
  return SUBDIR + routers.offer.link.replace(':id', id)
}

export const getLinkControlOffer = (id: string) => {
  return SUBDIR + routers.controlOffer.link.replace(':id', id)
}

export const getImageUrl = (image: string) =>
  `${SUBDIR}/static/frontend/images/${image}`

export const useQuery = () => {
  const {search} = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const getFileUrl = (filename: string | undefined) =>
  `${SUBDIR}/api/v0/stores/?file=${filename}`
