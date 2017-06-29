import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import Modal from 'react-modal';

import store from './store';
import ScrapList from './components/scrap_list';
import ScrapEditor from '../scrap_editor/components/editor';
import { createReactReduxApp } from '../utils/react_utils';
import * as actionCreators from './actions';


function mapStateToProps(state) {
  return {
    scrapEditor: state.scrapEditor,
    scraps: state.scraps,
  };
}

class App extends React.Component {

  render() {
    const { isOpen } = this.props.scrapEditor;
    return (
      <div>
        <ScrapList {...this.props}/>
        <Modal isOpen={isOpen} contentLabel="Example Modal" >
          <ScrapEditor {...this.props} />
        </Modal>
      </div>
    );
  }
}

store.dispatch(actionCreators.receiveScraps(window.props.scraps));
const reactReduxApp = createReactReduxApp(App, store, mapStateToProps, actionCreators);
render(reactReduxApp, document.getElementById('react-scrap-list'));
