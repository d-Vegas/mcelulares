// src/data/productsData.js
export const products = [
  {
    id: 1,
    name: "Xiaomi Redmi Note 12 Pro",
    brand: "Xiaomi",
    price: 1899.00,
    originalPrice: 2199.00,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    specs: {
      screen: '6.67" AMOLED 120Hz',
      processor: "MediaTek Dimensity 1080",
      ram: "8GB",
      storage: "256GB",
      camera: "50MP + 8MP + 2MP",
      battery: "5000mAh"
    },
    inStock: true,
    featured: true,
    description: "Smartphone com tela AMOLED de alta qualidade e câmera profissional"
  },
  {
    id: 2,
    name: "Samsung Galaxy A54 5G",
    brand: "Samsung",
    price: 2299.00,
    originalPrice: 2599.00,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    specs: {
      screen: '6.4" Super AMOLED 120Hz',
      processor: "Exynos 1380",
      ram: "8GB",
      storage: "256GB",
      camera: "50MP + 12MP + 5MP",
      battery: "5000mAh"
    },
    inStock: true,
    featured: true,
    description: "Galaxy A54 com 5G e sistema de câmeras avançado"
  },
  {
    id: 3,
    name: "iPhone 13",
    brand: "Apple",
    price: 4999.00,
    originalPrice: 5499.00,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=400&fit=crop",
    specs: {
      screen: '6.1" Super Retina XDR',
      processor: "A15 Bionic",
      ram: "6GB",
      storage: "128GB",
      camera: "12MP + 12MP",
      battery: "3240mAh"
    },
    inStock: true,
    featured: false,
    description: "iPhone 13 com chip A15 Bionic e sistema de câmera dupla"
  },
  {
    id: 4,
    name: "Motorola Edge 40",
    brand: "Motorola",
    price: 2799.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    specs: {
      screen: '6.55" P-OLED 144Hz',
      processor: "MediaTek Dimensity 8020",
      ram: "8GB",
      storage: "256GB",
      camera: "50MP + 13MP",
      battery: "4400mAh"
    },
    inStock: true,
    featured: false,
    description: "Edge 40 com tela de 144Hz para máxima fluidez"
  },
  {
    id: 5,
    name: "POCO X5 Pro 5G",
    brand: "Xiaomi",
    price: 1599.00,
    originalPrice: 1999.00,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    specs: {
      screen: '6.67" AMOLED 120Hz',
      processor: "Snapdragon 778G",
      ram: "8GB",
      storage: "256GB",
      camera: "108MP + 8MP + 2MP",
      battery: "5000mAh"
    },
    inStock: false,
    featured: true,
    description: "POCO X5 Pro com câmera de 108MP e carregamento rápido"
  },
  {
    id: 6,
    name: "Realme 11 Pro+",
    brand: "Realme",
    price: 2199.00,
    originalPrice: 2499.00,
    image: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?w=400&h=400&fit=crop",
    specs: {
      screen: '6.7" AMOLED 120Hz',
      processor: "MediaTek Dimensity 7050",
      ram: "12GB",
      storage: "512GB",
      camera: "200MP + 8MP + 2MP",
      battery: "5000mAh"
    },
    inStock: true,
    featured: false,
    description: "Realme 11 Pro+ com impressionante câmera de 200MP"
  }
];
