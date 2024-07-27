import React, {useState} from 'react'
import {FaGithub, FaPlus } from 'react-icons/fa'

import { Title, Container, Form, SubmitButton } from './styles'
 
export default function Main(){

    const [NewRepo, setNewRepo] = useState('');
    function handleinputChange(e){
        setNewRepo(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        
    }


    return(
        <Container>
            <Title>
                <FaGithub size={30}/> &nbsp;
                <h1>
                    Meus Repositórios :
                </h1>                
            </Title>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Adicionar Repositórios"
                value={NewRepo}
                onChange={handleinputChange}
                />

                <SubmitButton >
                    <FaPlus color="#fff" size={15} />
                </SubmitButton>

            </Form>
        </Container>
    )
}