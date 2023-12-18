import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { MovieSearchCard } from '../component/MovieSearchCard';
import { webStorageAction } from '../redux/actions/webStorageAction';

export const MyContents = () => {
  
  const dispatch = useDispatch();
  const mycontentsData = useSelector((state) => state.webStorage.localStorageData);

  useEffect(() => {
    dispatch(webStorageAction.getMyContents());
  },[dispatch])
  
  return (
    <Container>
      <Row>
        {mycontentsData && mycontentsData.map((item,idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MovieSearchCard item={item}/>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
