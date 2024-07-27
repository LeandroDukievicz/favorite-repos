import styled,  {keyframes, css} from 'styled-components';

export const Title = styled.h1`
    color: #000;
`;

export const Container = styled.section`
    max-width: 700px;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 30px;
    margin: 80px auto;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2 );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        font-size:20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Form = styled.form`
    width: 650px;
    color: #000;
    display: flex;
    justify-content: center ;
    margin-top: 30px;

    input{
        flex:1;
        padding:10px;
        border: 2px inset ${props =>(props.error ? '#ff0000' : '#ddd')};
        border-end-start-radius: 5px;
    }
`;

const animate = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props =>({
    type: 'submit',
    disabled: props.loading,

    }))`
    background-color: #000;
    color: #fff;
    padding: 0 15px;
    border-end-end-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading &&
        css`
            svg{
                animation: ${animate} 2s linear infinite;
            }
         `
    }
`;

export const List = styled.ul`
    width: 650px;
    padding: 15 0px;
    margin: 10px;
    filter: drop-shadow(1px 1px 2px #ddd);

    li{
        list-style: none;
        display:flex;
        padding: 5px;
        margin:5px;  
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
        & + li{
            border-top: 1px solid #eee;
        }

        a{
            color: #0d2636;
            text-decoration:none;
        }
    }
`;

export const DeleteButton = styled.button.attrs({type:'button'})`
    color: red;
    background: transparent;
    border: none;
    margin:5px;
    padding:5px;
`;