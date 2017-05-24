import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';


export function connectToApp(mapStateToProps, actionCreators, App) {
  function mapDispatchToProps(dispatch) {
      return bindActionCreators(actionCreators, dispatch);
  }
  return connect(mapStateToProps, mapDispatchToProps)(App);
}


export function createReactReduxApp(App, store, mapStateToProps, actionCreators) {
  const ReactReduxApp = connectToApp(mapStateToProps, actionCreators, App);
  return (
    <Provider store={store}>
      <ReactReduxApp/>
    </Provider>
  );
}

