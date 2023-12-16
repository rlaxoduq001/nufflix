import React from 'react'
import { MovieSearchCard } from '../component/MovieSearchCard'

export const Search = () => {
  return (
    <div style={{
      display: "flex",
      padding: "32px",
      height: "200px",
      flexDirection: "column"
    }}>
      <input style={{
            display: "block",
            flex: "1",
            fontSize: "80px",
            margin: "auto",
            maxWidth: "100%", // 최대 너비 설정
            width: "100%",    // 너비를 부모 요소에 맞춤
            borderRadius: "100px"
      }}></input>

      <div>
        <h1>최근 검색어</h1>
        {/* <div style={{width: "300px", height:"400px"}}> */}
          <MovieSearchCard/>
        {/* </div> */}
      </div>
      {/* <div>
        <h1>인기영화</h1>
      </div>

      <div>인기 검색 카드 or 검색</div> */}
    </div>
  )
}
