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
  isLoading: false
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
      console.log(action.payload.data.more);

      // 인피니티 스크롤일때 검색
      if(action.payload.data.more === true ) {
        state.movieSearch = { 
          ...state.movieSearch,
          ...action.payload.movieSearch ,
          results: [...state.movieSearch.results, ...action.payload.movieSearch.results]
        };
        console.log(state.movieSearch);
      // 일반 검색일때 검색
      }else {
        state.movieSearch = action.payload.movieSearch;
        console.log(state.movieSearch);
      }
      state.isLoading = true;
    }
  }
}) 

export const movieSliceActions = movieSlice.actions;
export default movieSlice.reducer;
