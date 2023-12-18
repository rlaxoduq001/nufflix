import { webStorageSliceActions } from "../reducers/webStorageReducer";


function sessionData() {
  return async (dispatch) => {
    try {
      await dispatch(webStorageSliceActions.getSession({
        page : 1,
        keyword : ""
      }))
    } catch (error) {
      console.log(error);
    }
  }
}

function myContentsLocalStorage(movieInfo) {
  return async (dispatch) => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem('myContentsData')) || [];
      const newData = movieInfo.movieDetail;
      localStorageData.push(newData);
      localStorage.setItem('myContentsData', JSON.stringify(localStorageData));

      await dispatch(webStorageSliceActions.getLocalStorage({
        movieInfo : JSON.parse(localStorage.getItem('myContentsData'))
      }));
      
    } catch (error) {
      console.log(error);
    }
  }
}

function getMyContents() {
  return async (dispatch) => {
    try {
      await dispatch(webStorageSliceActions.getLocalStorage({
        movieInfo : JSON.parse(localStorage.getItem('myContentsData'))
      }));
    } catch (error) {
      console.log(error);
    } 
  }
}

export const webStorageAction = { 
  sessionData,
  myContentsLocalStorage,
  getMyContents
};