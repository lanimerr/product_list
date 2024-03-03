import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import sortReducer from './sortSlice'

const rootReducer = combineReducers({
  data: dataReducer,
  sort: sortReducer,
});

const store = configureStore({
    reducer: rootReducer
})

export { store, rootReducer };