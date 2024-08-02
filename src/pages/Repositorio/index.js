import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Section, Title, Owner, Wait, BackBtn, IssuesList } from './styles';
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
    return (
      <Wait>
        <h1>Loading</h1> &nbsp;&nbsp;
        <FaSpinner size={30} />
      </Wait>
    );
  }

  return (
    <Section>
      <BackBtn to="/">
        <FaArrowLeft size={30} />
      </BackBtn>

      <Title>{repositorio?.full_name}</Title>

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

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>&nbsp;
                {issue.labels.map(label =>(
                    <span key={String(label.id)}>{label.name}</span>
                ))}&nbsp;
              </strong>
              <p>&nbsp;{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
    </Section>
  );
}
