import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  // Salvar alterações
  useEffect(() => {
    if (repositorios.length > 0) {
      localStorage.setItem('repos', JSON.stringify(repositorios));
    }
  }, [repositorios]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);
      try {
        if (newRepo === '') {
          throw new Error('Você precisa indicar um repositorio!');
        }

        const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.some(repo => repo.name === response.data.full_name);

        if (hasRepo) {
          throw new Error('Repositorio Duplicado');
        }

        const data = {
          name: response.data.full_name,
        };

        setRepositorios(prevRepos => {
          const newRepos = [...prevRepos, data];
          localStorage.setItem('repos', JSON.stringify(newRepos)); // Salva imediatamente após adicionar
          return newRepos;
        });

        setNewRepo('');
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepo, repositorios]);

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
    setAlert(null);
  };

  const handleDelete = useCallback((repo) => {
    setRepositorios(prevRepos => {
      const updatedRepos = prevRepos.filter(r => r.name !== repo);
      localStorage.setItem('repos', JSON.stringify(updatedRepos)); // Salva imediatamente após deletar
      return updatedRepos;
    });
  }, []);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input 
          type="text" 
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>  
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
