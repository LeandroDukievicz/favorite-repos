import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section, Title } from './styles';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio: repositorioParam } = useParams();
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(repositorioParam);

      try {
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: 'open',
              per_page: 5,
            },
          }),
        ]);

        setRepositorio(repositorioData.data);
        setIssues(issuesData.data);
      } catch (error) {
        console.error("Erro ao buscar dados do repositório:", error);
      } finally {
        setLoading(false);
      }  }
    load();
  }, [repositorioParam]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

  return (
    <Section>
      <Title>{repositorio.full_name}</Title>
      {/* <p>{repositorio.description}</p>
      <h2>Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
          </li>
        ))}
      </ul> */}
    </Section>
  );
}
