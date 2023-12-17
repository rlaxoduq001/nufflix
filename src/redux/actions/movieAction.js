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

function getMovieDetail({id}) {
  return async (dispatch) => {
    try {
      const movieDetailApi = await api.get(`/movie/${id}?language=ko&region=KR`);

      dispatch(movieSliceActions.getMovieDetail({
        movieDetail:movieDetailApi.data,
      }));
      
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
  console.log(data);
  return async (dispatch) => {
    try {
      const movieSearchApi = await api.get(`https://api.themoviedb.org/3/search/movie?query=${data.keyword}&include_adult=false&language=ko&region=KR&page=${data.page}`);
      dispatch(movieSliceActions.getMovieSearch({
        movieSearch: movieSearchApi.data
      }))
    } catch (error) {
      console.log(error);
    }
  }
}

export const movieAction = { 
  getMovies, 
  getMovieDetail, 
  getMovieReview, 
  getMovieRecommend, 
  getMovieYoutube,
  getMovieSearch
};