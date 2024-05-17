import styled from "styled-components"

//총 영화개수, 한페이당 영화개수, 페이지를 프로퍼티로 전달받아 .. 만들어야 할 버튼의 개수 계산하여 그리기.. [setPage]함수는 마지막에 전달받아 작업...
const Pagination= ({total, number, page, setPage})=>{ //props 객체로 받으면 값들을 사용할 때 props. 을 매번 사용해야 해서 짜증.. 그래서 구조분해할당으로 받기

    //[1] 파라미터로 받은 총개수와 페이지당 영화개수 정보를 기반으로 그려낼 버튼의 개수 계산 
    const button_count= Math.ceil(total/number) //영화개수는 1개 이상 임. [0이면.. Infinity..이지만.. open api에서 0개를 주는 경우는 없음]

    //[2.2] 버튼 개수만큼의 길이를 가진 배열 만들기
    // let numbers= Array(button_count) // 배열 생성자에 파라미터를 1개만 넣으면 요소의 개수를 지정하게되며 요소들은 빈 값인 배열을 줌
    // //console.log(numbers) // 콘솔로 출력하면 배열임을 알 수 있음.

    // //요소들에 값을 간단하게 채우는 기능 fill()
    // numbers= numbers.fill() //파라미터 없으면 nudefined로 채워짐
    // //console.log(numbers)

    // numbers= numbers.fill(10) //값을 1개 주면 모두 같은 값으로 채워짐 
    // //console.log(numbers)

    // numbers= numbers.fill({}) //객체들로 체울수도 있음.
    // console.log(numbers)
    
    // 순차적인 번호로 대입되는 번호를 가진 배열을 만들고 싶다면...
    const numbers= Array(button_count).fill().map((v,i)=>i+1)
    //console.log(numbers)
    

    return (
        <PageButtonContainer>
            {/* [1] 버튼 개수 올바른지 확인 */}
            {/* 만들 버튼의 개수 : {button_count} */}

            {/* [2] 둥근 모양의 버튼 만들어보기 - 둥근 이미지로 구현 */}
            {/* [2.1] 이전페이지 버튼 */}
            <PageButton disabled={page===1?'disabled':null} onClick={()=>setPage(page-1)}>&lt;</PageButton> {/* disable속성 - 1페이지면 이전이 눌러지지 않아야 하기에 못누르는 커서모양 스타일링*/}         

            {/* [2.2] 페이지 번호 버튼들 [버튼 개수만큼 만들어야 하기에 배열을 만들어서 그려내기] */}
            {
                // current 속성- 현재와 같은 페이지일때의 스타일 적용을 위해..
                numbers.map( (num, index)=> <PageButton key={index} current={page===num? 'page': null} onClick={()=>setPage(num)}>{num}</PageButton> )
            }            

            {/* [2.3] 다음페이지 버튼 */}
            <PageButton disabled={page===button_count?'disabled':null} onClick={()=>setPage(page+1)}>&gt;</PageButton>

            {/* [2.4] 페이지 버튼 클릭에 따라 실제 페이지 변경하기!! */}

        </PageButtonContainer>
    )
}

export default Pagination

// 버튼들이 놓여질 영역의 스타일이 된 div
const PageButtonContainer= styled.div`
    width: 90%;
    margin: 0 auto;
    //버튼들의 배치를 옆으로 하기 위해
    display: flex;
    justify-content: center;
    align-items: center;
`

// 둥근모양 스타일이 된 button
const PageButton= styled.button`
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 50%;
    border: none;
    margin: 0.3rem;
    font-weight: bold;
    font-size: 18px;
    background-color: white;

    //마우스 올라갈때 스타일
    &:hover{
        background-color: orange;
        cursor: pointer;
        transform: translateY(-2px); //살짝 위로 올라가는 모양
    }

    //현재 페이지번호와 버튼의 스타일 -- inCurren속성이 있다면... [값이 null이면 없는 것으로 판단함]
    &[current]{
        background-color: orange;

        //현재 페이지 버튼이므로 눌러지는 느낌이 없도록 커서는 원래대로 화살표. 살짝 위로 올라가는 모양도 안되도록.. 원래상태로 설정하기
        cursor: revert;   //부모 속성으로 돌아가거나 부모가 없을 때는 최초의 상태로 돌아가는 것
        transform: revert; //부모 속성으로 돌아가거나 부모가 없을 때는 최초의 상태로 돌아가는 것

    }

    //페이지가 처음이거나 마지막일때 [이전/다음]버튼에 대한 클릭방지 스타일링..
    &[disabled]{
        cursor: no-drop;        
        transform: revert;
        background-color: white;
        color: black;
    }


    
`