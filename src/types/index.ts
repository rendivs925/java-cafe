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

export type { Contact, WorkingHour, NavbarLink, Product, Blog };
