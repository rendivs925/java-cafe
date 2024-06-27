import dynamic from "next/dynamic";

import Navbar from "./Navbar";
import Title from "./Title";
import ProductCard from "./ProductCard";
import BlogCard from "./BlogCard";
import ProductsList from "./ProductsList";
import BlogsList from "./BlogsList";
const CartProductsList = dynamic(() => import("./CartProductsList"), {
  ssr: false,
});
const OrderSummary = dynamic(() => import("./OrderSummary"));
import CartProductCard from "./CartProductCard";

export {
  BlogsList,
  ProductsList,
  BlogCard,
  Navbar,
  CartProductsList,
  Title,
  ProductCard,
  OrderSummary,
  CartProductCard,
};
