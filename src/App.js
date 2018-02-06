import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import Home from './components/Home';
import Patient from './components/Patient';
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';
import Notifier from './components/Notification';

const history = createHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunk, logger, promiseMiddleware(), routerMiddleware(history))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Fragment>
            <Header/>
            <div className="container-fluid App">
              <div className="row">
                <Sidebar/>
                <main role="main" className="col-sm-10 col-md-10 ml-sm-auto col-lg-10 pt-3 main">
                  <Notifier/>
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/patients" component={Patient}/>
                  </Switch>
                </main>
              </div>
            </div>
            <Footer/>
          </Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
