import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import ScrapList from './components/scrap_list'
import { createReactApp } from '../utils/react_utils';

import actionCreators, { receiveScraps } from './actions';


function mapStateToProps(state) {
    return {
        scraps: state.scraps,
    };
}

const ScrapsApp = createReactApp(mapStateToProps, actionCreators);


render(
    <Provider store={store}>
        <ScrapsApp>
            <ScrapList></ScrapList>
        </ScrapsApp>
    </Provider>,
    document.getElementById('react-scrap-list'),
)


store.dispatch(receiveScraps(window.props.scraps));


async function initializeComponent() {
    const response = await fetch('/api/scraps');
    const scraps = await response.json();
    store.dispatch(receiveScraps(scraps));
}
