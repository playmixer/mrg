import React, {Component} from 'react';
import {render} from "react-dom";
import {store} from './store/index';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Notification from "./components/Notification";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth"
import NavMenu from "./components/NavMenu"
import Control from "./pages/control";
import ControlOrganization from "./pages/control/OgranizationDetails";
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
    page: <ControlOrganization/>
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

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Layout>
              <NavMenu routers={routers}/>
              <div style={{marginTop: 20}}>
                <Switch>
                  {Object.keys(routers).map((v, i) =>
                    <Route path={routers[v].link} key={i}>
                      {routers[v].page}
                    </Route>)}
                </Switch>
              </div>
            </Layout>
          </BrowserRouter>
        </Provider>
        <Notification/>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);
