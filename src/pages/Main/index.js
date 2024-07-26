import React from 'react'
import {FaGithub, FaPlus } from 'react-icons/fa'

import { Title, Container, Form, SubmitButton } from './styles'
 
export default function Main(){
    return(
        <Container>
            <Title>
                <FaGithub size={30}/> &nbsp;
                <h1>
                    Meus Repositórios :
                </h1>                
            </Title>

            <Form onSubmit={()=> {}}>
                <input type="text" placeholder="Adicionar Repositórios"/>

                <SubmitButton>
                    <FaPlus color="#fff" size={15} />
                </SubmitButton>

            </Form>
        </Container>
    )
}