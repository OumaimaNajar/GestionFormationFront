import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api, { getEvaluationDetails } from './Api';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #;
`;

const Header = styled.h1`
  color: #333;
  font-size: 24px; /* Réduit la taille du titre */
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 250%;
  border-collapse: collapse;
  background-color: #ffffff;
`;

const TableHead = styled.thead`
  background-color: #E75662;
  color: #ffffff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Couleur de fond plus claire pour les lignes paires */
  }
`;

const TableHeader = styled.th`
  padding: 8px; /* Réduit le padding pour les en-têtes */
  text-align: left;
  font-size: 14px; /* Réduit la taille de la police pour les en-têtes */
`;

const TableData = styled.td`
  padding: 8px; /* Réduit le padding pour les cellules */
  text-align: left;
  font-size: 12px; /* Réduit la taille de la police pour les cellules */
`;

const EvaluationPage = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [details, setDetails] = useState([]);
  const [evaluationsMap, setEvaluationsMap] = useState({});

  const enseignantId = localStorage.getItem('userId'); // Récupérer l'ID de l'enseignant connecté

  const fetchEvaluations = async () => {
    try {
      const response = await api.get(`/findEvaluationParticipantByEnseignant_IdEnseignant/${enseignantId}`);
      const evaluationsData = response.data;

      const evaluationsMap = {};
      evaluationsData.forEach(evaluation => {
        if (evaluation.idEvaluationParticipant) {
          evaluationsMap[evaluation.idEvaluationParticipant] = evaluation;
        } else {
          console.warn('Evaluation missing idEvaluationParticipant:', evaluation);
        }
      });
      setEvaluationsMap(evaluationsMap);

      const detailsPromises = evaluationsData.map(async (evaluation) => {
        if (evaluation.idEvaluationParticipant) {
          return await getEvaluationDetails(evaluation.idEvaluationParticipant);
        }
        return null;
      });

      const detailsData = await Promise.all(detailsPromises);
      const filteredDetails = detailsData.filter(detail => detail !== null);
      setDetails(filteredDetails);
    } catch (error) {
      console.error("Erreur lors de la récupération des évaluations et des détails:", error);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, [enseignantId]);

  return (
    <PageContainer>
      <Header>Résultat Évaluation</Header>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Titre de la Formation</TableHeader>
            <TableHeader>Nom</TableHeader>
            <TableHeader>Prénom</TableHeader>
            <TableHeader>Évaluation</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {details.map((detail, index) => {
            const { titreFormation, nom, prenom, idEvaluationParticipant } = detail;
            const evaluation = evaluationsMap[idEvaluationParticipant]?.evaluation || 'N/A';

            return (
              <TableRow key={index}>
                <TableData>{titreFormation || 'Titre de la Formation'}</TableData>
                <TableData>{nom || 'N/A'}</TableData>
                <TableData>{prenom || 'N/A'}</TableData>
                <TableData>{evaluation}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default EvaluationPage;
