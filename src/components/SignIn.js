import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';
import backgroundImage from '../images/fondd.png'; // Importer l'image de fond
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

// Style le conteneur principal avec l'image de fond
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f0f0f0;
  padding-top: 20px;
`;

// Conteneur pour le formulaire
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  max-width: 350px;
`;

// Style du titre
const Title = styled.h1`
  color: #ffffff;
  background-color: #E3242B;
  padding: 40px;
  border-radius: 14px;
  margin-bottom: 0px;
  font-size: 24px;
  text-align: center;
  width: 70%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Style du formulaire
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Style des champs du formulaire
const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #e81e63;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  background-color: #E3242B;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #B71C1C;
  }
`;

const SignIn = () => {
  const [identifiant, setIdentifiant] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook useNavigate pour la navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/login', {
        identifiant,
        password
      });
  
      const { status, role, nom, prenom, idEnseignant } = response.data;
  
      if (status === 'SUCCESS') {
        localStorage.setItem('role', role);
        localStorage.setItem('userName', nom);
        localStorage.setItem('userFirstName', prenom);
        localStorage.setItem('userId', idEnseignant);
    
        // Rediriger en fonction du rôle
        if (role === 'FORMATEUR') {
         // navigate(`/dashboard-formateur/${idEnseignant}`);
          navigate(`/dashboard-formateur`);
        } else if (role === 'PARTICIPANT') {
          navigate(`/home/${idEnseignant}`);
        }
      } else {
        setError('Identifiant ou mot de passe incorrect.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Erreur lors de la connexion. Veuillez réessayer.');
    }
  };

  return (
    <AppContainer>
      <Header />
      <FormContainer>
        <Title>Se connecter</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Identifiant"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            required
            autoComplete="off"
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <input type="checkbox" style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>Se souvenir de moi</span>
          </div>
          <Button type="submit">Connexion</Button>
          {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
          <h5>Vous n'avez pas de compte ?</h5>
        </Form>
      </FormContainer>
    </AppContainer>
  );
};

export default SignIn;
