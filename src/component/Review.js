import React, { useEffect } from 'react'
import styled from 'styled-components'

export const Review = ({data}) => {

  return (
    <ReviewContainer>
      <div>
        <h3>{data.author}</h3>
        <p>{data.content}</p>
      </div>
    </ReviewContainer>
  )
}

const ReviewContainer = styled.div`
  border: 1px solid white;
  padding: 32px;
  overflow-wrap: anywhere;
  overflow-y: auto; /* 세로 스크롤바를 추가하여 텍스트를 아래로 스크롤 가능하게 함 */
  max-height: 300px;
`