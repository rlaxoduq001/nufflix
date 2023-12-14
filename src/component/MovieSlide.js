import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MovieCard } from './MovieCard';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

export const MovieSlide = ({movies}) => {
  return (
    <div>
      {movies && movies.results && movies.results.length > 0 &&
        <Carousel responsive={responsive}>
        {movies.results.map( (item,idx) => (
          <MovieCard key={idx} item={item}/>
        ))}
        </Carousel>
      }
    </div>
  )
}
