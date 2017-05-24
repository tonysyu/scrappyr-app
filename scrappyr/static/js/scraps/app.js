import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

import store from './store';
import ScrapList from './components/scrap_list'
import { createReactReduxApp } from '../utils/react_utils';

import * as actionCreators from './actions';


function mapStateToProps(state) {
  return {
    app: state.app,
    scraps: state.scraps,
  };
}


class App extends React.Component {
  openEditor() {
    this.props.openEditor();
  }

  closeEditor() {
    this.props.closeEditor();
  }

  render() {
    const { isEditorOpen } = this.props.app;
    return (
      <div>
        <ScrapList {...this.props}/>
        <Modal isOpen={isEditorOpen} contentLabel="Example Modal" >
          <h4>Edit Scrap</h4>
          <form>
            <div className="form-group">
              <label for="close" className="form-control-label  requiredField">Title: </label>
              <input name="close" className="textinput textInput form-control"/>
            </div>
            <div className="control-group">
              <div className="controls">
                <button className="btn" onClick={this.props.closeEditor}>Cancel</button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

store.dispatch(actionCreators.receiveScraps(window.props.scraps));
const reactReduxApp = createReactReduxApp(App, store, mapStateToProps, actionCreators);
render(reactReduxApp, document.getElementById('react-scrap-list'))

async function initializeComponent() {
  const response = await fetch('/api/scraps');
  const scraps = await response.json();
  store.dispatch(receiveScraps(scraps));
}
