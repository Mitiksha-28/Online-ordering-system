/// <reference types="vite/client" />

export interface CartItem {
  id: string;
  title: string;
  image01: string;
  price: number;
  quantity: number;
  totalPrice: number;
  extraIngredients: any[];
}
export interface ProductItem {
  id: string;
  title: string;
  image01: string;
  image02: string;
  image03: string;
  category: string;
  desc: string;
  price: number;
  extraIngredients?: string[];
}
