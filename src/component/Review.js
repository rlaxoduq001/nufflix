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
`