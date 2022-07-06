import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './Reducers/index';

const persistConfig = {
    key: "ticketing-app",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
    devTools: window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
  })

export const persistor = persistStore(store);

export default store;