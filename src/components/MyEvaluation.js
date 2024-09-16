import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import api, { getFormationTitleByEvaluationId } from './Api';

const PageContainer = styled.div`
  padding: 10px;
  background-color: #;
  width: 100%;
`;

const Header = styled.h1`
  color: #333;
  font-size: 25px;
  margin-bottom: 30px;
  text-align: center;
`;

const Table = styled.table`
  width: 160%;
  border-collapse: collapse;
  background-color: #fff;
  font-size: 12px; /* Diminuer la taille de la police */
`;

const TableHead = styled.thead`
  background-color: #ef2222;
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 8px; /* Réduire le padding */
  border: 1px solid #ddd;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 6px; /* Réduire le padding */
  border: 1px solid #ddd;
  text-align: center;
`;

const DeleteButton = styled.button`
  background: none;
  color: #333;
  border: none;
  cursor: pointer;
  font-size: 16px; /* Réduire la taille de l'icône */
  padding: 0;

  &:hover {
    color: #cc0000;
  }
`;

const MyEvaluation = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [formationTitles, setFormationTitles] = useState({});

  const enseignantId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const evaluationsResponse = await api.get(`/findByEnseignant_IdEnseignant/${enseignantId}`);
        const userEvaluations = evaluationsResponse.data;

        setEvaluations(userEvaluations);

        const titles = {};
        for (const evaluation of userEvaluations) {
          const title = await getFormationTitleByEvaluationId(evaluation.idEvaluationFormation);
          titles[evaluation.idEvaluationFormation] = title;
        }
        setFormationTitles(titles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEvaluations();
  }, [enseignantId]);

  const handleDelete = async (idEvaluationFormation) => {
    try {
      await api.delete(`/deleteEvaluationFormation/${idEvaluationFormation}`);
      setEvaluations(evaluations.filter(e => e.idEvaluationFormation !== idEvaluationFormation));
    } catch (error) {
      console.error('Error deleting evaluation:', error);
    }
  };

  return (
    <PageContainer>
      <Header>Mes Evaluations</Header>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Formation</TableHeader>
            <TableHeader>Aspect Organisationnel</TableHeader>
            <TableHeader>Aspect Pédagogique</TableHeader>
            <TableHeader>Aspect Technique</TableHeader>
            <TableHeader>Note</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {evaluations.map((evaluation) => (
            <TableRow key={evaluation.idEvaluationFormation}>
              <TableCell>{formationTitles[evaluation.idEvaluationFormation] || 'Formation inconnue'}</TableCell>
              <TableCell>{evaluation.aspectOrganisationnel || 'N/A'}</TableCell>
              <TableCell>{evaluation.aspectPedagogique || 'N/A'}</TableCell>
              <TableCell>{evaluation.aspectTechnique || 'N/A'}</TableCell>
              <TableCell>{evaluation.note || 'Aucun commentaire'}</TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDelete(evaluation.idEvaluationFormation)}>
                  <FaTrashAlt />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default MyEvaluation;
