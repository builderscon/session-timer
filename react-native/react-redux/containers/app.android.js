import React, { Component } from 'react'
import {
    applyMiddleware,
    bindActionCreators,
    combineReducers,
    createStore,
} from 'redux'
import {
    Provider,
    connect,
} from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../reducers'
import * as actions from '../actions/creators'
import App from '../components/app'

const ConnectedApp = connect(state => ({
    state: state.timer
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(App)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default class Container extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Provider store={store}>
                <ConnectedApp />
            </Provider>
        )
    }
}
