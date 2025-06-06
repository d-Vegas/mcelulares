// src/utils/formatters.js

/**
 * Formata um valor numérico como moeda (R$).
 * Exemplo: formatCurrency(1999.99) -> "R$ 1.999,99"
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Calcula o desconto percentual entre o preço atual e o preço original.
 * Retorna um número inteiro arredondado (por exemplo, 20 para 20%).
 */
export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  const discount = ((originalPrice - price) / originalPrice) * 100;
  return Math.round(discount);
}
