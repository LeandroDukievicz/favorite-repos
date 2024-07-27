import React, {useState, useCallback} from 'react'
import api from '../../services/api'
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Title, Container, Form, SubmitButton, List, DeleteButton } from './styles'
 
export default function Main(){
    const [NewRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleinputChange(e){
        setNewRepo(e.target.value);
    }

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();

        async function submit(){
            setLoading(true);
            try{
                const response = await api.get(`repos/${NewRepo}`);
                const data = {
                    name: response.data.full_name,
                }
                setRepositorios([...repositorios, data]);
                setNewRepo('');
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
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

                <SubmitButton loading={loading ? 1 : 0}>
                    {
                        loading ? (
                            <FaSpinner color="#fff" size={18} />
                        ) : (
                            <FaPlus color="#fff" size={15} /> 
                        )
                    }
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <a href="">
                            <FaBars size={20} />
                        </a>
                    </li>
                ))}
            </List>

        </Container>
    )
}