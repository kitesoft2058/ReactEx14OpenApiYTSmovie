import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./Main"
import MovieDetail from "./page/MovieDetail"

// 페이지 이동을 위한 path와 컴포넌트 지정한 Route 등록하는 컴포넌트 - 모든 페이지의 전환 경로와 매칭된 컴포넌트를 제어하는 컴포넌트
const PageRouter = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                {/* root url[ localhost:3000] 으로 접근시에 실행할 컴포넌트를 Main으로 지정 */}
                <Route path="/" element={<Main></Main>}></Route>

                {/* 영화상세 정보 페이지로 전환하는 경로와 영화구별을 위한 id값 url params 로 전달받도록 서브경로(:id) 지정 */}
                <Route path="/movie/:id" element={<MovieDetail></MovieDetail>}></Route>

            </Routes>
        </BrowserRouter>
    )
}
export default PageRouter