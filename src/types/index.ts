import React, { Dispatch, SetStateAction } from "react";

interface ChartData {
  product: string;
  name: string;
  totalSales: number;
  fill: string;
  color: string;
}

interface User {
  username: string;
  email: string;
  role: "admin" | "user";
}

interface formattedDataType {
  month: string;
  value: number;
}

interface NavbarLink {
  href: string;
  label: string;
}

interface TotalSalesData {
  value: number;
  date: Date;
}

interface AppContextType {
  user: User;
  handleLogout: () => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUser: (value: User | ((val: User) => User)) => void;
  moveRoute: (route: string) => void;
  formatToRupiah: (value: number) => string;
  formatNumber: (value: number) => string;
  formatDate: (date: Date) => string;
  getTotalSalesData: (data: TotalSalesData[]) => formattedDataType[];
  cartProductList: CartProduct[];
  setCartProductList: (
    value: CartProduct[] | ((val: CartProduct[]) => CartProduct[])
  ) => void;
  updateQuantity: (productId: number, operation: Operation) => void;
}

interface CartProduct extends Omit<Product, "description"> {
  qty: number;
}

type Operation = "increment" | "decrement";

interface Product {
  id: string;
  title: string;
  stock: number;
  price: number;
  imgUrl: string;
  category: string;
  description: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

interface WorkingHour {
  days: string;
  timesOpen: string;
}

interface Contact {
  title: string;
  value: string;
}

interface ShippingContextType {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  incrementStep: () => void;
}

export type {
  Product,
  ShippingContextType,
  AppContextType,
  Contact,
  WorkingHour,
  NavbarLink,
  Blog,
  TotalSalesData,
  formattedDataType,
  ChartData,
  CartProduct,
  Operation,
  User,
};
