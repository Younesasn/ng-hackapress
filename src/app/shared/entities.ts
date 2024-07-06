export interface User {
  id: number;
  email: string;
  roles: string[];
  firstname: string;
  lastname: string;
  civility: Civility;
  address: string;
}

export interface UserRegister {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  civility: string;
  address: string;
}

export interface ICredentials {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface TokenDecoded {
  exp: number;
  iat: number;
  roles: string[];
  user_id: number;
  username: string;
} 

export interface OneItem {
  category: string;
  product: string;
  matter: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: number;
  name: string;
  orders: Order[];
}

export interface Order {
  id: number;
  date: string;
  totalPrice: number;
  customer: User;
  payment: Payment;
}

export interface Civility {
  id: number;
  wording: string;
  users: User[];
}

export interface Item {
  id: number;
  command: Order;
  product: Product;
  matter: Matter;
  status: Status;
  service: Service;
}

export interface Product {
  id: number;
  category: ProductCategory;
  name: string;
  description: string;
  picture: string;
  items: Item[];
}

export interface ProductCategory {
  id: number;
  name: string;
  parent: ProductCategory;
  productsCategories: ProductCategory[];
  products: Product[];
}

export interface Status {
  id: number;
  name: string;
  items: Item[];
}

export interface Service {
  id: number;
  category: ServiceCategory;
  name: string;
  description: string;
  picture: string;
  price: number;
  items: Item[];
}

export interface ServiceCategory {
  id: number;
  name: string;
  services: String[];
  startPrice: number;
  description: string;
  employees: Employee[];
}

export interface Employee {
  category: ServiceCategory;
}

export interface Matter {
  id: number;
  name: string;
  coeff: number;
  items: Item[];
}
