import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import avatarImage from '../images/user.jpg';
import fondImage from '../images/fond.png';
import MyEvaluation from './MyEvaluation';
import MyDashboard from './MyDashboard';
import EvaluationPage from './EvaluationPage';
import ParticipantEvaluation from './ParticipantEvaluation';
import MyAttestationParticipation from './MyAttestationParticipation';
import MyAnimationParticipation from './MyAnimationParticipation';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background: url(${fondImage}) no-repeat center center fixed;
  background-size: cover;
`;

const Sidebar = styled.nav`
  width: 190px;
  background-color: #333;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 15px;
  margin-left: 30px;
  margin-top: 15px;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 20px;
  color: #fff;
  background-color: ${({ selected }) => (selected ? '#E61F1F' : 'transparent')};
  border: none;
  text-align: center;
  cursor: pointer;
  margin-bottom: 12px;
  border-radius: ${({ selected }) => (selected ? '10px' : '0')};
  transition: background-color 0.3s ease, border-radius 0.3s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#E61F1F' : '#545454')};
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #fff;
  margin: 20px 0;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: url(${fondImage}) no-repeat center center fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: white;
`;

const SearchBar = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.span`
  font-size: 16px;
  color: #333;
`;

const DashboardContent = styled.div`
  flex: 1;
  background: url(${fondImage}) no-repeat center center fixed;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding: 50px;
`;

const DashboardParticipant = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('My Dashboard');
  const [currentContent, setCurrentContent] = useState(<MyDashboard />); // Initialize with MyDashboard
  const [userName, setUserName] = useState(''); // State for the user's last name
  const [userFirstName, setUserFirstName] = useState(''); // State for the user's first name
  
  useEffect(() => {
    // Retrieve user name and first name from local storage
    const name = localStorage.getItem('userName');
    const firstName = localStorage.getItem('userFirstName');
    if (name && firstName) {
      setUserName(name);
      setUserFirstName(firstName);
    }
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (menuItem === 'Evaluation') {
      setCurrentContent(<MyEvaluation />);
    } else if (menuItem === 'My Dashboard') {
      setCurrentContent(<MyDashboard />);
    } else if (menuItem === 'EvaluationPage') {
      setCurrentContent(<EvaluationPage />);
    } else if (menuItem === 'participant-evaluation') {
      setCurrentContent(<ParticipantEvaluation />);
    }else if (menuItem === 'MyAttestationParticipation') {
      setCurrentContent(<MyAttestationParticipation />);
    }else if (menuItem === 'AttestationAnimation') {
      setCurrentContent(<MyAnimationParticipation />);
    }
     else {
      setCurrentContent(<div></div>);
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Title>Dashboard</Title>
        <Divider />
        <MenuItem
          selected={selectedMenuItem === 'My Dashboard'}
          onClick={() => handleMenuItemClick('My Dashboard')}
        >
          My Dashboard
        </MenuItem>
        <MenuItem
          selected={selectedMenuItem === 'Evaluation'}
          onClick={() => handleMenuItemClick('Evaluation')}
        >
          Evaluation
        </MenuItem>
        <MenuItem
          selected={selectedMenuItem === 'EvaluationPage'}
          onClick={() => handleMenuItemClick('EvaluationPage')}
        >
          Resultat Formation
        </MenuItem>

        <MenuItem
          selected={selectedMenuItem === 'MyAttestationParticipation'}
          onClick={() => handleMenuItemClick('MyAttestationParticipation')}
        >
          Attestation Participation
        </MenuItem>

        <MenuItem
          selected={selectedMenuItem === 'AttestationAnimation'}
          onClick={() => handleMenuItemClick('AttestationAnimation')}
        >
          Attestation d’animation 
        </MenuItem>
        
        
        
        <MenuItem
          selected={selectedMenuItem === 'UPGRADE TO PRO'}
          onClick={() => setSelectedMenuItem('UPGRADE TO PRO')}
        >
          Compétence
        </MenuItem>
      </Sidebar>
      <MainContent>
        <Header>
          <SearchBar placeholder="Search here" />
          <UserInfo>
            <Avatar src={avatarImage} />
            <Username>{`${userName} ${userFirstName}` || 'Utilisateur'}</Username> {/* Display user's first and last name */}
          </UserInfo>
        </Header>
        <DashboardContent>
          {currentContent}
        </DashboardContent>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardParticipant;
