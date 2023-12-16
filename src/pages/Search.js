import React from 'react'

export const Search = () => {
  return (
    <div style={{
      display: "flex",
      padding: "32px",
      height: "200px",
      textAlign: "center"
    }}>
      <input style={{
            display: "block",
            flex: "1",
            fontSize: "80px",
            margin: "auto",
            maxWidth: "100%", // 최대 너비 설정
            width: "100%",    // 너비를 부모 요소에 맞춤
      }}></input>
  
    </div>
  )
}
