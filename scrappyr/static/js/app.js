import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import store from './store';
import ScrapList from './scraps/components/scrap_list'

import { bindActionCreators } from 'redux';
import actionCreators, { receiveScraps } from './actions';


function mapStateToProps(state) {
    return {
        scraps: state.scraps,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class Main extends React.Component {
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);


render(
    <Provider store={store}>
        <App>
            <ScrapList></ScrapList>
        </App>
    </Provider>,
    document.getElementById('react-scrap-list'),
)


store.dispatch(receiveScraps(window.props.scraps));


async function initializeComponent() {
    const response = await fetch('/api/scraps');
    const scraps = await response.json();
    store.dispatch(receiveScraps(scraps));
}
