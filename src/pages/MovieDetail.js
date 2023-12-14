import React, {useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup,faFire,faHandcuffs,faVideo } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { Review } from '../component/Review';
import { MovieSlide } from '../component/MovieSlide';

export const MovieDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [tabKey , setTabKey] = useState('tab1');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const movieDetail = useSelector((state) => state.movie.movieDetail);
  const movieReview = useSelector((state) => state.movie.movieReview);
  const movieRecommend = useSelector((state) => state.movie.movieRecommend);

  useEffect(() => {
    dispatch(movieAction.getMovieDetail({id:id}));
    if(tabKey === "tab1") {
      dispatch(movieAction.getMovieReview({id:id}));
    }else {
      dispatch(movieAction.getMovieRecommend({id:id}));
    } 
  },[id,tabKey]);

  const getReview = (tabKey) => {
    setIsButtonDisabled(true);
    if( tabKey === "tab1" ) {
      setTabKey('tab1');
    }else {
      setTabKey('tab2');
    }
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000);
  }

  return (
    <div style={{background:"black", color:'white',padding: "20px"}}>
      <Container>
        <Row>
          <Col>
            <BackgroundImg
              src={movieDetail ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetail?.poster_path}`: ""}
            />
          </Col>
          <Col>
            <BadgeContainer>
              {movieDetail.genres?.map((item,idx) => (
                <Badge style={{ fontSize: '1.5em', padding: '0.5em' }} bg="danger" key={idx}>
                 {item.name}
                </Badge>
              ))}
            </BadgeContainer>
            <ContentContainer>
              <h1><b>{movieDetail?.title}</b></h1>
            </ContentContainer>
            {movieDetail?.tagline ? 
              <ContentContainer>
                <h3>{movieDetail?.tagline}</h3>
              </ContentContainer> : null
            }
            <BorderLine/>
            <ContentContainer style={{display:"flex", gap:"30px" }}>
              <IconWarp>
                <FontAwesomeIcon icon={faFire} style={{color: "red"}}/> {movieDetail?.vote_average} 
              </IconWarp>
              <IconWarp>
                <FontAwesomeIcon icon={faPeopleGroup} style={{color: "gray"}}/> {movieDetail?.popularity} 
              </IconWarp>
              <IconWarp>
                <FontAwesomeIcon icon={faHandcuffs} style={{color: "darkgray"}}/> {movieDetail?.adult ? "청불":"under 19" }
              </IconWarp>
              <IconWarp>
                <FontAwesomeIcon icon={faVideo} /> 트레일러 재생
              </IconWarp>
            </ContentContainer>
            <ContentContainer>
            <Badge  style={{ fontSize: '1.1em', width:"100px", marginRight:"6px", marginBottom: "6px"}}
                    bg="danger"> 영화 시간</Badge>
              <span>{movieDetail?.runtime}분</span>
            <br></br>
            <Badge  style={{ fontSize: '1.1em', width:"100px", marginRight:"6px"}}
                    bg="danger"> 개봉일</Badge>
               <span>{movieDetail?.release_date}</span>
            </ContentContainer>
            <BorderLine/>
            <ContentContainer>
              {movieDetail?.overview}
            </ContentContainer>
          </Col>
        </Row>
        <Row>
          <TabContainer>
            <Button variant={tabKey === "tab1"? "primary" : "secondary" }
              disabled={isButtonDisabled}
              style={{flex:"1"}} 
              onClick={()=> getReview('tab1')} 
              >리뷰</Button>
            <Button variant={tabKey === "tab2"? "primary" : "secondary"}
              disabled={isButtonDisabled}
              style={{flex:"1"}} 
              onClick={()=> getReview('tab2')} 
              >추천</Button>
          </TabContainer>
          {tabKey === "tab1" ? 
            <PanelContainer>
              {movieReview.results && movieReview.results.length > 0 ? 
                movieReview.results && movieReview.results.length > 0 && movieReview.results.slice(0, 5).map((item, idx) => (
                  <Review key={idx} data={item} />
                ))
              : 
              <div style={{display:"flex", justifyContent:"center"}}>
                <h1>리뷰가 없습니다</h1>
              </div>
              }
              
            </PanelContainer>  
             :
            <PanelContainer style={{padding:"30px"}}>
              ${movieRecommend.results && movieRecommend.results.length <= 0 ? '업성':<MovieSlide movies={movieRecommend}/>}
              
            </PanelContainer>
           }
        </Row>
      </Container>
    </div>
  )
}

const PanelContainer = styled.div`
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding-top: 30px;
`
const BackgroundImg = styled.img`
  width: 100%;
  height: 600px;
  object-fit: contain;
`
const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom : 16px;
`;
const ContentContainer = styled.div`
  padding-bottom : 16px;
`;
const IconWarp = styled.div`
  font-size: 20px;
`;
const BorderLine = styled.div`
  border: 1px solid;
  margin: 20px 0px;
`