interface NavbarLink {
  href: string;
  label: string;
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

export type { CartProduct, Contact, WorkingHour, NavbarLink, Product, Blog };
