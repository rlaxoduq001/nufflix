import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from './reducers/MovieReducer';
import webStorageReducer from './reducers/webStorageReducer';

const store = configureStore({
  reducer:{
    movie : MovieReducer,
    webStorage : webStorageReducer

  }
})

export default store;