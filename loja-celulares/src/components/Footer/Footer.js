// src/components/Footer/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { BsPhone, BsEnvelope, BsGeoAlt } from 'react-icons/bs';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="footer-title">CellStore</h5>
            <p className="footer-description">
              Sua loja de confiança para encontrar os melhores smartphones do mercado.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><FaFacebook /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaWhatsapp /></a>
            </div>
          </Col>
          
          <Col lg={4} md={6} className="mb-4">
            <h5 className="footer-title">Links Rápidos</h5>
            <ul className="footer-links">
              <li><a href="/produtos">Produtos</a></li>
              <li><a href="/sobre">Sobre Nós</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </Col>
          
          <Col lg={4} md={12} className="mb-4">
            <h5 className="footer-title">Contato</h5>
            <div className="contact-info">
              <p><BsPhone /> (11) 1234-5678</p>
              <p><BsEnvelope /> contato@cellstore.com.br</p>
              <p><BsGeoAlt /> São Paulo, SP - Brasil</p>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row>
          <Col className="text-center">
            <p className="copyright">
              © 2024 CellStore. Todos os direitos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;