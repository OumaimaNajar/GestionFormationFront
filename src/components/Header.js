import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom'; // Assurez-vous que react-router-dom est installé et importé
import treeImage from '../images/télécharger1.jpg';

const Header = () => {
  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src={treeImage} alt="Logo" />
        </Link>
      </Logo>
      <NavMenu>
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/"> 
          <span>Formation</span>
        </Link>
        <Link to="/allEvaluations"> 
          <span>Evaluations</span>
        </Link>
        
        <Link to="/about">
          <span>About us</span>
        </Link>
        <Link to="/contact">
          <span>Contact us</span>
        </Link>
      </NavMenu>
      
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
  height: 90px;
  display: flex;
  justify-content:center;
  padding: 0 30px;
  align-items: center;
  z-index: 1000; /* Assurez-vous que le Header est au-dessus des autres contenus */
`;

const Logo = styled.div`
  width: 80px;
  align-items: left;

  img {
    width: 90%;
    border-radius: 50px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: 30px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 12px;

    span {
      color: rgb(249, 249, 249);
      font-size: 18px;
      letter-spacing: 1px;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
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
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 548px) {
    display: none;
  }
`;

const Login = styled(Link)` /* Changement ici */
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 16px;
  margin-right: 45px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  text-decoration: none; /* Enlever la décoration du texte pour le rendre comme un bouton */

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

export default Header;
