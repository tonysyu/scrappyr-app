import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';


class Main extends React.Component {
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
      );
  }
}


export function createReactApp(mapStateToProps, actionCreators) {

  function mapDispatchToProps(dispatch) {
      return bindActionCreators(actionCreators, dispatch);
  }
  const app = connect(mapStateToProps, mapDispatchToProps)(Main);

  return app;
}
