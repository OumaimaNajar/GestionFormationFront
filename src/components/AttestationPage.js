import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchEnseignantsByRole, getFormationTitleByEnseignantId } from './Api';

// Styles
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Header = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
`;

const TableHead = styled.thead`
  background-color: #E75662;
  color: #ffffff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  font-size: 14px;
`;

const TableData = styled.td`
  padding: 8px;
  text-align: left;
  font-size: 12px;
`;

const PdfLink = styled.a`
  color: #00bfae;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AttestationPage = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEnseignants = async () => {
      try {
        const enseignantsData = await fetchEnseignantsByRole();
        console.log("Enseignants récupérés:", enseignantsData);
        setEnseignants(enseignantsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des enseignants", error);
        setError("Erreur lors de la récupération des enseignants");
      } finally {
        setLoading(false);
      }
    };

    getEnseignants();
  }, []);

  if (loading) {
    return <p>Chargement des enseignants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageContainer>
      <Header>Liste des Attestations</Header>
      {enseignants.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Nom</TableHeader>
              <TableHeader>Prénom</TableHeader>
              <TableHeader>Identifiant</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Formation</TableHeader>
              <TableHeader>Attestation</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {enseignants.map(async (enseignant) => {
              const title = await getFormationTitleByEnseignantId(enseignant.idEnseignant);
              return (
                <TableRow key={enseignant.idEnseignant}>
                  <TableData>{enseignant.nom || 'N/A'}</TableData>
                  <TableData>{enseignant.prenom || 'N/A'}</TableData>
                  <TableData>{enseignant.identifiant || 'N/A'}</TableData>
                  <TableData>{enseignant.email || 'N/A'}</TableData>
                  <TableData>{title || 'N/A'}</TableData>
                  <TableData>
                    <PdfLink href={`/attestation/${enseignant.idEnseignant}`}>
                      Voir l'Attestation
                    </PdfLink>
                  </TableData>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>Aucun enseignant trouvé.</p>
      )}
    </PageContainer>
  );
};

export default AttestationPage;
