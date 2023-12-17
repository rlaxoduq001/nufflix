import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const InfiniteScroll = ({ onIntersect }) => {
  const sentinelRef = useRef(null);
  const isLoading = useSelector((state) => state.movie.isLoading);
  
  useEffect(() => {
    if(isLoading === false) {
      return;
    }
    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 인터섹션(교차)이 발생했을 때 콜백 함수 실행
        if (entry.isIntersecting) {
          onIntersect(); // 인피니티 스크롤 시 새로운 데이터를 불러오는 함수 호출
        }
      });
    });

    // 관찰 대상으로서 sentinelRef를 등록
    observer.observe(sentinelRef.current);

    // 컴포넌트가 언마운트될 때 옵저버 해제
    return () => {
      observer.disconnect();
    };
  }, [onIntersect,isLoading]);

  // Sentinel 엘리먼트는 뷰포트 안에 들어올 때마다 onIntersect 함수가 호출됨
  return <div ref={sentinelRef} style={{padding:"5px"}}></div>;
};
