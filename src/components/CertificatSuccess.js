import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backgroundImg from '../images/certificat2.png';
import logoImg from '../images/télécharger1.jpg';
import { useParams } from 'react-router-dom';
import { fetchEnseignantById, getFormationTitleByEnseignantId } from './Api';

const CertificateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  font-family: 'Open Sans', sans-serif;
  position: relative;
`;

const CertificateCard = styled.div`
  background: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  padding: 60px 40px;
  text-align: center;
  position: relative;
  color: #2c3e50;
`;

const CertificateLogo = styled.div`
  width: 100px;
  height: 74px;
  margin-bottom: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const CertificateTitle = styled.h1`
  color: #d4ac07;
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 90px;
  font-family: 'Robot';
`;

const CertificateText = styled.p`
  color: black;
  font-size: 15px;
  margin-bottom: 20px;
`;

const CertificateName = styled.h2`
  color: #E61F1F;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  font-style: italic;
  font-family: 'Robot', cursive;
`;

const CourseName = styled.h2`
  color: #e74c3c;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family:'Robot',sans-cerif;
`;

const DateText = styled.p`
  color: #3339;
  font-size: 18px;
  margin-bottom: 30px;
`;

const DownloadButton = styled.button`
  background-color: #3339;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  position: fixed; /* Positionne le bouton en dehors de la section imprimée */
  bottom: 20px;
  right: 20px;

  /* Style d'impression */
  @media print {
    display: none !important;
  }
`;

const CertificatSuccess = () => {
  const { idEnseignant } = useParams(); 
  const [formationTitle, setFormationTitle] = useState('');
  const [enseignant, setEnseignant] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const title = await getFormationTitleByEnseignantId(idEnseignant);
        setFormationTitle(title);

        const enseignantData = await fetchEnseignantById(idEnseignant);
        setEnseignant(enseignantData);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'enseignant ou du titre de la formation", error);
      }
    };

    fetchDetails();
  }, [idEnseignant]);

  if (!enseignant) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <CertificateContainer>
        <style>
          {`
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              .certificate-card {
                background: url(${backgroundImg}) no-repeat center center !important;
                background-size: cover !important;
              }
            }
          `}
        </style>
        
        <CertificateCard className="certificate-card">
       
          <CertificateTitle>Certificat de Réussite</CertificateTitle>
          <CertificateText>Ce certificat est décerné à :</CertificateText>
          <CertificateName>❤꧁ღ⊱♥ {enseignant.nom} {enseignant.prenom} ♥⊱ღ꧂❤</CertificateName>
          <CertificateText>En reconnaissance de sa participation active et de la réussite de la formation intitulée :</CertificateText>
          <CourseName>{formationTitle}</CourseName>
          <DateText>Délivré le {new Date().toLocaleDateString()}</DateText>
        </CertificateCard>
      </CertificateContainer>
      <DownloadButton onClick={() => window.print()}>Télécharger le certificat</DownloadButton>
    </>
  );
};


export default CertificatSuccess;
