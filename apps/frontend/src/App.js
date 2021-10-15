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

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth"
import NavMenu from "./components/NavMenu"

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

  // Должен быть в конце
  home: {
    link: "/",
    title: "Главная",
    page: <Home/>
  },
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <NavMenu routers={routers}/>
            <div style={{marginTop: 20}}>
              <Switch>
                {Object.keys(routers).map((v, i) => <Route path={routers[v].link} key={i}>
                  {routers[v].page}
                </Route>)}
              </Switch>
            </div>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);
