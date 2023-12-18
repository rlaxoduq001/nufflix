import React, { useCallback, useState, useEffect } from 'react'
import { MovieSearchCard } from '../component/MovieSearchCard'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InfiniteScroll } from '../component/InfiniteScroll';

export const Search = () => {
  const dispatch = useDispatch();
  const [ searchKeyword, setSearchKeyword ] = useState('');
  const [ searchPage , setSearchPage ] = useState(1);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [recentMovie , setRecentMovie] = useState([]); // 최근 본 영화 가져오기
  const movieSearch = useSelector((state) => state.movie.movieSearch || {});
  
  const handleInputChange = (keyword) => {
    setSearchKeyword(keyword);
    sessionStorage.setItem('searchKeyword', keyword);
    setSearchPage(1);
    sessionStorage.setItem('page', 1);
  }

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      setSearchPage(1);
      dispatch(movieAction.getMovieSearch({ keyword: keyword, page : searchPage ,more: false }));
    }, 300),
    [dispatch]
  );

  // 새로고침시 데이터 유지
  // useEffect(() => {
  //   const storedKeyword = sessionStorage.getItem('searchKeyword');
  //   const storedPage = sessionStorage.getItem('page');
  //   if (storedKeyword) {
  //     setSearchKeyword(storedKeyword);
  //   }
  //   if (storedPage) {
  //     setSearchPage(parseInt(storedPage, 1));
  //   }
  // }, []);
  
  
  const handleIntersect = () => {
    // 여기에서 새로운 페이지의 데이터를 불러오는 함수 호출
    if( loading  || sessionStorage.getItem('page') > movieSearch.total_pages ) {
      console.log('Intersection skipped');
      return;
    }else {
      setLoading(true);
      const nextPage = Number(sessionStorage.getItem('page')) + 1;
      dispatch(movieAction.getMovieSearch({ keyword: sessionStorage.getItem('searchKeyword'), page : nextPage, more: true }));

      sessionStorage.setItem('page', nextPage);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if( searchKeyword === "") {
      setRecentMovie(JSON.parse(localStorage.getItem('myLocalStorageData')));
      return;
    }
    debouncedSearch(searchKeyword);
  }, [searchKeyword, debouncedSearch]);
  
  return (
    <Container>
      <SearchContainer>
        <SearchInput onChange={(e) => handleInputChange(e.target.value)} 
        
        value={sessionStorage.getItem('searchKeyword')}
        />

      {sessionStorage.getItem('searchKeyword') === "" ? 
          <div>
            <h1>최근 본 영화</h1>
            <Row>
              {recentMovie && recentMovie.reverse().map((item, key) => (
                  <Col key={key} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <MovieSearchCard item={item}/>
                  </Col>
              ))}
            </Row>
          </div>
        :
        <div>
          <Row>
            {movieSearch.results && movieSearch.results.map((item, key) => (
              <Col key={key} xs={12} sm={6} md={4} lg={3} xl={2}>
                <MovieSearchCard item={item}/>
              </Col>
            ))}
          </Row>
         <InfiniteScroll onIntersect={handleIntersect} />
        </div>
        }
      </SearchContainer>
    </Container>
  )
}

const SearchContainer = styled.div`
  display: flex;
  padding: 32px;
  height: 200px;
  flex-direction: column;
`
const SearchInput = styled.input`
  display: block;
  flex: 1;
  font-size: 80px;
  margin: auto;
  max-width: 100%;
  width: 100%;
  border-radius: 100px;
  padding: 30px;
`