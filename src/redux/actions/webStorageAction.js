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

export const webStorageAction = { 
  sessionData
};