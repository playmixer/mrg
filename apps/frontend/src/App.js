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
import NavMenu from "./components/NavMenu"

import routers from "./routers"

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
