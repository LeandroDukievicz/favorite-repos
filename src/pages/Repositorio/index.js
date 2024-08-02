import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Section, Title, Owner, Wait, BackBtn, IssuesList, PageActions,FilterList } from './styles';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio: repositorioParam } = useParams();
  const [repositorio, setRepositorio] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState([
    {state: 'all', label:'All Issues', active:true},
    {state: 'open', label:'Open Issues', active:false},
    {state: 'closed', label:'Closed Issues', active:false},
  ]);

  const [filterIndex, setFilterIndex] = useState(0);



  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(repositorioParam);

      try {
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: filters.find(f=>f.active).state,
              per_page: 5,
              page: 1, // Adicione a página inicial aqui
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

  useEffect(() => {
    async function loadIssues() {
      const nomeRepo = decodeURIComponent(repositorioParam);
      try {
        const response = await api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters[filterIndex].state,
            per_page: 5,
            page: page, // Adiciona a página atual aqui
          },
        });
        setIssues(response.data);
      } catch (error) {
        console.error("Erro ao buscar issues:", error);
      }
    }

    loadIssues();
  }, [filterIndex,filters,  repositorioParam, page]); // Adicione `page` como dependência

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index){
      setFilterIndex(index);
  }

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

      <FilterList active={filterIndex}>
          {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={()=> handleFilter(index)}
              >
                {filter.label}
              </button>
          ))}
      </FilterList>

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>&nbsp;
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}&nbsp;
              </strong>
              <p>&nbsp;{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage('back')}
          disabled={page === 1} // Desabilita botão de voltar se estiver na primeira página
        >
          &nbsp; &nbsp;
          <FaChevronLeft size={24} color="cyan" />
          Voltar&nbsp; &nbsp;
        </button>

        <button type="button" onClick={() => handlePage('next')}>
          &nbsp;
          Próxima
          <FaChevronRight size={24} color="cyan" />
        </button>
      </PageActions>
    </Section>
  );
}
