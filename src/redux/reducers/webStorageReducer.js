import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  sessionData : {},
  localStorageData : []
}

const webStorageSlice = createSlice({
  name: 'webStorage',
  initialState,
  reducers: { 
    getSession(state,action) {
      state.sessionData = {
        page : sessionStorage.setItem('page', action.payload.page),
        keyword : sessionStorage.setItem('searchKeyword', action.payload.keyword)
      }
    },
    getLocalStorage(state,action) {
      state.localStorageData = action.payload.movieInfo || [];
    }
  }
}) 

export const webStorageSliceActions = webStorageSlice.actions;
export default webStorageSlice.reducer;
