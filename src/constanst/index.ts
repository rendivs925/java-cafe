import { Blog, Contact, NavbarLink, Product, WorkingHour } from "@/types";

const COOKIE_NAME = "user-token";

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

export { navbarLinks, workingHours, COOKIE_NAME, contactUs };
