import { useNavigate } from "react-router-dom"
import styled from "styled-components"

// 영환 1개의 정보를 movie라는 이름으로 전달받을 것임. 파라미터 props를 아예 구조분해 할당으로 받아서 movie 변수로 받아 사용하기
const Movie= ({movie})=>{   // {}를 통해 props를 구조분해할당!!

    //(실습 6.3) 페이지 전환을 위한 useNaviate() HOOK
    const navigate= useNavigate()

    //(실습 6.3) 카드 요소 클릭 콜백 메소드
    const goMovieDetail= ()=>{
        //페이지 전환 요청
        navigate('./movie/' + movie.id)
    }

    return (
        // <div>
        //     {/* [1] 우선 타이틀만.. */}
        //     <div className="title"> {movie.title} </div>

        //     {/* [2] 확인이 되었다면.. 나머지 [포스터이미지, 개봉년도, 평점, 장르] 표시 [스타일작업을 고려하여 className을 미리 지정]*/}
        //     <div className="poster"><img src={movie.large_cover_image} alt="poster image"></img></div>
        //     <div className="year">{movie.year}년도 개봉작</div>
        //     <div className="rating">평점 : {movie.rating}점</div>
        //     <div className="genres">{ movie.genres.join(', ') }</div>            
        // </div>

        // <Card>
        //     <div className="title"> {movie.title} </div>
        //     <div className="poster"><img src={movie.large_cover_image} alt="poster"></img></div>
        //     <div className="year">{movie.year}년도 개봉작</div>
        //     <div className="rating">평점 : <span>{movie.rating}</span>점</div>
        //     <div className="genres">{ movie.genres.join(', ') }</div>            
        // </Card>

        // (실습6.3) 에서 작업. Card요소 클릭 반응하기
        <Card onClick={ goMovieDetail }>
            <div className="title"> {movie.title} </div>
            <div className="poster"><img src={movie.large_cover_image} alt="poster"></img></div>
            <div className="year">{movie.year}년도 개봉작</div>
            <div className="rating">평점 : <span>{movie.rating}</span>점</div>
            <div className="genres">{ movie.genres.join(', ') }</div>            
        </Card>
    )
}
export default Movie

// [2]번 작업까지 완료되었다면...이제 스타일 작업 시작!! Main.js 부터 차례로...(실습4)작업 시작.

// (실습4 [5]) 스타일 작업 .. 영화정보 1개를 카드모양으로 보여주기 위해 스타일 된 div컴포넌트로 레이아웃 변경
const Card= styled.div`
    //카드모양 스타일
    width: 300px;
    box-sizing: border-box; //width의 사이즈를 경계선까지로 설정 [300px을 Card모양의 너비로 고정하려고..]
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    color: black;
    margin: 1rem .5rem; //기본 최소 마진 확보 - flex로 간격 조정함
    font-size: 12px; //글씨들은 모두 작게
    padding: 1rem 1rem;
    

    //제목 스타일
    .title{
        font-weight: bold;
        font-size: 16px;
        height: 3rem;
        //글씨를 가운데로 위치하기
        display: flex;
        align-items: center;
        justify-content: center;
    }

    //포스터 이미지 스타일
    .poster img{
        width: 70%;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    //개봉년도
    .year {
        padding: .5rem;
    }

    //평점
    .rating {
        padding: .5rem;

        span{ 
            font-weight:bold;
            color: blue;
        }
    }

    //장르
    .genres {
        padding: .5rem;
    }

    //상세 페이지 전환을 할때 Card컴포너트를 클릭하는 것이기에 클릭가능함을 사용자에게 인식하게끔 하기 위해 커서모양을 손가락 모양으로..
    &:hover{
        cursor: pointer;

        //사이즈를 키우는 변환스타일로 선택한 카드요소가 부각되도록
        transform: scale(1.05, 1.05);
        //배경색도 변경하면서 선택효과 추가
        background-color: lightyellow;        
    }

    //스타일 변화가 조금 부드럽게 행해지도록 전환효과
    transition: transform .5s, background-color .5s;
`

// ### 기본 스타일 작업이 완료되면 추가기능 구현 [ 페이지네이션 기능 ] -- MovieList.js에서 작업 (실습5)