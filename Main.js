import { useEffect, useState } from "react"
import MovieList from "./component/MovieList"

//[실습4]에서 추가
import styled from 'styled-components'

const Main= ()=>{

    // ## YTS 영화 토렌트 사이트 OPEN API (별도의 키발급 없이 자료 요청 가능) : https://yts.mx/api#list_movies [기본 API 명세서 사이트] ###
    
    // 전    체 리스트 : https://yts.mx/api/v2/list_movies.json?  */}

    // sort_by : title, year, rating, peers, seeds, download_count, like_count, date_added */}
    // 1)다운로드순 리스트 : https://yts.mx/api/v2/list_movies.json?sort_by=download_count */}
    // 2)좋아요 순 리스트 : https://yts.mx/api/v2/list_movies.json?sort_by=like_count */}
    // 3)최신등록순 리스트 : https://yts.mx/api/v2/list_movies.json?sort_by=date_added */}
    // 4)평점 수 리스트 : https://yts.mx/api/v2/list_movies.json?sort_by=rating */}

    // * yts open api 다운로드(인기) 순 리스트 end-point url **
    const apiUrl='https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=1&limit=50'

    // (실습1 [2])에서 추가.  영화정보들을 저장할 배열 state HOOK
    const [ movies, setMovies ] = useState(null) //초기값 null (안쓰면 기본 null)

    // (실습1)에서 추가.  Main컴포넌트가 화면에 render 될때 자동으로 발동하는 useEffect HOOK - 파라미터로 전달한 함수가 자동발동함 
    useEffect(()=>{ 
        //alert() //useEffect 동작 확인
        
        // [1] json 요청 --- 일단, json 데이터를 가져오는지 글씨로 받아보기..
        //fetch(apiUrl).then(res=>res.text()).then(text=>alert(text)).catch(error=>alert(error.message))

        // [2] json parsing하여 state변수인 movies 에 저장하기 -- 응답데이터 json object 에서 영화정보들 배열 데이터만 받기
        //  * 개발자 도구 F12 에서 [network]탭을 보면 요청한 fetch에대한 정보를 볼수 있음. 
        //  * 요청이 성공했다면.. list_movies.json?... 라는 이름이 보임. 클릭하면.. 여러정보가 보이며 이 중 [response] 항목을 보면 json 구조를 파악할 수 있음
        //  * 영화정보들은 "data"라는 프로퍼티안에 "movies"라는 프로퍼티에 배열로 있으며. 그 배열의 각 요소들이 영화1개의 정보들임. 이 영화정보들을 state에 설정하여 화면에 보이도록 구현..
        fetch(apiUrl).then(res=>res.json()).then(json=>setMovies(json.data.movies)).catch(e=>alert(e.message))    

        // (문제발생!!) useEffect가 계속 실행되어..네트워크 요청이 계속됨..
        // why? useEffect HOOK은 화면이 처음보여질때와 새로고침될때도 발동함. 
        // 위 fetch요청을 보면 setMovies()라는 state변경 설정함수로 인해 화면이 자동갱신되고 그럼으로 인해 또다시 useEffect()가 발동함
        // 해결방법 : useEffect() HOOK의 두번째 파라미터에 빈 배열[]을 넣으면 useEffect() 처름 한번만 호출되고 화면갱신할때는 발동하지 않음. 
    },[]) //[]의 역할 주의!!!

    return (
        // <div>
        //     <h1>OPEN API 영화정보</h1>

        //     {/* (실습1) 처음 화면이 보여질때 영화정보 open api 받아오기 - useEffect HOOK */}

        //     {/* (실습2) 읽어온 영화정보를 보여주기 - 단, 페이지 로딩에 시간이 걸리기에.. state movie변수가 null이면 로딩중 표시를 보여주고 데이터가 있으면..UI를 그리도록.. 삼항연산자 */}
        //     {
        //         // movies ? <p>영화 개수 : {movies.length}</p> : <p>LOADING..........</p>
        //     }

        //     {/* (실습3) 영화 개별 정보들 중 [ 제목, 포스터 이미지, 개봉년도, 평점, 장르 ] 정보 보여주기 ~ 나머지 정보들은 클릭하면 상제화면으로 이동하여 제공할 예정 */}
        //     {/*    영화가 한개가 아니기에 배열.map()을 사용하여 영화정보들을 그려낼것임. 단, 이곳에서 이 코드를 다 쓰면 지저분..별도의 MovieList컴포넌트를 제작하여 배치. 로딩 중 화면도 마찬가지로 별도의 컴포넌트로 만들길 권장. [별도의 component폴더 안에 제작]*/}
        //     {
        //         // state에 있는 영화배열 정보를 MovieList컴포넌트에 속성으로 전달
        //         movies ? <MovieList movies={movies}></MovieList> : <p>LOADING.......</p>
        //     }

        //     {/* ## 리액트 웹앱의 제작방식 특징! 컴포넌트 단위로 화면을 완성하는 방식 : 이 부분에 대한 느낌을 학습!! ######## */}            
        // </div>

        // (실습4) 스타일 입히기.... 큰것부터 작은 컴포넌트 단위로... [스타일 적용방법은 이전에 SCSS를 사용했으니..요즘 많이 사용되는 styled-component로 만들어보기] */}
        //   [0] styled-component library 설치  [ $ npm install styled-components   or   yarn add styled-components] */}
        //   [1] styled-component library 적용  [ import styled from 'styled-components' ] */}
        //   [2] index.css에서 모든요소들의 기본 패딩,마진 제거  */}
        //   [3] Main.js의 최상위 요소 <div>를 스타일이 적용된 component요소로 만들면서.. 자식요소들을 스타일을 적용하기 위한 레이아웃 구조로 변경   */}
        //   [4] MovieList.js의 최상위 요소 <div>를 스타일이 적용된 component요소로 만들면서.. 자식요소들을 스타일을 적용하기 위한 레이아웃 구조로 변경   */}
        //   [5] Movie.js의 최상위 요소 <div>를 스타일이 적용된 component요소로 만들면서.. 자식요소들을 스타일을 적용하기 위한 레이아웃 구조로 변경   */}
        <Root> 
            
            <header>
                <h1>영화정보 OPEN API</h1>
            </header>            

            <main className="main">
                {
                    movies ? <MovieList movies={movies}></MovieList> : <p>LOADING .......... </p>
                }
            </main>

        </Root>
    )
}

export default Main

// (실습4 [3])에서 적용할 스타일이 적용된 div 컴포넌트(최상위로 배치) 
const Root= styled.div`
    background-color: black;
    min-height: 100%;   //이게 적용되려면.. index.css에서 html,body,#root 요소 모두 height이 100% 여야 함
    color: white;
    text-align: center;
    padding: 2rem;
    background-image: url('https://raw.githubusercontent.com/light9639/Netflix/main/img/netflix-background-black.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    //영화 목록들이 보여지는 영역의 너비와 마진 지정
    .main{
        width: 80%;
        max-width: 980px;
        margin: 2rem auto;
    }
    
`