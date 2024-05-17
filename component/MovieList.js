import styled from "styled-components"
import Movie from "./Movie"
import { useState } from "react"
import Pagination from "./Pagination"

// Main.js에서 parsing한 영화들 정보를 property 로 전달 받을 것임 [함수형 컴포넌트이기에 파라미터로 받음]
const MovieList= (props)=>{

    //(실습5 [1])한 페이지에서 표시할 영화개수 지정값을 저장하기 위한 state 변수
    const [number, setNumber]= useState(9) //초기값 9 개 
    //(실습5 [1/1]) 현재 페이지 번호를 저장하기 위한 state 변수
    const [page, setPage]= useState(1) //초기값 1 페이지

    //페이지 변경할때 ...number 변수의 값을 변경할때 value를 그냥 넣으면 string이 되어 산술 연산이 이상해짐. slice()문제발생 
    console.log(`page : ${page} ${typeof(page)} ,  number: ${number} ${typeof(number)}`  ) 

    return (
        // <div>
        //     <h3>MOVIE LIST</h3>

        //     {/*[1] 파라미터 props에 Main.js로 부터 movies라는 속성으로 전달받는 영화들 배열이 있음. 확인! */}
        //     <p>영화 개수 : {props.movies.length}</p>

        //     {/*[2] 영화개수만큼 반복하며 각 영화의 기본정보들(제목, 포스터이미지, 개봉년도, 평점, 장르) 표시하기 */}
        //     <div>
        //         {
        //             props.movies.map((movie, index)=>{
        //                 //여기서 영화정보 5개를 보여주려면 요소를 5개 만들어야 함.. 이것도 조금 복잡해 보임. 별도의 컴포넌트로 분리
        //                 //Movie 컴포넌트를 만들면서 각 영화1개의 정보 movie전달, map()리스트는 식별용 key속성이 없으면 경고발생함.. 고유식별자로 영화의 id정보를 지정
        //                 return <Movie movie={movie} key={movie.id}></Movie>
        //             })
        //         }
        //     </div>
        // </div>

        // (실습4) 스타일링을 위해 최상위 컴포넌트 및 레이아웃 요소 변경
        // <Container>

        //     <div className="title">
        //         <h3>MOVIE LIST</h3>
        //     </div>

        //     <div className="info">
        //         영화 개수 : { props.movies.length }
        //     </div>

        //     <div className="movies">
        //         {
        //             // 영화배열 개수만큼 반복하며 <Movie>컴포넌트 만들어 리턴. {}의 실행문의 1줄이어서 생략..return키워드도 생략해야 함
        //             props.movies.map( movie => <Movie movie={movie} key={movie.id}></Movie> )
        //         }
        //     </div>
        // </Container>

        // (실습5) [페이지네이션 기능 추가 구현 ( [1]한 페이지에 보여줄 항목 수 지정, [2]페이지 네이션 기능 )]
        <Container>

            <div className="title">
                <h3>MOVIE LIST</h3>
            </div>

            <div className="info">
                한 페이지에 표시할 영화 개수 : &nbsp;
                {/* [1] 선택변경에 따라 UI갱신해야 하기에 state로 선택값을 저장하는 number변수 만들고 값이 변경될때 반응하는 이벤트에 따라 값을 설정 (주의!! input 요소의 value는 무조건 string) */}
                <select onChange={ (e)=> setNumber(parseInt(e.target.value)) } value={number}> {/* 작업 완료 후 number만큼만 보이도록 아래 props.movies.map()부분을 수정 */}
                    <option value={9}>9</option>   {/* 넓은 desktop 브라우저 기준 - 한줄 3개씩 3줄 */}
                    <option value={12}>12</option> {/* 넓은 desktop 브라우저 기준 - 한줄 3개씩 4줄 */}
                    <option value={15}>15</option> {/* 넓은 desktop 브라우저 기준 - 한줄 3개씩 5줄 */}
                    <option value={20}>20</option> {/* 넓은 desktop 브라우저 기준 - 한줄 3개씩 7줄 */}
                    <option value={30}>30</option> {/* 넓은 desktop 브라우저 기준 - 한줄 3개씩 10줄 */}
                </select>
            </div>

            <div className="movies">
                {
                    // [1.2] movies배열의 모든 값을 보여주는 것이 아니라 현재 페이지에서 표시할 수 있는 영화개수(number)만큼 잘라서 보여주기(배열 slice()메소드 활용) - 이를 위해 현재 페이지번호 변수도 필요함
                    //     - 현재페이지에서 보여줄 요소들만 잘라서 보여주기 [ number : 9개 일때]
                    //       1페이지 : 0번 요소 ~ 9번 요소 전까지   [  number*(page-1)  ~ (number*(page-1) + number) ]  
                    //       2페이지 : 9번 요소 ~ 18번 요소 전까지  
                    //       3페이지 : 18번 요소 ~ 27번 요소 전까지 
                    props.movies.slice( number*(page-1), (number*(page-1) + number) ).map( movie => <Movie movie={movie} key={movie.id}></Movie> )
                }
            </div>

            {/* [2] 페이지 네이션 기능 */}
            <div className="pagination">
                {/* 총 영화 개수(movies.length), 한 페이지당 영화개수(number), 현재 페이지 번호(page)를 기반으로 계산하여 페이지 버튼들을 만들어야 해서 다소 코딩이 필요. 이곳에서 하면 복잡. 별도의 컴포넌트로 제작 */}
                {/* <Pagination total={props.movies.length} number={number} page={page}></Pagination> */}

                {/* 위 작업 끝나고 클릭하면 페이지번호 변경하는 setPage()함수로 Pagination컴포넌트에 전달 */}
                <Pagination total={props.movies.length} number={number} page={page} setPage={setPage}></Pagination>

            </div>
        </Container>

        //(실습6) 영화 Movie컴포넌트 클릭하면 해당 영화의 상세정보를 보여주는 페이지로 이동  [ react-router-dom 라이브러리 ]
        //  [6.1] $ npm install react-router-dom
        //  [6.2] Route 경로와 컴포넌트를 등록하는 Routes 요소를 가지는 PageRouter.js 컴포넌트 만들고 최상위 요소로 <BrowserRouter>를 배치하고 Main.js와 MovieDetail.js Route 등록
        //  [6.3] index.js에서 <Main>컴포넌트를 <PageRouter>컴포넌트로 변경하기
        //  [6.3] Movie.js에서 클릭하면 페이지 전환하기. <Link>요소를 적용하기에는 이미 스타일까지 마친 상태이기에 Card컴포넌트의 onClick이벤트에 의해 페이지 전환되도록 useNavigate HOOK 적용
        //  [6.4] MovieDetail.js로 전환하면서 상세정보 open api 에서 요구하는 영화 id값을 :id 서브경로 url parameter 로 전달
        //  [6.5] MovieDetail.js에서 useParams() HOOK 을 통해 전달된 id값 얻어와 영화상세 정보 open api 요청.하고 응답결과 보여주기
    )
}

export default MovieList

//(실습4 [4]) 에서 작업할 스타일링된 컴포넌트 만들기
const Container= styled.div`
    //제목 영역에 패딩 적용
    .title{ padding: 0.5rem 1rem; }
    //영화리스트 정보 표시 영역 -- sort 순서 변경 select 콤보박스 기능 추가 [좋아요순, 평점순, 최신등록순]
    .info{ padding: 0.5rem 1rem; }

    //영화 정보 표시 영역
    .movies{
        width: 100%;
        margin-top: 1rem;
        //border: 1px dotted red; //작업 중 가이드 라인으로..

        // Movie용 컴포넌트(Card)의 배치를 유연하게 제어하기 위해 flex 스타일 적용
        display: flex;
        flex-direction: row; //가로 방향 배치

        // 자식요소가 많아서 부모 요소의 크기를 넘어가는 상황이 되면 자동 줄바꿈. [ 화면 너비에 따라 3개, 2개, 1개로 반응하며 배치됨 ]
        flex-wrap: wrap;
        // 자식요소들간의 간격을 가로정렬로 적용하기. [가로배치일때 가로정렬 justify-content]
        justify-content: space-evenly; //컴포넌트 사이사이 간격이 동일하게
    }


    //(실습5) 에서 추가
    .info{
        padding: 0.5rem 1rem;

        select{
            padding: 0.5rem 1rem;

            appearance: none;  //v 표시 제거
            font-size: 1rem;
            font-weight: 500;
            color: #333333;
            border: 1px solid #aaaaaa;
            border-radius: 5px;            
        }
    }


    //(실습5 [2])에서 추가
    .pagination {
        margin: 3rem 0;
        text-align: center;
    }
    

`

