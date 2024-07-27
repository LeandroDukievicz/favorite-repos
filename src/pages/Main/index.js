import React, {useState, useCallback} from 'react'
import api from '../../services/api'
import {FaGithub, FaPlus } from 'react-icons/fa'
import { Title, Container, Form, SubmitButton } from './styles'
 
export default function Main(){

    const [NewRepo, setNewRepo] = useState('');
    function handleinputChange(e){
        setNewRepo(e.target.value);
    }

    const [repositorios, setRepositorios] = useState('');

    const handleSubmit = useCallback((e)=>{
        e.preventDefauyt();

        async function submit(){
            const response = await api.get(`repos/${NewRepo}`);
            const data = {
                name: response.data.full_name,
            }
            setRepositorios([...repositorios, data]);
            setNewRepo('');
        }
        submit();
    }, [NewRepo, repositorios]);

   
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