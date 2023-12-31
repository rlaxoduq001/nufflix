import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MovieCard = ({item}) => {
  
  const genreList = useSelector((state) => state.movie.genreList);
  const navigate = useNavigate();

  const showDetail = () => {
    navigate(`/movies/${item.id}`, {state: {item}});
  }
 
  return (
    <div
      className='card_item'
      style={{
        backgroundImage: item.backdrop_path !== null ?
        `url(https://www.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path})` :
        'url(https://icon-library.com/images/none-icon/none-icon-1.jpg)'
      }}

      onClick={() => showDetail()}
      >
        <div className='overlay'> 
          <h1>{item.title}</h1>
          {item.genre_ids && item.genre_ids.length >0 && 
            <div>
              {item.genre_ids.map((id,idx) =>{
                const genre = genreList.find((item) => item.id === id);
                return genre ? (
                  <Badge bg="danger" key={idx}>
                    {genre.name}
                  </Badge>
                ) : null;
              })}
            </div>
          }
          <div>
            <span>{item.vote_average}</span>
            <span>{item.adult?"청불":"Under 18"}</span>
          </div>
        </div>
    </div>
  )
}
