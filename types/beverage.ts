export interface BeverageSize {
  id: string;
  name: string;
  price: number;
  oz: number;
}

export interface Beverage {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: BeverageSize[];
  new?: boolean;
}

export interface CartItem {
  beverageId: string;
  sizeId: string;
  quantity: number;
  name: string;
  sizeName: string;
  price: number;
}