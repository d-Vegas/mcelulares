// src/components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Form } from 'react-bootstrap';
import { BsCart3, BsSearch, BsList, BsX } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavbarComponent({ cartItemsCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao clicar em um link
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Prevenir scroll do body quando menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowMobileSearch(false);
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar 
        bg="white" 
        expand="lg" 
        className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`} 
        sticky="top"
        expanded={isOpen}
      >
        <div className="navbar-container w-100">
          <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Brand as={Link} to="/" className="brand" onClick={handleNavClick}>
              <img
                src="/images/logo.png"
                alt="Logo Mutuípe Celulares"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            
            {/* Mobile Icons */}
            <div className="d-lg-none mobile-header-icons">
              {/* <button 
                className="mobile-search-toggle"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <BsSearch size={20} />
              </button> */}
              
              <Link 
                to="/carrinho" 
                className="mobile-cart-icon"
                onClick={handleNavClick}
              >
                <BsCart3 size={20} />
                {cartItemsCount > 0 && (
                  <span className="mobile-cart-badge">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="navbar-toggler"
                onClick={toggleMenu}
              >
                {isOpen ? <BsX size={28} /> : <BsList size={24} />}
              </button>
            </div>
            
            <Navbar.Collapse id="basic-navbar-nav">
              {/* Mobile Search
              <div className="d-lg-none mobile-search-wrapper">
                <Form onSubmit={handleSearch} className="mobile-search-form">
                  <Form.Control
                    type="text"
                    placeholder="Buscar produtos..."
                    className="mobile-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <BsSearch className="mobile-search-icon" />
                </Form>
              </div> */}
              
              <Nav className="ms-auto align-items-center">
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className="nav-item"
                  onClick={handleNavClick}
                >
                  Início
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/produtos" 
                  className="nav-item"
                  onClick={handleNavClick}
                >
                  Smartphones
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/acessorios" 
                  className="nav-item"
                  onClick={handleNavClick}
                >
                  Acessórios
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/servicos" 
                  className="nav-item"
                  onClick={handleNavClick}
                >
                  Serviços
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/sobre" 
                  className="nav-item"
                  onClick={handleNavClick}
                >
                  Sobre
                </Nav.Link>
                
                {/* Desktop Search
                <div className="search-wrapper d-none d-lg-block">
                  <Form onSubmit={handleSearch} className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Buscar produtos..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <BsSearch 
                      className="search-icon" 
                      onClick={handleSearch}
                    />
                  </Form>
                </div> */}
                
                {/* Desktop Cart */}
                <Nav.Link 
                  as={Link} 
                  to="/carrinho" 
                  className="cart-icon-wrapper d-none d-lg-flex"
                  onClick={handleNavClick}
                >
                  <BsCart3 size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="cart-badge">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Nav.Link>
                
                {/* Mobile Cart in Menu */}
                <Nav.Link 
                  as={Link} 
                  to="/carrinho" 
                  className="cart-icon-wrapper d-lg-none"
                  onClick={handleNavClick}
                >
                  <div className="d-flex align-items-center">
                    <BsCart3 size={20} />
                    <span className="mobile-cart-text">Carrinho</span>
                  </div>
                  {cartItemsCount > 0 && (
                    <Badge className="cart-badge">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
      
      {/* Overlay */}
      <div 
        className={`navbar-overlay ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}

export default NavbarComponent;