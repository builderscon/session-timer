import React from 'react'
import {
    applyMiddleware,
    bindActionCreators,
    createStore,
} from 'redux'
import {
    Provider,
    connect,
} from 'react-redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import * as actions from '../actions/creators'
import App from '../components/app'

const ConnectedApp = connect(state => ({
    state: state.timer
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(App)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(reducers)

export default function Container() {
    return (
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
    )
}
