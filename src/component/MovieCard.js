import React from 'react'
import Badge from 'react-bootstrap/Badge';

export const MovieCard = ({item}) => {
  console.log(item);
  return (
    <div
      className='card_item'
      style={{
        backgroundImage: "url("+`https://www.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}`+")"
      }}>
        <div className='overlay'> 
          <h1>{item.title}</h1>
          {item.genre_ids && item.genre_ids.length >0 && 
            <div>
              {item.genre_ids.map((id,idx) =>(
                <Badge bg="danger" key={idx}>{id}</Badge>
              ))}
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
