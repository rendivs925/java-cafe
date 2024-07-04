import React from "react";

interface NavbarLink {
  href: string;
  label: string;
}

interface AppContextType {
  moveRoute: (route: string) => void;
  formatToRupiah: (value: number) => string;
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
};
