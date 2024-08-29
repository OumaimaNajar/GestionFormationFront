import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from './Api'; // Assurez-vous que le chemin est correct

const ParticipantEvaluation = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [evaluations, setEvaluations] = useState({});
  const [participants, setParticipants] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    api.get('/allFormation')
      .then(response => {
        setFormations(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des formations :", error);
      });
  }, []);

  useEffect(() => {
    if (selectedFormation) {
      api.get(`/getAllEnseignantByIdFormation/${selectedFormation}/enseignants`)
        .then(response => {
          setParticipants(response.data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des participants :", error);
        });
    }
  }, [selectedFormation]);

  const handleFormationChange = (e) => {
    setSelectedFormation(e.target.value);
  };

  const handleEvaluationChange = (participantId, value) => {
    setEvaluations((prevEvaluations) => ({
      ...prevEvaluations,
      [participantId]: value,
    }));
  };

  const submitEvaluations = () => {
    if (!selectedFormation) {
      alert('Veuillez sélectionner une formation.');
      return;
    }

    console.log('Évaluations à envoyer :', evaluations);

    const requests = Object.keys(evaluations).map(participantId => {
      const note = evaluations[participantId];
      console.log(`Envoi de l'évaluation : Formation ID ${selectedFormation}, Enseignant ID ${participantId}, Note ${note}`);
      return api.post(`/assignEvaluationToEnseignantAndFormation/${selectedFormation}/${participantId}`, {
        evaluation: note
      });
    });

    Promise.all(requests)
      .then(() => {
        setSubmissionStatus('Évaluations soumises avec succès');
      })
      .catch(error => {
        setSubmissionStatus('Erreur lors de la soumission des évaluations');
        console.error("Erreur lors de la soumission des évaluations :", error);
      });
  };

  return (
    <PageContainer>
      <Title>Évaluation des Participants</Title>
      <Container>
        <Dashboard>
          <Select onChange={handleFormationChange} value={selectedFormation}>
            <option value="">Sélectionner une formation</option>
            {formations.map((formation) => (
              <option key={formation.idFormation} value={formation.idFormation}>
                {formation.titre}
              </option>
            ))}
          </Select>
          <ParticipantList>
            {participants.map((participant) => (
              <ParticipantCard key={participant.idEnseignant}>
                <ParticipantInfo>
                  <ParticipantName>{participant.nom} {participant.prenom}</ParticipantName>
                  <EvaluationInput
                    type="number"
                    min="0"
                    max="20"
                    placeholder="Note /20"
                    value={evaluations[participant.idEnseignant] || ''}
                    onChange={(e) => handleEvaluationChange(participant.idEnseignant, e.target.value)}
                  />
                </ParticipantInfo>
              </ParticipantCard>
            ))}
          </ParticipantList>
          <SubmitButton onClick={submitEvaluations}>Soumettre Évaluations</SubmitButton>
          {submissionStatus && <StatusMessage $success={submissionStatus.includes('succès')}>{submissionStatus}</StatusMessage>}
        </Dashboard>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 10vh;
  background-color: #f0f0f0;
  padding: 3px;
`;

const Container = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  min-height: 32vh;
  min-width: 140vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Dashboard = styled.div`
  width: 50%;
  max-width: 300px;
  background: white;
  padding: 40px;
  border-radius: 21px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const ParticipantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ParticipantCard = styled.div`
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ParticipantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ParticipantName = styled.span`
  font-size: 18px;
  color: #333;
`;

const EvaluationInput = styled.input`
  width: 70px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
`;

const StatusMessage = styled.div`
  margin-top: 10px;
  color: ${(props) => (props.$success ? 'green' : 'red')};
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  background-color: #e53935;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #c62828;
  }
`;

export default ParticipantEvaluation;
