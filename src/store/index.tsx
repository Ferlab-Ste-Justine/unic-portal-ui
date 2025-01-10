import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import globalReducer from '@/store/global';
import userReducer from '@/store/user';
// import createFilter from 'redux-persist-transform-filter';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['global'], // only persist the 'global' reducer
  // transforms: [createFilter('global', ['lang'])], // only persist the 'lang' property from 'global'
  version: 1,
};

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true, // Enable Redux DevTools in development
  middleware: (getDefaultMiddleware) => {
    const defaultMid = getDefaultMiddleware({
      serializableCheck: false,
      thunk: true, // Explicitly state that thunk middleware should be included (optional)
    });
    return defaultMid;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function getStoreConfig() {
  return { store, persistor };
}
