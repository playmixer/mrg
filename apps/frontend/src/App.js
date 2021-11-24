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
import styled from "styled-components"

import Notification from "./components/Notification";

import Layout from "./components/Layout";
import NavMenu from "./components/NavMenu"

import routers, {getLink} from "./routers"

const DivContainer = styled.div`
color: black;
`;

class App extends Component {
  render() {
    return (
      <DivContainer>
        <Provider store={store}>
          <BrowserRouter>
            <Layout>
              <NavMenu/>
              <div style={{marginTop: 20}}>
                <Switch>
                  {Object.keys(routers).map((v, i) =>
                    <Route path={getLink(v)} key={i}>
                      {routers[v].page}
                    </Route>)}
                </Switch>
              </div>
            </Layout>
          </BrowserRouter>
        </Provider>
        <Notification/>
      </DivContainer>
    );
  }
}


export default App;

const container = document.getElementById("app");
render(<App/>, container);
