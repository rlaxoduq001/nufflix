import api from "../api";
import { movieSliceActions } from "../reducers/MovieReducer";

function getMovies() {
  return async (dispatch) => {
    try {

      const popularMovieApi = api.get('/movie/popular?language=ko&region=KR');
      const topRatedApi = api.get('/movie/top_rated?language=ko&region=KR');
      const upComingApi = api.get('/movie/upcoming?language=ko&region=KR');
      const genreApi = api.get('/genre/movie/list?language=ko&region=KR');

      // 3번의 api 호출을 한꺼번에 하기위해 Promise.all 사용
      let [ popularMovie,topRated,upComing,genreList ] = await Promise.all([popularMovieApi,topRatedApi,upComingApi,genreApi]);
      
      // 액션 생성자에 각각의 데이터를 전달하여 dispatch
      dispatch(movieSliceActions.getMovies({
        popularMovies: popularMovie.data,
        topRatedMovies: topRated.data,
        upComingMovies: upComing.data,
        genreList : genreList.data.genres
      })); 
    } catch (error) {
      console.log(error);
    }
  }
}

function getGenres() {
  return async (dispatch) => {
    try {
      const genreApi = api.get('/genre/movie/list?language=ko&region=KR');

      dispatch(movieSliceActions.getGenres({
        genreList : genreApi.data.genres
      })); 
    } catch (error) {
      console.log(error);
    }
  }
}

function getMovieDetail({id}) {
  return async (dispatch) => {
    try {
      const movieDetailApi = await api.get(`/movie/${id}?language=ko&region=KR`);

      dispatch(movieSliceActions.getMovieDetail({
        movieDetail:movieDetailApi.data,
      }));
      
      // detail 데이터 최근본영화에 뿌려주기 위해 넣기
      const localStorageData = JSON.parse(localStorage.getItem('myLocalStorageData')) || [];
      const newData = movieDetailApi.data;
      
      // 중복된 데이터 확인
      const isDuplicate = localStorageData.some(item => item.id === newData.id);
      
      if (!isDuplicate) {
        localStorageData.push(newData);
        if (localStorageData.length > 6) {
          localStorageData.shift();
        }
        localStorage.setItem('myLocalStorageData', JSON.stringify(localStorageData));
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}

function getMovieReview(id) {
  return async (dispatch) => {
    try {
      const movieReviewApi = await api.get(`/movie/${id.id}/reviews?`);

      dispatch(movieSliceActions.getMovieReview({
        movieReview:movieReviewApi.data,
      }));

    } catch (error) {
      console.log(error);
    }
  }
}

function getMovieRecommend(id) {
  return async (dispatch) => {
    try {
      const movieRecommendApi = await api.get(`/movie/${id.id}/recommendations?language=ko&region=KR`);
      dispatch(movieSliceActions.getMovieRecommend({
        movieRecommend:movieRecommendApi.data
      }));
    } catch (error) {
      console.log(error);
    }
  }
}

function getMovieYoutube(id) {
  return async (dispatch) => {
    try {
      const movieYoutubeApi = await api.get(`/movie/${id.id}/videos`);
      dispatch(movieSliceActions.getMovieYoutube({
        movieYoutube:movieYoutubeApi.data
      }))
      console.log(movieYoutubeApi.data);
    } catch (error) {
      console.log(error);
    }
  }
}

function getMovieSearch(data) {
  return async (dispatch) => {
    try {
      const movieSearchApi = await api.get(`https://api.themoviedb.org/3/search/movie?query=${data.keyword}&include_adult=false&language=ko&region=KR&page=${data.page}`);
      dispatch(movieSliceActions.getMovieSearch({
        movieSearch: movieSearchApi.data,
        data : data
      }))
    } catch (error) {
      console.log(error);
    }
  }
}

export const movieAction = { 
  getMovies, 
  getGenres,
  getMovieDetail, 
  getMovieReview, 
  getMovieRecommend, 
  getMovieYoutube,
  getMovieSearch
};