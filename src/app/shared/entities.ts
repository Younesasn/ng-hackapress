export interface ApiListResponse<T> {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:totalItems': number;
  'hydra:member': T[];
}

export interface ApiResponse {
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
}

export interface User {
  id: number;
  email: string;
  roles: string[];
  firstname: string;
  lastname: string;
  civility: string;
  address: string;
  orders: Order[];
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

export interface Item {
  id: number; 
  service: Service;
  picture: string;
  quantity: number;
  price: number;
  command: Order;
  product: Product;
  matter: Matter;
  status: Status;
}

export interface OneItem {
  id?: number;
  service: Service;
  category?: string;
  product: Product;
  matter: Matter;
  quantity: number;
  price: number;
  picture: string;
  status?: string;
}

export interface Payment {
  id: number;
  name: string;
  icon: string;
  orders: Order[];
}

export interface Order extends ApiResponse {
  id?: number;
  date: string;
  deposit?: string;
  totalPrice: number;
  payment: string;
  items: Item[];
}

export interface Civility {
  id: number;
  wording: string;
  users: User[];
}

export interface Product extends ApiResponse {
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

export interface Service extends ApiResponse {
  id: number;
  category: ServiceCategory;
  name: string;
  description: string;
  picture: string;
  price: number;
  items: Item[];
}

export interface Status {
  id: number;
  name: string;
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

export interface Matter extends ApiResponse {
  id: number;
  name: string;
  coeff: number;
  items: Item[];
}
