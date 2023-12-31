import React, {useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch, useSelector } from 'react-redux'
import { Banner } from '../component/Banner';
import { MovieSlide } from '../component/MovieSlide';
import { webStorageAction } from '../redux/actions/webStorageAction';
export const Home = () => {

  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies } = useSelector((state) => state.movie);
  // const sessionData = useSelector((state) => state.movie.sessionData || {});
  useEffect(() => {
    dispatch(movieAction.getMovies());
    dispatch(webStorageAction.sessionData());
  },[]);

  return (
    <div className='home_container'>
      { popularMovies.results && <Banner movie={popularMovies.results[0]} /> }
      <div className='item_list'>
        <h1>인기 영화</h1>
        <MovieSlide movies={popularMovies}/>
      </div>
      <div className='item_list'>
        <h1>최신 영화</h1>
        <MovieSlide movies={topRatedMovies}/>
      </div>
      <div className='item_list'>
        <h1>개봉 영화</h1>
        <MovieSlide movies={upComingMovies}/>
       </div>
    </div>
  )
  
}
