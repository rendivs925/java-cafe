import { Blog, Contact, NavbarLink, WorkingHour } from "@/types";

const COOKIE_NAME = "user-token";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
    href: "/products",
    label: "Products",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
  {
    href: "/#contact",
    label: "Contact",
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

export {
  navbarLinks,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_MIME_TYPES,
  workingHours,
  COOKIE_NAME,
  contactUs,
  blogs,
  BASE_URL,
};
