import { configureStore, applyMiddleware, compose } from 'redux'
import { combinedReducers } from './reducers'

const middlewares = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = composeEnhancers(applyMiddleware(...middlewares))
const globalStore = configureStore(combinedReducers, enhancers)
export default globalStore