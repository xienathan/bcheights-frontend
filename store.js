import { applyMiddleware, createStore } from "redux"
import { logger } from "redux-logger"
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"

import reducer from "./reducers"
import rootSaga from "./saga"

const saga = createSagaMiddleware()
const middleware = applyMiddleware(logger, thunk, saga)

let store = null


const makeStore = (initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState, middleware)
  } else {
    if (!store) {
      store = createStore(reducer, initialState, middleware)
    }
    saga.run(rootSaga)
    return store
  }
}

export default makeStore