// src/pages/Home/Home.js
import React from 'react';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTruck, FaShieldAlt, FaCreditCard, FaHeadset, FaStar } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/helpers';
import FadeInSection from '../../components/FadeInSection';
import './Home.css';

function Home() {
  const featuredProducts = products ? products.slice(0, 3) : [];
  const specialOffers = products ? products.filter(p => p.discount > 20).slice(0, 2) : [];

  return (
    <>
      {/* Banner Hero - Carrossel */}
      <Carousel className="hero-carousel" interval={4000} indicators={true} controls={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/teste2.jpg"
            alt="Redmi Note 14 Pro 5G"
          />
          <Carousel.Caption>
            <h1 className="hero-title">Redmi Note 14 Pro 5G</h1>
            <p className="hero-subtitle">
              Fotos icônicas, crie com <span className="ai-highlight">AI</span>
            </p>
            <p className="hero-processor">MediaTek Dimensity 7300-Ultra</p>
            <Button as={Link} to="/produtos" className="btn-carrosel">
              Saiba mais
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/teste.jpg"
            alt="iPhone 15 Pro Max"
          />
          <Carousel.Caption>
            <h1 className="hero-title">iPhone 15 Pro Max</h1>
            <p className="hero-subtitle">
              Tecnologia <span className="ai-highlight">Pro</span> ao seu alcance
            </p>
            <p className="hero-processor">Chip A17 Pro • Titânio • Câmera de 48MP</p>
            <Button as={Link} to="/produtos" className="btn-carrosel">
              Comprar agora
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Features Section */}
      <FadeInSection>
        <section className="features-section">
          <Container>
            <Row className="g-4">
              <Col lg={3} md={6}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaTruck />
                  </div>
                  <h5 className="feature-title">Entrega Rápida</h5>
                  <p className="feature-text">Receba seu pedido em até 24 horas</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaShieldAlt />
                  </div>
                  <h5 className="feature-title">Compra Segura</h5>
                  <p className="feature-text">Seus dados protegidos sempre</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaCreditCard />
                  </div>
                  <h5 className="feature-title">Parcelamento</h5>
                  <p className="feature-text">Em até 12x sem juros no cartão</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <FaHeadset />
                  </div>
                  <h5 className="feature-title">Suporte Online</h5>
                  <p className="feature-text">Atendimento rápido e eficiente</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </FadeInSection>
      <FadeInSection>
        <section className="featured-products-section py-5 bg-light">
          <Container>
            <h2 className="featured-products-title text-center mb-5">Produtos em Destaque</h2>
            <Row>
              {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <Col lg={4} md={6} key={product.id} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center loading-text">Carregando produtos...</p>
                </Col>
              )}
            </Row>
            <div className="text-center mt-4">
              <Button as={Link} to="/produtos" variant="primary" size="lg" className="btn-view-all">
                Ver Todos os Produtos
              </Button>
            </div>
          </Container>
        </section>
      </FadeInSection>

      {/* Ofertas Especiais */}
      <FadeInSection>
        <section className="py-5 bg-light">
          <Container>
            <h2 className="text-center mb-5">Ofertas Imperdíveis</h2>
            <Row>
              {specialOffers.length > 0 ? (
                specialOffers.map(product => (
                  <Col lg={6} key={product.id} className="mb-4">
                    <Card className="offer-card h-100">
                      <Row className="g-0">
                        <Col md={5}>
                          <div className="offer-image-wrapper">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="img-fluid"
                            />
                            <div className="discount-badge">
                              -{product.discount}%
                            </div>
                          </div>
                        </Col>
                        <Col md={7}>
                          <Card.Body>
                            <h5>{product.name}</h5>
                            <div className="rating mb-2">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-warning" />
                              ))}
                            </div>
                            <p className="text-muted mb-3">{product.description}</p>
                            <div className="price-section">
                              <span className="old-price">{formatCurrency(product.originalPrice)}</span>
                              <span className="current-price">{formatCurrency(product.price)}</span>
                            </div>
                            <Button as={Link} to="/produtos" variant="primary" className="mt-3">
                              Ver Detalhes
                            </Button>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center">Sem ofertas especiais no momento.</p>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </FadeInSection>
      {/* Categorias */}
      <FadeInSection>
        <section className="py-5">
          <Container>
            <h2 className="text-center mb-5">Compre por Marca</h2>
            <Row>
              {['Apple', 'Samsung', 'Xiaomi', 'Motorola'].map((brand) => (
                <Col lg={3} md={6} key={brand} className="mb-4">
                  <Card className="brand-card h-100 text-center">
                    <Card.Body>
                      <h4 className="mb-3">{brand}</h4>
                      <Button as={Link} to="/produtos" variant="outline-primary">
                        Ver Produtos
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </FadeInSection>
    </>
  );
}

export default Home;
