// src/pages/Cart/Cart.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaTag } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    
    // Cupons de exemplo
    const coupons = {
      'PRIMEIRA10': 10,
      'DESCONTO20': 20,
      'BLACKFRIDAY': 30
    };

    if (coupons[couponCode]) {
      setDiscount(coupons[couponCode]);
      setCouponSuccess(`Cupom aplicado! ${coupons[couponCode]}% de desconto`);
    } else {
      setCouponError('Cupom inválido');
      setDiscount(0);
    }
  };

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="empty-cart">
              <FaShoppingCart size={80} className="text-muted mb-4" />
              <h2>Seu carrinho está vazio</h2>
              <p className="text-muted mb-4">
                Adicione produtos incríveis ao seu carrinho!
              </p>
              <Button as={Link} to="/produtos" variant="primary" size="lg">
                Continuar Comprando
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="cart-page py-5">
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-4">
            <Link to="/produtos" className="text-decoration-none me-3">
              <BsArrowLeft size={24} />
            </Link>
            <h1 className="mb-0">Meu Carrinho</h1>
            <Badge bg="primary" className="ms-3">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
            </Badge>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="cart-items-card mb-4">
            <Card.Body>
              <div className="table-responsive">
                <Table className="cart-table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="product-info">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="product-thumb"
                            />
                            <div>
                              <h6 className="mb-1">{item.name}</h6>
                              <small className="text-muted">{item.brand}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="price-info">
                            {item.originalPrice && (
                              <small className="text-muted text-decoration-line-through d-block">
                                {formatCurrency(item.originalPrice)}
                              </small>
                            )}
                            <strong>{formatCurrency(item.price)}</strong>
                          </div>
                        </td>
                        <td>
                          <div className="quantity-controls">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <FaMinus />
                            </Button>
                            <span className="quantity-display">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <FaPlus />
                            </Button>
                          </div>
                        </td>
                        <td>
                          <strong>{formatCurrency(item.price * item.quantity)}</strong>
                        </td>
                        <td>
                          <Button
                            variant="link"
                            className="text-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          {/* Mobile Cart Items */}
          <div className="mobile-cart-items d-lg-none">
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="mobile-product-thumb me-3"
                    />
                    <div className="flex-grow-1">
                      <h6>{item.name}</h6>
                      <small className="text-muted">{item.brand}</small>
                      <div className="mt-2">
                        <strong>{formatCurrency(item.price)}</strong>
                        {item.originalPrice && (
                          <small className="text-muted text-decoration-line-through ms-2">
                            {formatCurrency(item.originalPrice)}
                          </small>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="quantity-controls">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <FaMinus />
                          </Button>
                          <span className="quantity-display">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash /> Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          <Card className="summary-card">
            <Card.Body>
              <h5 className="mb-4">Resumo do Pedido</h5>
              
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-line text-success">
                  <span>Desconto ({discount}%):</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <hr />

              <div className="summary-line total">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <Form className="mt-4">
               <Form.Group className="mb-3">
                  {/* <Form.Label className="d-flex align-items-center">
                    <FaTag className="me-2" />
                    Cupom de Desconto
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button 
                      variant="outline-primary" 
                      className="ms-2"
                      onClick={handleApplyCoupon}
                    >
                      Aplicar
                    </Button>
                  </div>
                  {couponError && (
                    <Alert variant="danger" className="mt-2 py-2">
                      {couponError}
                    </Alert>
                  )}
                  {couponSuccess && (
                    <Alert variant="success" className="mt-2 py-2">
                      {couponSuccess}
                    </Alert>
                  )} */}
                </Form.Group>
              </Form>

              {/* <div className="mt-3">
                <small className="text-muted">
                  Cupons disponíveis: PRIMEIRA10, DESCONTO20
                </small>
              </div> */}

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mt-4"
                as={Link}
                to="/checkout"
              >
                Finalizar Compra
              </Button>

              <Button 
                variant="outline-primary" 
                className="w-100 mt-2"
                as={Link}
                to="/produtos"
              >
                Continuar Comprando
              </Button>
            </Card.Body>
          </Card>

          {/* <Card className="mt-3">
            <Card.Body>
              <h6 className="mb-3">Calcular Frete</h6>
              <Form>
                <Form.Group>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Digite seu CEP"
                      maxLength="9"
                    />
                    <Button variant="outline-secondary" className="ms-2">
                      Calcular
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;