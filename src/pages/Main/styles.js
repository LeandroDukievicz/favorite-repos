import styled from 'styled-components';

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
        border: 2px inset #ddd;
        border-end-start-radius: 5px;
    }
`;

export const SubmitButton = styled.button.attrs({
    type: 'submit'
})`
    background-color: #000;
    color: #fff;
    padding: 0 15px;
    border-end-end-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
