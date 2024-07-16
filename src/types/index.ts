import React from "react";

interface ChartData {
  product: string;
  name: string;
  totalSales: number;
  fill: string;
  color: string;
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
  moveRoute: (route: string) => void;
  formatToRupiah: (value: number) => string;
  formatNumber: (value: number) => string;
  formatDate: (date: Date) => string;
  getTotalSalesData: (data: TotalSalesData[]) => formattedDataType[];
  handleSelectChange: (value: string) => void;
  totalDays: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imgUrl: string;
}

interface CartProduct {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  category: string;
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
  CartProduct,
  ShippingContextType,
  AppContextType,
  Contact,
  WorkingHour,
  NavbarLink,
  Product,
  Blog,
  TotalSalesData,
  formattedDataType,
  ChartData,
};
