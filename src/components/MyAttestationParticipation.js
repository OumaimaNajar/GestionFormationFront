import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchEnseignantDetails } from './Api'; // Importez la méthode fetchEnseignantDetails

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f0f4f8;
  font-family: 'Open Sans', sans-serif;
`;

const PdfLink = styled(Link)`
  color: #00bfae; // Couleur turquoise
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
`;

function MyAttestationParticipation() {
  const [enseignantDetails, setEnseignantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Assurez-vous que 'userId' est le bon ID de l'enseignant

  useEffect(() => {
    if (userId) {
      fetchEnseignantDetails(userId)
        .then((data) => {
          setEnseignantDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'enseignant:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div>Chargement...</div>;
  if (!enseignantDetails) return <div>Enseignant non trouvé</div>;

  const { nom, prenom, departement } = enseignantDetails;

  // URL pour le lien PDF
  const pdfLink = `/myattest/${userId}?name=${encodeURIComponent(nom)}&firstName=${encodeURIComponent(prenom)}`;

  return (
    <Container>
      <UserInfo>
        <p><strong>Nom:</strong> {nom}</p>
        <p><strong>Prénom:</strong> {prenom}</p>
        <p><strong>Département:</strong> {departement || 'Département Non Disponible'}</p>
      </UserInfo>
      <PdfLink to={pdfLink}>
        Téléchargez votre attestation
      </PdfLink>
    </Container>
  );
}

export default MyAttestationParticipation;
