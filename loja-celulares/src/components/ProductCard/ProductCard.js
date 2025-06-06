// src/components/ProductCard/ProductCard.js
import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <Card className="product-card h-100">
      {discount > 0 && (
        <Badge bg="danger" className="discount-badge">
          -{discount}%
        </Badge>
      )}

      {/* Se você quiser habilitar o botão de favorito, basta descomentar estas linhas */}
      {/* <button
        type="button"
        className="favorite-btn"
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <FaHeart className="text-danger" />
        ) : (
          <FaRegHeart />
        )}
      </button> */}

      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="product-brand">{product.brand}</div>
        <Card.Title className="product-name">{product.name}</Card.Title>

        <div className="product-specs">
          <small className="text-muted">
            {product.specs.screen} • {product.specs.ram} RAM
          </small>
        </div>

        <div className="mt-auto">
          <div className="price-container">
            {product.originalPrice > product.price && (
              <span className="original-price">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <div className="current-price">
              {formatCurrency(product.price)}
            </div>
            <small className="text-muted">em até 12x sem juros</small>
          </div>

          <Button
            variant={product.inStock ? 'primary' : 'secondary'}
            className={`add-to-cart-btn w-100 mt-3 ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {!product.inStock ? (
              'Indisponível'
            ) : isAdding ? (
              'Adicionado! ✓'
            ) : (
              <>
                <FaShoppingCart className="me-2" />
                Adicionar ao Carrinho
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
