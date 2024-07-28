import React from 'react';
import { useParams } from 'react-router-dom';
import { Section, Title } from './styles';

export default function Repositorio() {
    const { repositorio } = useParams();
    
    return (
        <Section>
            <Title>
                {decodeURIComponent(repositorio)}
            </Title>
        </Section>
    );
}
