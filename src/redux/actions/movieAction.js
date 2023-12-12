import api from "../api";
import { movieSliceActions } from "../reducers/MovieReducer";

function getMovies() {
  return async (dispatch) => {
    const popularMovieApi = api.get('/movie/popular');
    const topRatedApi = api.get('/movie/top_rated');
    const upComingApi = api.get('/movie/upcoming');
    
    // 3번의 api 호출을 한꺼번에 하기위해 Promise.all 사용
    let [ popularMovie,topRated,upComing ] = await Promise.all([popularMovieApi,topRatedApi,upComingApi]);
 
    // 액션 생성자에 각각의 데이터를 전달하여 dispatch
    dispatch(movieSliceActions.getMovies({
      popularMovies: popularMovie.data,
      topRatedMovies: topRated.data,
      upComingMovies: upComing.data,
    }));
  }
}

export const movieAction = { getMovies };