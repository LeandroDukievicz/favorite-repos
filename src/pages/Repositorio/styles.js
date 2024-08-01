import styled from 'styled-components';
import {Link} from 'react-router-dom'
 
export const Section = styled.section`
    width: 80%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px outset #ddd;
    border-radius: 15px;
    margin:0 auto;
    margin-top: 30px;
    padding: 20px;
`;

export const Title = styled.h1`
    color: #d5d5d5;
    margin-top: 30px;
    filter:drop-shadow(1px 2px 1px #000);
    text-transform: uppercase;
`;

export const Owner = styled.section`
    width: 100%;
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
    }


img{
    width: 150px;
    height:auto;
    margin: 0 auto;
    padding:10px;
    margin:10px;
    border-radius:15px;
    filter:drop-shadow(4px 4px 4px #ddd);
}

p{
    color:#ddd;
    font-size: 1.3rem;
}

`;

export const Wait = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color:#ddd;
    height: 100vh;
`;

export const BackBtn = styled(Link)`
    width: 100%;
    cursor:pointer;
    outline:0;
    background: transparent;
    color:#fff;

`;

export const IssuesList = styled.ul``;


