import React from 'react';
import styled from 'styled-components';


// Styles pour le footer
const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`

const FooterText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
`;

const FooterLink = styled.a`
  margin: 0 10px;
  font-size: 14px;
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
;

const Footer = () => {
  return (

    
    <FooterContainer>
      <FooterText>© 2024, made with <span role="img" aria-label="heart">❤️</span> by Esprit DSI. Tous droits réservés.</FooterText>
        <FooterLinks>
          <FooterLink href="#">Creative Tim</FooterLink>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">License</FooterLink>
        </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;