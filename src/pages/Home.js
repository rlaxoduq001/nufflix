import React, {useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch, useSelector } from 'react-redux'
import { Banner } from '../component/Banner';
import { MovieSlide } from '../component/MovieSlide';

export const Home = () => {

  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  },[]);

  return (
    <div className='home_container'>
      { popularMovies.results && <Banner movie={popularMovies.results[0]} /> }
      <div className='item_list'>
        <h1>Popular Movie</h1>
        <MovieSlide movies={popularMovies}/>
      </div>
        <div className='item_list'>
      <h1>Top reted Moive</h1>
      <MovieSlide movies={topRatedMovies}/>
      </div>
        <div className='item_list'>
      <h1>Upcoming Movies</h1>
      <MovieSlide movies={upComingMovies}/>
       </div>
    </div>
  )
  
}
