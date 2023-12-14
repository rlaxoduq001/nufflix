import React from 'react';
import styled from 'styled-components';

export const Banner = ({ movie }) => {

  return (
    <BannerWrapper poster={movie.poster_path}>
      <BannerInfo>
        <h1 style={{"color":"white"}}>{movie.title}</h1>
        <p style={{"color":"white"}}>{movie.overview}</p>
      </BannerInfo>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  height: 600px;
  display: flex;
  align-items: center;
  background-image: url(${props => `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.poster}`});
  background-size: cover;

  &::before {
    position: absolute;
    left: 0;
    width: 100%;
    height: 600px;
    content: '';
    background: linear-gradient(to right, black, transparent);
  }
`;

const BannerInfo = styled.div`
  width: 40%;
  margin-left: 30px;
  z-index: 1;
`;
