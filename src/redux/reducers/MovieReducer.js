import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upComingMovies : {},
  genreList: [],
  movieDetail : {},
  movieReview : {},
  movieRecommend: {},
  movieYoutube: {},
  movieSearch: {
    results : []
  },
  movieSearchTest : [],
  isLoading: false,
  sessionData : {}
}
 
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: { 
    getMovies(state, action) {
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
      state.upComingMovies = action.payload.upComingMovies;
      state.genreList = action.payload.genreList;
    },
    getMovieDetail(state, action) {
      state.movieDetail = action.payload.movieDetail;
    }, 
    getMovieReview(state, action) {
      state.movieReview = action.payload.movieReview;
    },
    getMovieRecommend(state, action) {
      state.movieRecommend = action.payload.movieRecommend;
    },
    getMovieYoutube(state, action) {
      state.movieYoutube = action.payload.movieYoutube;
    },
    getMovieSearch(state, action) {
      // 인피니티 스크롤일때 검색
      if(action.payload.data.more === true ) {
        state.movieSearch = { 
          ...state.movieSearch,
          ...action.payload.movieSearch ,
          results: [...state.movieSearch.results, ...action.payload.movieSearch.results]
        };
      // 일반 검색일때 검색
      }else {
        state.movieSearch = action.payload.movieSearch;
      }
      state.isLoading = true;
    },
    getSession(state,action) {
      state.sessionData = {
        page : sessionStorage.setItem('page', action.payload.page),
        keyword : sessionStorage.setItem('searchKeyword', action.payload.keyword)
      }
    }
  }
}) 

export const movieSliceActions = movieSlice.actions;
export default movieSlice.reducer;
