import { createStore } from 'redux'
import Reducer from '../reducers/rootReducer'
import { persistStore, persistReducer } from "redux-persist"
import { AsyncStorage } from "react-native"

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig,Reducer)

// const store = createStore(Reducer)
const store = createStore(persistedReducer)

const persistor = persistStore(store)

export {
    store,
    persistor
}