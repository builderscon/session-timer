'use strict'

import React, { Component } from 'react'
import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../reducers'
import App from './ios-app'

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
                <App />
            </Provider>
        )
    }
}
