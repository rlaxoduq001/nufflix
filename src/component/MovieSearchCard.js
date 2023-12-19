import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Badge from 'react-bootstrap/Badge';
import { useDispatch } from 'react-redux';
import { webStorageAction } from '../redux/actions/webStorageAction';

export const MovieSearchCard = (item) => {
  const movieItems = item.item;
  const navigate = useNavigate();
  // const [checkMyContent, setCheckMyContent] = useState(false);

  const showDetail = () => {
    navigate(`/movies/${movieItems.id}`, {state: {movieItems}});
  }
  const genreList = useSelector((state) => state.movie.genreList);

  // const addMycontent = (e) => {
  //   e.stopPropagation();

  //   setCheckMyContent((prevCheckMyContent) => !prevCheckMyContent);
  // }

  // useEffect(()=> {
  //   const storedData = JSON.parse(localStorage.getItem('myLocalStorageData')) || [];
  //   console.log(storedData);
  // },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding : "4px 0" }}
        onClick={() => showDetail()}>
      <div style={{ flex: 1 }}>
        <img
          src={item.item.backdrop_path !== null
            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/` + item.item.poster_path
            : `https://icon-library.com/images/none-icon/none-icon-1.jpg`
          }
          style={{ maxWidth: '100%', height: '100%' }}
          alt="img"
        />
      </div>

      <div style={{ background: 'currentColor', padding: '8px' }}>
        <h5 style={{ color: 'white', marginBottom: '4px', fontSize: '16px' }}>
          {item.item.title}
        </h5>
        <h6 style={{ color: 'white', marginBottom: '4px', fontSize: '14px' }}>
          ❤{item.item.vote_average}
        </h6>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

          {item.item.genres && item.item.genres.map((item, idx) => (
            <Badge key={idx} variant="secondary" style={{ fontSize: '12px', padding: '4px', margin: '4px' }}>
              {item.name}
            </Badge>
          ))}

          {item.item.genre_ids && item.item.genre_ids.map((id, idx) => {
            const genre = genreList.find((item) => item.id === id)
            return genre ? (
              <Badge bg="info" key={idx} style={{ fontSize: '12px', padding: '4px', margin: '4px' }}>
                {genre.name}
              </Badge>
            ) : null;
          })}
        </div> 
        {/* <div>
          {checkMyContent === false? 
            <Button variant="success" style={{fontSize: '15px', width: "100%", marginTop: "4px"}}
              onClick={(e) => addMycontent(e)}>
              My content add
            </Button>
          :
          <Button variant="danger" style={{fontSize: '15px', width: "100%", marginTop: "4px"}}>
            My content remove
          </Button>
          }
        </div> */}
      </div>
    </div>

  )
}
