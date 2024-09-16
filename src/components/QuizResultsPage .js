import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrophy, FaRegCheckCircle } from 'react-icons/fa';
import api from './Api'; // Importer votre instance axios ou les appels API

const EvaluationPage = () => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await api.get('/allEvaluationParticipant');
        setEvaluations(response.data);
      } catch (error) {
        console.error('Error fetching evaluations:', error);
      }
    };

    fetchEvaluations();
  }, []);

  return (
    <PageContainer>
      <Header>
        <FaTrophy /> Résultats des Évaluations
      </Header>
      <CardContainer>
        {evaluations.map((evaluation) => (
          <ResultCard key={evaluation.id}>
            <CardHeader>
              <FaRegCheckCircle /> {evaluation.formation.titre}
            </CardHeader>
            <CardBody>
              <Detail>
                Nom : {evaluation.enseignant.nom} {evaluation.enseignant.prenom}
              </Detail>
              <Detail>
                Évaluation : {evaluation.evaluation}
              </Detail>
            </CardBody>
          </ResultCard>
        ))}
      </CardContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 20px; /* Augmenté pour un meilleur espacement */
`;

const Header = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px; /* Ajusté pour un espacement plus raisonnable */
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const ResultCard = styled.div`
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: 100%; /* Utilisation du plein espace disponible */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardBody = styled.div`
  margin-top: 10px;
`;

const Detail = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default EvaluationPage;
