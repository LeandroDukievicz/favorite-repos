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

export const IssuesList = styled.ul`
    margin-top:30px;
    padding-top:30px;
    border-top:1px solid #d5d5d5;
    list-style: none;
    

    li{
        display: flex;
        padding:15px 10px;
    }
    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px inset #d5d5d5;
    }
    div{
        flex:1;
        margin-left:10px;

        p{
            margin-top: 10px;
            font-size:12px;
            color:cyan;
            letter-spacing: .1rem;
            text-decoration:overline;
            padding: 2px;
        }
    }
    strong{
        font-size: 15px;

        a{
            text-decoration: none;
            color:#d5d5d5;
            transition: 0.5s;
            &:hover{
                color: #0071db;
                font-variant:initial;
                font-style: italic;
            }
        }
        span{
            background-color: #333;
            color:cyan;
            border-radius: 5px;
            font-size:14px;
            font-weight: 700;
            padding: 5px 8px;
            margin-left:12px;
            border: 1px inset cyan;
            box-shadow: 2px 2px 1px cyan;
        }
    }
`;

export const PageActions = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items:center ;
    padding: 10px;
    margin: 10px;
    margin-top: 40px;

    button{
        padding:8px;
        margin: 10px;
        color: #fff;
        box-shadow: 2px 2px 2px cyan;
        background: transparent;
        display: flex;
        align-items: center;
        border: 2px inset cyan;
        border-radius: 5px;
        letter-spacing: .1rem;
        cursor: pointer;
        
        &:disabled{
            cursor:not-allowed;
            opacity:.3;
            border:none;
            box-shadow: 1px cyan;
        }

        }  
`;

export const FilterList = styled.div`
   
    margin-top: 30px;
    align-items: center;
    padding:10px;
    margin:10px;
    
    button{
        margin:10px;
        padding:8px;
        border-radius: 5px;
        border: 1px inset cyan;
        box-shadow: 2px 2px 2px cyan;
        background-color: transparent;
        color:#ddd;
        cursor:pointer;

        &:nth-child(${props => props.active +1}){
            background-color:cyan;
            color:#000;
            box-shadow: 2px 2px 2px cyan;
        }

    
   }
`;


