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
      <div className="cart-page">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="empty-cart">
                <FaShoppingCart size={80} className="empty-cart-icon" />
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos incríveis ao seu carrinho!</p>
                <Button as={Link} to="/produtos" className="xiaomi-btn xiaomi-btn-primary">
                  Continuar Comprando
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Container>
        {/* Header */}
        <Row className="cart-header">
          <Col>
            <div className="d-flex align-items-center mb-3">
              <Button as={Link} to="/produtos" variant="link" className="p-0 me-3 text-dark">
                <BsArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="cart-title">Meu Carrinho</h1>
                <p className="cart-subtitle">Revise seus produtos antes de finalizar</p>
              </div>
              <Badge className="cart-badge">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
              </Badge>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Desktop Table */}
            <Card className="cart-items-card mb-4">
              <Card.Body className="p-0">
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
                              <div className="product-details">
                                <h6>{item.name}</h6>
                                <small>{item.brand}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="price-info">
                              {item.originalPrice && item.originalPrice > item.price && (
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
                                className="btn-quantity"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <FaMinus />
                              </Button>
                              <span className="quantity-display">{item.quantity}</span>
                              <Button
                                className="btn-quantity"
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
                              className="remove-btn"
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

            {/* Mobile Cards */}
            <div className="mobile-cart-items">
              {cartItems.map((item) => (
                <Card key={item.id} className="mobile-cart-item">
                  <Card.Body>
                    <div className="d-flex">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="mobile-product-thumb me-3"
                      />
                      <div className="mobile-product-details flex-grow-1">
                        <h6>{item.name}</h6>
                        <small className="text-muted">{item.brand}</small>
                        <div className="mobile-product-price">
                          <strong>{formatCurrency(item.price)}</strong>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <small className="text-muted text-decoration-line-through ms-2">
                              {formatCurrency(item.originalPrice)}
                            </small>
                          )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div className="quantity-controls">
                            <Button
                              className="btn-quantity"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <FaMinus />
                            </Button>
                            <span className="quantity-display">{item.quantity}</span>
                            <Button
                              className="btn-quantity"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <FaPlus />
                            </Button>
                          </div>
                          <Button
                            className="remove-btn"
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
              <Card.Body className="p-4">
                <h5 className="summary-title">Resumo do Pedido</h5>
                
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

                <div className="summary-line total">
                  <span>Total:</span>
                  <span className="total-price">{formatCurrency(total)}</span>
                </div>

                {/* Cupom Section
                <div className="coupon-section mt-4">
                  <Form.Label className="coupon-label">
                    <FaTag />
                    Cupom de Desconto
                  </Form.Label>
                  <div className="coupon-input-group">
                    <Form.Control
                      type="text"
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="coupon-input"
                    />
                    <Button 
                      className="coupon-btn"
                      onClick={handleApplyCoupon}
                    >
                      Aplicar
                    </Button>
                  </div>
                  {couponError && (
                    <Alert variant="danger" className="mt-2 py-2">
                      <small>{couponError}</small>
                    </Alert>
                  )}
                  {couponSuccess && (
                    <Alert variant="success" className="mt-2 py-2">
                      <small>{couponSuccess}</small>
                    </Alert>
                  )}
                </div>

                <div className="mt-3">
                  <small className="text-muted">
                    Cupons disponíveis: PRIMEIRA10, DESCONTO20, BLACKFRIDAY
                  </small>
                </div> */}

                <Button 
                  as={Link}
                  to="/checkout"
                  className="xiaomi-btn xiaomi-btn-primary w-100 mt-4"
                >
                  Finalizar Compra
                </Button>

                <Button 
                  as={Link}
                  to="/produtos"
                  className="xiaomi-btn xiaomi-btn-outline w-100 mt-2"
                >
                  Continuar Comprando
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;