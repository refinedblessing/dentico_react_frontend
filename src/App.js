import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import Home from './components/Home';
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';

const history = createHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(routerMiddleware(history))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Fragment>
            <Header/>
            <div className="container-fluid">
              <div className="row">
                <Sidebar/>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                  <Switch>
                    <Route exact path="/" component={Home}/>
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
