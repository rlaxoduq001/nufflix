import React, {useEffect} from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch } from 'react-redux'
import axios from 'axios';

export const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieAction.getMovies());
  },[])

  return (
    <div>
      
    </div>
  )
}
