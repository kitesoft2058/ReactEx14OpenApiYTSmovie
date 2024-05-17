import styled from "styled-components"

const Cast= ({cast})=>{
    return (
        <Root>
            <img src={cast.url_small_image}></img>
            <div className="name">{cast.name}</div>
            <div className="character">[{cast.character_name}역]</div>
        </Root>
    )
}
export default Cast

const Root= styled.div`
    width: 10rem;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
    padding-bottom: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 100%;
    }

    .name{
        font-size: 10px;
        font-weight: 600;
        margin: .5rem;
        text-align: center;
    }

    .character{
        font-size: 8px;
        text-align: center;
    }

    & + & {
        margin-left: 8px;
    }
`