// src/pages/Products/Products.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Products.css';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    inStock: false,
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let result = [...products];

    // Filtro por marca
    if (filters.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }

    // Filtro por faixa de preço
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(p => {
        if (max) {
          return p.price >= min && p.price <= max;
        } else {
          return p.price >= min;
        }
      });
    }

    // Filtro por disponibilidade
    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance - produtos em destaque primeiro
        result.sort((a, b) => b.featured - a.featured);
    }

    setFilteredProducts(result);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      priceRange: '',
      inStock: false,
      sortBy: 'relevance'
    });
  };

  const brands = [...new Set(products.map(p => p.brand))];

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="products-page py-4">
      <div className="page-header mb-4">
        <h1>Nossos Produtos</h1>
        <p className="text-muted">
          Encontre o smartphone perfeito para você
        </p>
      </div>

      <Row>
        {/* Filtros Desktop */}
        <Col lg={3} className="d-none d-lg-block">
          <div className="filters-container">
            <div className="filters-header">
              <h5>Filtros</h5>
              <Button
                variant="link"
                size="sm"
                onClick={clearFilters}
                className="text-decoration-none"
              >
                Limpar
              </Button>
            </div>

            <Form>
              <Form.Group className="mb-4">
                <Form.Label>Marca</Form.Label>
                <Form.Select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                >
                  <option value="">Todas as marcas</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Faixa de Preço</Form.Label>
                <Form.Select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">Todos os preços</option>
                  <option value="0-2000">Até R$ 2.000</option>
                  <option value="2000-4000">R$ 2.000 - R$ 4.000</option>
                  <option value="4000-6000">R$ 4.000 - R$ 6.000</option>
                  <option value="6000">Acima de R$ 6.000</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Apenas produtos disponíveis"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
              </Form.Group>
            </Form>
          </div>
        </Col>

        {/* Produtos */}
        <Col lg={9}>
          {/* Barra de ordenação e filtro mobile */}
          <div className="toolbar mb-4">
            <Button
              variant="outline-secondary"
              className="d-lg-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="me-2" />
              Filtros
            </Button>

            <div className="ms-auto d-flex align-items-center">
              <span className="me-2 text-muted">Ordenar por:</span>
              <Form.Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-auto"
              >
                <option value="relevance">Relevância</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="name">Nome</option>
              </Form.Select>
            </div>
          </div>

          {/* Resultados */}
          <div className="results-info mb-3">
            <p className="text-muted mb-0">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          {/* Grid de produtos */}
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center py-5">
                  <p className="text-muted">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                  <Button variant="primary" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {/* Filtros Mobile Modal */}
      <div className={`mobile-filters ${showFilters ? 'show' : ''}`}>
        <div className="mobile-filters-header">
          <h5>Filtros</h5>
          <Button
            variant="link"
            onClick={() => setShowFilters(false)}
          >
            <FaTimes />
          </Button>
        </div>
        <div className="mobile-filters-body">
          {/* Mesmo conteúdo dos filtros desktop */}
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Marca</Form.Label>
              <Form.Select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">Todas as marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Faixa de Preço</Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Todos os preços</option>
                <option value="0-2000">Até R$ 2.000</option>
                <option value="2000-4000">R$ 2.000 - R$ 4.000</option>
                <option value="4000-6000">R$ 4.000 - R$ 6.000</option>
                <option value="6000">Acima de R$ 6.000</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="Apenas produtos disponíveis"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              />
            </Form.Group>
          </Form>

          <div className="mobile-filters-footer">
            <Button
              variant="secondary"
              onClick={clearFilters}
              className="me-2"
            >
              Limpar
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowFilters(false)}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Products;