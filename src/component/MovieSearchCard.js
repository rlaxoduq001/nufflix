import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
export const MovieSearchCard = () => {
  return (
    
    <div className='test2'>
      <div className='test' style={{
        backgroundImage : "url('https://image.tmdb.org/t/p/w300_and_h450_bestv2//7Bd4EUOqQDKZXA6Od5gkfzRNb0.jpg')"
        // backgroundImage: item.backdrop_path !== null ?
        // `url(https://www.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path})` :
        // 'url(https://icon-library.com/images/none-icon/none-icon-1.jpg)'
      }}>
        <span className='closeButton'>⨉</span>
      </div>
      <div style={{background:"darkGray", padding: "8px"}}>
        <h5>책 제목</h5>
        <h6>평점</h6>
        <Button variant="light" style={{ fontSize: '12px', padding: "4px", margin:"4px"}}>액션</Button>
        <Button variant="light" style={{ fontSize: '12px', padding: "4px", margin:"4px"}}>로맨스</Button>
        <Button variant="light" style={{ fontSize: '12px', padding: "4px", margin:"4px"}}>공포</Button>
      </div>
    </div>
    
  )
}
