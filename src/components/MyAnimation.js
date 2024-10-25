import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFormationsByEnseignantId, telechargerAttestation, fetchEnseignantDetails } from './Api';
import logo from '../images/télécharger1.jpg';
import { useLocation } from 'react-router-dom';

const AttestationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  font-family: 'Open Sans', sans-serif;
  position: relative;
`;

const AttestationCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 70%;
  padding: 30px;
  position: relative;
  color: #2c3e50;
  margin-top: 10px;

  @media print {
    background-color: white !important;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 30px;
  text-align: left;
  font-size: 12px;
  color: #2c3e50;
  position: relative;
  
  p {
    margin: 0;
  }
  
  .bold {
    font-weight: bold;
  }
  
  .small {
    font-size: 10px;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: auto;
`;

const CardTitle = styled.h1`
  color: black;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AttestationText = styled.p`
  text-align: left;
  margin-bottom: 40px;
  font-size: 14px;
  color: black;

  .bold {
    font-weight: bold;
  }
`;

const CardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 2px;
  text-align: center;
  color: black;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 1px;
  color: black;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const FooterLeft = styled.p`
  text-align: left;
  font-size: 15px;
  color: black;
`;

const FooterRight = styled.p`
  text-align: right;
  font-size: 15px;
  color: black;
`;

const DownloadButton = styled.button`
  background-color: #3339;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  position: fixed;
  bottom: 20px;
  right: 20px;

  @media print {
    display: none !important;
  }
`;

function MyAnimation() {
  const [formations, setFormations] = useState([]);
  const [enseignantDetails, setEnseignantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(useLocation().search);
  const nom = query.get('name') || 'Nom Non Disponible';
  const prenom = query.get('firstName') || 'Prénom Non Disponible';

  useEffect(() => {
    const idEnseignant = localStorage.getItem('userId');
    if (idEnseignant) {
      fetchEnseignantDetails(idEnseignant)
        .then(data => {
          setEnseignantDetails(data);
          return getFormationsByEnseignantId(idEnseignant);
        })
        .then(data => {
          console.log('Formations data:', data); // Vérifiez les données reçues
          setFormations(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } else {
      setError(new Error('ID Enseignant manquant dans le localStorage'));
      setLoading(false);
    }
  }, []);

  const handleDownloadAll = async () => {
    try {
      for (const formation of formations) {
        const attestationResponse = await telechargerAttestation(formation.idAttestation);
        const url = window.URL.createObjectURL(new Blob([attestationResponse], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `attestation_${formation.idAttestation}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }

      setTimeout(() => {
        window.print();
      }, 1000);

      alert('Téléchargement terminé avec succès');
    } catch (error) {
      alert('Erreur lors du téléchargement des attestations');
      console.error(error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <AttestationContainer>
      <AttestationCard className="attestation-card">
        <CardHeader>
          <Logo src={logo} alt="Logo ESPRIT" />
          <p className="bold">École Supérieure Privée d’Ingénierie et de Technologies</p>
          <p className="bold">Département de Formation</p>
          <p className="small">2 rue André Ampère - 2083 - Pôle Technologique - El Ghazala</p>
          <p className="small">Tél : +216-70 25 00 00</p>
          <p className="small">Web site : <a href="https://esprit.tn/" target="_blank" rel="noopener noreferrer">https://esprit.tn/</a></p>
        </CardHeader>
        <CardTitle>Attestation d’animation d’une formation</CardTitle>
        <AttestationText>
          Je soussignée Mme. Hajer BERHOUMA, cheffe de département formation des formateurs à l’École Supérieure Privée d’Ingénierie et de Technologie, atteste que Mme. <span className="bold">{nom}</span> <span className="bold">{prenom}</span>, enseignante titulaire au sein du département <span className="bold">{enseignantDetails?.departement || 'Département Non Disponible'}</span> à ESPRIT, a suivi les formations suivantes :
        </AttestationText>
        <CardTable>
          <thead>
            <tr>
              <TableHeader>Formation</TableHeader>
              <TableHeader>Formateur</TableHeader>
              <TableHeader>Date</TableHeader>
              
              
              
            </tr>
          </thead>
          <tbody>
            {formations.length > 0 ? formations.map(formation => (
              <tr key={formation.idFormation}>
                <TableCell>{formation.titre}</TableCell>
                <TableCell>{formation.formateur}</TableCell>
                <TableCell>{new Date(formation.date).toLocaleDateString()}</TableCell>
              
                </tr>
            )) : (
              <tr>
                <TableCell colSpan="6">Aucune formation disponible</TableCell>
              </tr>
            )}
          </tbody>
        </CardTable>
        <FooterContainer>
          <FooterLeft>
            Cette attestation est délivrée pour servir et valoir ce que de droit.
          </FooterLeft>
          <FooterRight>
            <br />
            <br />
            Fait à Tunis, le {new Date().toLocaleDateString()}
            <br />
            <br />
            Signature
          </FooterRight>
        </FooterContainer>
      </AttestationCard>
      <DownloadButton onClick={handleDownloadAll}>Télécharger</DownloadButton>
    </AttestationContainer>
  );
}

export default MyAnimation;
