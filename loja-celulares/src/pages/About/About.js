// src/pages/About/About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <h1 className="mb-4">Quem Somos</h1>
          <p className="lead">
            A CellStore é a sua loja de confiança para encontrar os melhores smartphones do mercado.
          </p>
          <p>
            Com anos de experiência no mercado, oferecemos produtos de qualidade, 
            preços competitivos e atendimento excepcional.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;