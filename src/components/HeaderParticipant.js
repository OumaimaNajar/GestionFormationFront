import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import treeImage from '../images/télécharger1.jpg';

const HeaderParticipant = () => {
  const userName = localStorage.getItem('userName');
  const userFirstName = localStorage.getItem('userFirstName');

  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src={treeImage} alt="Logo" />
        </Link>
      </Logo>
      <NavMenu>
        <StyledLink to="/">
          <span>Home</span>
        </StyledLink>
        <StyledLink to="/formations">
          <span>Formation</span>
        </StyledLink>
        <StyledLink to="/allEvaluations">
          <span>Évaluations</span>
        </StyledLink>
        <StyledLink to="/QuizPage">
          <span>Quiz</span>
        </StyledLink>
        <StyledLink to="/dashboard-participant">
          <span>Profil</span>
        </StyledLink>
        <StyledLink to="/about">
          <span>À propos</span>
        </StyledLink>
      </NavMenu>
      <UserSection>
        <FaUserCircle style={{ marginRight: '10px', fontSize: '30px', color: '#fff' }} /> {/* Icône utilisateur */}
        <UserName to="/dashboard-participant">{userFirstName} {userName}</UserName>
        <Login to="/">Déconnexion</Login>
      </UserSection>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  background-color: red;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  width: 60px;
  align-items: center;

  img {
    width: 100%;
    border-radius: 50px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media (max-width: 548px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 12px;

  span {
    color: rgb(255, 255, 255);
    font-size: 14px;
    letter-spacing: 1px;
    position: relative;
    transition: font-size 0.3s ease, text-shadow 0.3s ease;

    &:before {
      background-color: rgb(255, 255, 255);
      border-radius: 0 0 4px 4px;
      bottom: -6px;
      content: "";
      height: 2px;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      transform-origin: left center;
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      visibility: hidden;
      width: auto;
    }
  }

  &:hover {
    span {
      font-size: 16px;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
    }

    span:before {
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled(Link)`
  margin-right: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  transition: font-size 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    font-size: 16px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
  }
`;

const Login = styled(Link)`
  color: #ffffff;
  background-color: black;
  padding: 8px 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  border: none;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c0392b;
    color: #ffffff;
    border-color: transparent;
  }
`;

export default HeaderParticipant;
