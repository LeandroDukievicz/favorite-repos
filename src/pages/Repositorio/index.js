import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section, Title, Owner } from './styles';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio: repositorioParam } = useParams();
  const [repositorio, setRepositorio] = useState(null);
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
      }
    }

    load();
  }, [repositorioParam]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Section>
      <Title>
        {repositorio?.full_name}
      </Title>
      <Owner>
        {repositorio && repositorio.owner && (
          <div>
            <img
              src={repositorio.owner.avatar_url}
              alt={repositorio.owner.login}
            />
            <p>{repositorio.description}</p>
          </div>
        )}
      </Owner>
    </Section>
  );
}
