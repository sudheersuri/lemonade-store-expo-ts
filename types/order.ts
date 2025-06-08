import { CartItem } from './beverage';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';


export interface CreateOrderResponse {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}