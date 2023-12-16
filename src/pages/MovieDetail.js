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
import Modal from 'react-bootstrap/Modal';

export const MovieDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [tabKey , setTabKey] = useState('tab1');
  const [modalShow, setModalShow] = useState(false);

  const movieDetail = useSelector((state) => state.movie.movieDetail || {});
  const movieReview = useSelector((state) => state.movie.movieReview || {});
  const movieRecommend = useSelector((state) => state.movie.movieRecommend || {});
  const movieYoutube = useSelector((state) => state.movie.movieYoutube || {});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    dispatch(movieAction.getMovieDetail({id:id}));
    dispatch(movieAction.getMovieReview({id:id}));
    dispatch(movieAction.getMovieRecommend({id:id}));
  },[id,dispatch]);

  const getReview = (e,tabKey) => {
    e.preventDefault();
    if( tabKey === "tab1" ) {
      setTabKey('tab1');
    }else {
      setTabKey('tab2');
    } 
  }

  const openModal = () => {
    setModalShow(true);
    dispatch(movieAction.getMovieYoutube({id:id}));
  }

  return (
    <div style={{background:"black", color:'white',padding: "20px"}}>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <BackgroundImg
              src={movieDetail && movieDetail.poster_path ? 
                `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path}` : 
                "https://cdn2.iconfinder.com/data/icons/admin-tools-2/25/image2-512.png"}
            />
          </Col>
          <Col xs={12} md={6}>
            <BadgeContainer style={{flexWrap: "wrap"}}>
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
              <IconWarp onClick={() => openModal()}>
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
        <Row style={{paddingBottom: "50px"}}>
          <TabContainer>
            <Button variant={tabKey === "tab1"? "primary" : "secondary" }
              style={{flex:"1"}} 
              onClick={(e)=> getReview(e,'tab1')} 
              >리뷰</Button>
            <Button variant={tabKey === "tab2"? "primary" : "secondary"}
              style={{flex:"1"}} 
              onClick={(e)=> getReview(e,'tab2')} 
              >추천</Button>
          </TabContainer>
          {tabKey === "tab1" ? 
            <PanelContainer>
              {movieReview.results && movieReview.results.length > 0 ? 
                movieReview.results && movieReview.results.length > 0 && movieReview.results.slice(0, 5).map((item, idx) => (
                  <Review key={idx} data={item} />
                ))
              : 
              <div style={{display:"flex", justifyContent:"center", padding:"30px"}}>
                <h1>리뷰가 없습니다.</h1>
              </div>
              }
              
            </PanelContainer>  
             : 
            <PanelContainer style={{padding:"30px"}}>
              {movieRecommend.results && movieRecommend.results.length > 0 ? 
                <MovieSlide movies={movieRecommend}/>
              :
                <div style={{display:"flex", justifyContent:"center", padding:"30px"}}>
                  <h1>추천 영화가 없습니다.</h1>
                </div>
              }
              
            </PanelContainer>
           }
        </Row>
        <div>
        <Modal show={modalShow} onHide={()=>setModalShow(false)} dialogClassName="modal-lg" style={{display:"flex"}}>
          <Modal.Header closeButton>
            <Modal.Title>{movieDetail?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {movieYoutube && movieYoutube.results && movieYoutube.results.length > 0 ? (
              <iframe
              width="100%"
              height="615"
              src={`https://www.youtube.com/embed/${movieYoutube.results[0].key}`}
              title="영상" 
              allowFullScreen
            /> ) : null}
          </Modal.Body>
        </Modal>
        </div>
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