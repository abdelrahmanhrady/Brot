import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterText>
        Footer 
        Content*
      </FooterText>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 165px;
  background: #000b33;
  border-radius: 0px;

`;

const FooterText = styled.p`
  position: absolute;
  text-align: center;
  top: 50%;
  left:50%;
  z-index: 1;
  color: white;

`;


export default Footer;
