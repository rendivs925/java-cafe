import { Blog, Contact, NavbarLink, Product, WorkingHour } from "@/types";

const navbarLinks: NavbarLink[] = [
  {
    href: "/#hero",
    label: "Home",
  },
  {
    href: "/#about",
    label: "About",
  },
  {
    href: "/#products",
    label: "Products",
  },
  {
    href: "/#blog",
    label: "Blog",
  },
  {
    href: "/#contact",
    label: "Contact",
  },
];

const products: Product[] = [
  {
    id: 1,
    title: "Luwak Coffee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae,",
    price: 23,
    imgUrl: "/images/product-1.jpg",
    category: "Coffee",
    stock: 30,
  },
  {
    id: 2,
    title: "Luwak Coffee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae,",
    price: 23,
    imgUrl: "/images/product-2.jpg",
    category: "Coffee",
    stock: 50,
  },
  {
    id: 3,
    title: "Luwak Coffee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae,",
    price: 23,
    imgUrl: "/images/product-3.jpg",
    category: "Coffee",
    stock: 40,
  },
];

const blogs: Blog[] = [
  {
    id: 1,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
    imgUrl: "/images/blog-image-1.jpg",
  },
  {
    id: 2,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
    imgUrl: "/images/blog-image-2.jpg",
  },
  {
    id: 3,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
    imgUrl: "/images/blog-image-3.jpg",
  },
];

const workingHours: WorkingHour[] = [
  {
    days: "Sunday - Thursday",
    timesOpen: "08:00am - 09:00pm",
  },
  {
    days: "Only Friday",
    timesOpen: "03:00pm - 09:00pm",
  },
  {
    days: "Saturday",
    timesOpen: "Closed",
  },
];

const contactUs: Contact[] = [
  {
    title: "Locations",
    value: "123 Coffee St.",
  },
  {
    title: "Email Address",
    value: "hardleberg@gmail.com",
  },
  {
    title: "Phone Number",
    value: "(123) 456-7860",
  },
];

export { navbarLinks, workingHours, contactUs, products, blogs };
