// src/data/products.js
export const sampleProducts = [
  {
    id: 1,
    name: "Classic Gold Elegance Watch",
    brand: "LuxuryTime",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: null, // We'll use placeholder for now
    rating: 4.5,
    reviewCount: 128,
    gender: "men",
    badges: [{ type: "sale", text: "Sale" }],
    inStock: true
  },
  {
    id: 2,
    name: "Diamond Rose Gold Ladies Watch",
    brand: "Elegante",
    price: 599,
    originalPrice: null,
    discount: 0,
    image: null,
    rating: 4.8,
    reviewCount: 89,
    gender: "women",
    badges: [{ type: "new", text: "New" }],
    inStock: true
  },
  {
    id: 3,
    name: "Sport Chronograph Steel",
    brand: "SportTime",
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: null,
    rating: 4.2,
    reviewCount: 256,
    gender: "unisex",
    badges: [{ type: "limited", text: "Limited" }],
    inStock: true
  },
  {
    id: 4,
    name: "Vintage Leather Strap Watch",
    brand: "Heritage",
    price: 149,
    originalPrice: null,
    discount: 0,
    image: null,
    rating: 4.0,
    reviewCount: 67,
    gender: "men",
    badges: [],
    inStock: false
  },
  {
    id: 5,
    name: "Minimalist Silver Watch",
    brand: "ModernTime",
    price: 89,
    originalPrice: 119,
    discount: 25,
    image: null,
    rating: 4.3,
    reviewCount: 145,
    gender: "women",
    badges: [{ type: "sale", text: "Sale" }],
    inStock: true
  },
  {
    id: 6,
    name: "Smart Fitness Watch Pro",
    brand: "TechTime",
    price: 399,
    originalPrice: null,
    discount: 0,
    image: null,
    rating: 4.6,
    reviewCount: 312,
    gender: "unisex",
    badges: [{ type: "new", text: "New" }],
    inStock: true
  }
];
