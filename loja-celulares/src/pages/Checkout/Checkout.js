// src/pages/Checkout/Checkout.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaShieldAlt, FaTruck, FaArrowLeft } from 'react-icons/fa';
import { BsCheck2Circle } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';
import { phoneMask, cepMask, numberMask, validateEmail, validateCEP, fetchCEPData } from '../../utils/masks';
import './Checkout.css';

function Checkout() {
  const { cartItems, getCartTotal } = useCart();
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [cepLoading, setCepLoading] = useState(false);

  // Função para gerar mensagem do WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "Olá! Tenho interesse nos seguintes produtos:\n\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Marca: ${item.brand}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preço unitário: ${formatCurrency(item.price)}\n`;
      message += `   Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`;
    });
    
    message += `*VALOR TOTAL: ${formatCurrency(getCartTotal())}\n\n`;
    
    if (customerData.name) {
      message += `*DADOS DO CLIENTE:\n`;
      message += `Nome: ${customerData.name}\n`;
      message += `Telefone: ${customerData.phone}\n`;
      if (customerData.email) message += `Email: ${customerData.email}\n`;
      
      if (customerData.address) {
        message += `\n* ENDEREÇO DE ENTREGA:\n`;
        message += `${customerData.address}, ${customerData.number}\n`;
        if (customerData.complement) message += `${customerData.complement}\n`;
        message += `${customerData.neighborhood} - ${customerData.city}/${customerData.state}\n`;
        message += `CEP: ${customerData.cep}\n`;
      }
    }
    
    return encodeURIComponent(message);
  };

  // Função para redirecionar para WhatsApp
  const handleWhatsAppRedirect = () => {
    if (!validateForm()) {
      return;
    }
    
    const phoneNumber = "5575988656597"; // SUBSTITUA PELO SEU NÚMERO
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    setShowSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    let maskedValue = value;
    
    // Aplicar máscaras conforme o campo
    switch (field) {
      case 'phone':
        maskedValue = phoneMask(value);
        break;
      case 'cep':
        maskedValue = cepMask(value);
        break;
      case 'number':
        maskedValue = numberMask(value);
        break;
      default:
        maskedValue = value;
    }
    
    setCustomerData(prev => ({
      ...prev,
      [field]: maskedValue
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Buscar CEP automaticamente
  const handleCEPChange = async (value) => {
    const maskedCEP = cepMask(value);
    handleInputChange('cep', maskedCEP);
    
    // Se CEP estiver completo, buscar dados
    if (validateCEP(maskedCEP)) {
      setCepLoading(true);
      try {
        const cepData = await fetchCEPData(maskedCEP);
        setCustomerData(prev => ({
          ...prev,
          address: cepData.address,
          neighborhood: cepData.neighborhood,
          city: cepData.city,
          state: cepData.state
        }));
        
        // Limpar possíveis erros de CEP
        setErrors(prev => ({
          ...prev,
          cep: ''
        }));
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          cep: error.message
        }));
      } finally {
        setCepLoading(false);
      }
    }
  };

  // Validar formulário
  const validateForm = () => {
    const newErrors = {};
    
    if (!customerData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!customerData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (customerData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos';
    }
    
    if (customerData.email && !validateEmail(customerData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (customerData.cep && !validateCEP(customerData.cep)) {
      newErrors.cep = 'CEP inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Se o carrinho estiver vazio, redirecionar
  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Seu carrinho está vazio</h2>
        <p className="text-muted mb-4">Adicione produtos para finalizar sua compra</p>
        <Button as={Link} to="/produtos" variant="primary">
          Ver Produtos
        </Button>
      </Container>
    );
  }

  if (showSuccess) {
    return (
      <Container className="py-5 text-center">
        <Row>
          <Col md={6} className="mx-auto">
            <div className="success-animation mb-4">
              <BsCheck2Circle size={80} className="text-success" />
            </div>
            <h2 className="text-success mb-3">Pedido Enviado!</h2>
            <p className="text-muted mb-4">
              Você será redirecionado para o WhatsApp em instantes...
            </p>
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="checkout-page">
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center mb-3">
              <Button as={Link} to="/carrinho" variant="link" className="p-0 me-3 text-dark">
                <FaArrowLeft size={20} />
              </Button>
              <h1 className="checkout-title mb-0">Finalizar Pedido</h1>
            </div>
            <p className="text-muted mb-0">Complete seus dados e finalize via WhatsApp</p>
          </Col>
        </Row>

        <Row>
          {/* Formulário */}
          <Col lg={7}>
            <Card className="xiaomi-card mb-4">
              <Card.Body className="p-4">
                <h5 className="section-title mb-4">Dados Pessoais</h5>
                
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="xiaomi-label">Nome Completo *</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`xiaomi-input ${errors.name ? 'is-invalid' : ''}`}
                        required
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="xiaomi-label">Telefone *</Form.Label>
                      <Form.Control
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={`xiaomi-input ${errors.phone ? 'is-invalid' : ''}`}
                        required
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="mb-4">
                      <Form.Label className="xiaomi-label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={customerData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`xiaomi-input ${errors.email ? 'is-invalid' : ''}`}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="xiaomi-card">
              <Card.Body className="p-4">
                <h5 className="section-title mb-4">Endereço de Entrega</h5>
                
                <Form>
                  <Row>
                    <Col md={4} className="mb-3">
                      <Form.Label className="xiaomi-label">CEP</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type="text"
                          value={customerData.cep}
                          onChange={(e) => handleCEPChange(e.target.value)}
                          placeholder="00000-000"
                          className={`xiaomi-input ${errors.cep ? 'is-invalid' : ''}`}
                        />
                        {cepLoading && (
                          <Spinner 
                            size="sm" 
                            className="position-absolute top-50 end-0 translate-middle-y me-3" 
                          />
                        )}
                        {errors.cep && <div className="invalid-feedback">{errors.cep}</div>}
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="xiaomi-label">Endereço</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="xiaomi-input"
                      />
                    </Col>
                    <Col md={2} className="mb-3">
                      <Form.Label className="xiaomi-label">Número</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        className="xiaomi-input"
                        placeholder="123"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4} className="mb-3">
                      <Form.Label className="xiaomi-label">Complemento</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        placeholder="Apt, sala, etc."
                        className="xiaomi-input"
                      />
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label className="xiaomi-label">Bairro</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        className="xiaomi-input"
                      />
                    </Col>
                    <Col md={2} className="mb-3">
                      <Form.Label className="xiaomi-label">Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="xiaomi-input"
                      />
                    </Col>
                    <Col md={2} className="mb-3">
                      <Form.Label className="xiaomi-label">Estado</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="BA"
                        className="xiaomi-input"
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Resumo do Pedido */}
          <Col lg={5}>
            <div className="sticky-summary">
              <Card className="xiaomi-card mb-4">
                <Card.Body className="p-4">
                  <h5 className="section-title mb-4">Resumo do Pedido</h5>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="product-summary-item">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="product-thumb"
                      />
                      <div className="product-details">
                        <h6 className="product-name">{item.name}</h6>
                        <small className="text-muted">{item.brand}</small>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span className="quantity-text">Qtd: {item.quantity}</span>
                          <div className="text-end">
                            {item.originalPrice && item.originalPrice > item.price && (
                              <small className="text-muted text-decoration-line-through d-block">
                                {formatCurrency(item.originalPrice)}
                              </small>
                            )}
                            <strong className="item-price">
                              {formatCurrency(item.price * item.quantity)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="total-section">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 total-label">Total:</h5>
                      <h5 className="mb-0 total-price">
                        {formatCurrency(getCartTotal())}
                      </h5>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Benefícios */}
              <Card className="xiaomi-card mb-4">
                <Card.Body className="p-4">
                  <div className="benefit-item">
                    <FaShieldAlt className="benefit-icon text-success" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="benefit-item">
                    <FaTruck className="benefit-icon text-primary" />
                    <span>Entrega rápida</span>
                  </div>
                </Card.Body>
              </Card>

              {/* Botão do WhatsApp */}
              <Button
                size="lg"
                className="whatsapp-btn w-100"
                onClick={handleWhatsAppRedirect}
                disabled={!customerData.name || !customerData.phone || cepLoading}
              >
                <FaWhatsapp className="me-2" size={24} />
                {cepLoading ? 'Carregando...' : 'Finalizar via WhatsApp'}
              </Button>

              {(!customerData.name || !customerData.phone) && (
                <Alert variant="warning" className="mt-3 mb-0">
                  <small>Preencha pelo menos nome e telefone para continuar</small>
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;