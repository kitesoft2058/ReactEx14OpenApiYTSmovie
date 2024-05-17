import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SyncLoader } from 'react-spinners'
import Cast from './Cast'

const MovieDetail= (props)=>{

    //(실습 6.5 [2]) 영화 상세정보를 저장할 state 변수
    const [movie, setMovie] = useState() //초기값 지정 안함. undefined

    //(실습 6.4) useParams HOOK 을 이용하여 전달받은 url parameter 서브 주소 알아내기
    const params= useParams()

    //(실습 6.5 [1]) 에서 화면이 보여질 때 open api 작업을 위해 useEffect() HOOK
    useEffect( ()=>{
        // 영화상세화면 open api  - url params로 전달받은 영화 id 정보를 요청파라미터로 지정. image와 출연자 정보도 같이 요청 ####################
        const api_url= `https://yts.mx/api/v2/movie_details.json?movie_id=${params.id}&with_images=true&with_cast=true`

        // ~ 일단 글씨로 json 정보를 잘 응답받는지 확인.
        //fetch(api_url).then(res=>res.text()).then(text=>alert(text)).catch(e=>alert(e.message))

        //(실습 6.5 [2]) 개발자 도구의 [network]탭을 통해 json 응답 데이터 구조 파악하기 - movie 한개의 정보를 저장할 state 변수 준비
        fetch(api_url).then(res=>res.json()).then(json=> setMovie(json.data.movie))

    },[] ) //두번째 파라미터 [] - 처음 한번 보여질때만 useEffect HOOK 함수 발동 

    return (
        //스타일 작업을 위해 styled-components 로 만든 스타일이 된 div요소
        <MovieDetailContainer>
            <h2>영화 상세 정보</h2>
            <p className='movie-id'>영화 고유 식별자 id : {params.id}</p>

            {/*(실습 6.5) 영화 id를 이용하여 영화상세정보 open api 작업하여 보여주기 */}
            {/*    [1] 먼저 useEffect() HOOK으로 처음 화면이 보여질때 서버요청 및 응답결과 보여주기 */}
            {/*    [2] json 데이터에서 영화 1개의 정보를 저장할 state 변수 movie 를 만들고 fetch()하여 parsing할 응답 결과 저장 */}
            {/*    [3] 영화를 불러오는 시간이 걸리는 만큼 movie 데이터가 있는지 여부에 따라 로딩이미지/영화정보 표시를 삼항연산자로 구현 */}
            {
                // 로딩 화면 구현은 라이브러리 이용하기 [ 유명한 react loading spinner : https://www.davidhu.io/react-spinners/   $ yarn add react-spinners ]
                movie === undefined ?
                <SyncLoader color='black' style={{margin:'5rem'}}></SyncLoader> : 
                <div className='movie'>
                    <div className='title'>{movie.title}</div>
                    <div className='info'>
                        <div className='year'>개봉:{movie.year}년</div>
                        <div className='rating'>평점:{movie.rating}점</div>
                        <div className='runtime'>런닝타임:{movie.runtime}분</div>
                        <div className='like_count'>좋아요:{movie.like_count}</div>
                    </div>
                    <div className='screenshots-container'>
                        <div className='screenshots'>
                            <img src={movie.large_screenshot_image1}></img>
                            <img src={movie.large_screenshot_image2}></img>
                            <img src={movie.large_screenshot_image3}></img>
                        </div>                        
                    </div>
                    <div className='description'>
                        {movie.description_full}
                    </div>
                    <div className='cast-container'>
                        {
                            movie.cast.map(c=><Cast cast={c} key={c.imdb_code}></Cast>)
                        }
                    </div>




                </div>

            }

            

        </MovieDetailContainer>
    )
}

export default MovieDetail

const MovieDetailContainer= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 90%;
    max-width: 980px;
    margin: 2rem auto;
    //border: 1px dotted red;

    h2{
        font-size: 2rem;
        padding: 1rem;
    }

    .movie-id{
        font-size: 12px;

    }

    .movie{
        width: 100%;
        margin-top: 1rem;

        .title{
            font-size: 24px;
            font-weight: bold;
            padding: .5rem;
            text-align: center;
            margin-top: 2rem;
            margin-bottom: 3rem;
        }

        .info{
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            font-size: 12px;
            font-weight: 500;
            padding: 4px;
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .screenshots-container{

            border: 1px solid gray;
            border-radius: 4px;
            padding: 8px;

            .screenshots{
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                overflow-x: scroll; 
                border-radius: 4px;

                img{
                    width:100%;
                }

                img + img {
                    margin-left: 4px;
                }
            }
        }

        .description{
            margin-top: 8px;
            padding: 8px;
        }

        .cast-container{
            display: flex;
            flex-direction: row;
            width: 100%;
            margin-top: 1rem;
            margin-bottom: 3rem;
        }

        
    }

`