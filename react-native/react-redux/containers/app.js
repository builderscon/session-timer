import React from 'react'
import {
    bindActionCreators,
    createStore,
} from 'redux'
import {
    Provider,
    connect,
} from 'react-redux'

import reducers from '../reducers'
import * as actions from '../actions/creators'
import App from '../components/app'

const ConnectedApp = connect(state => ({
    state: state.timer,
    modal: state.modal,
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch),
}))(App)

const store = createStore(reducers)

export default function Container() {
    return (
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
    )
}
