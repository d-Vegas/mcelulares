// src/utils/masks.js

// Máscara para telefone
export const phoneMask = (value) => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
};

// Máscara para CEP
export const cepMask = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

// Máscara para aceitar apenas números
export const numberMask = (value) => {
  return value.replace(/\D/g, '').slice(0, 11);
};

// Validação de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de CEP
export const validateCEP = (cep) => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
};

// Buscar CEP na API dos Correios
export const fetchCEPData = async (cep) => {
  const cleanCEP = cep.replace(/\D/g, '');
  
  if (cleanCEP.length !== 8) {
    throw new Error('CEP deve ter 8 dígitos');
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return {
      address: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || ''
    };
  } catch (error) {
    throw new Error('Erro ao buscar CEP. Verifique sua conexão.');
  }
};