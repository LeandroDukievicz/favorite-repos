import React, {useState, useCallback, useEffect} from 'react'
import api from '../../services/api'
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Title, Container, Form, SubmitButton, List, DeleteButton } from './styles'
 
export default function Main(){
    const [NewRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(()=>{
        const repoStorage = localStorage.getItem('repos');
        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage));
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorios));
    },[repositorios]);

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();

        async function submit(){
            setLoading(true)
            setAlert(null)
            try{
                if (NewRepo ===''){
                    throw new Error('Você precisa indicar um repositório !');
                }
                const response = await api.get(`repos/${NewRepo}`);

                const hasRepo = repositorios.find(repo => repo.name ===NewRepo);

                if (hasRepo){
                    throw new Error('Repositório Duplicado'); 
                   
                }

                const data = {
                    name: response.data.full_name,
                }
                setRepositorios([...repositorios, data]);
                setNewRepo('');
            }catch(error){
                setAlert(true);
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        submit();
    }, [NewRepo, repositorios]);

    function handleinputChange(e){
        setNewRepo(e.target.value);
        setAlert(null);
    }

    const handleDelete = useCallback((repo)=>{
        alert('Tem certeza que deseja excluir?')
        const find = repositorios.filter(result => result.name !== repo);
        setRepositorios(find);
    },[repositorios]);

    return(
        <Container>
            <Title>
                <FaGithub size={30}/> &nbsp;
                <h1>
                    Meus Repositórios :
                </h1>                
            </Title>

            <Form onSubmit={handleSubmit} error={alert}>
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
                            <DeleteButton onClick={() => handleDelete(repo.name) }>
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