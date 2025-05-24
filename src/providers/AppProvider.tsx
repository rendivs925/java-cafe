"use client";

import { useRouter } from "next/navigation";
import { addProductToCartAction } from "@/actions/addProductToCartAction";
import { ReactNode, ReactElement, useState, useEffect } from "react";
import { createContext } from "use-context-selector";
import {
  AppContextType,
  formattedDataType,
  TotalSalesData,
  User,
} from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { logoutAction } from "@/actions/logoutAction";

export const AppContext = createContext<AppContextType | null>(null);

export interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps): ReactElement {
  const router = useRouter();
  const defaultUser: User = {
    _id: "",
    username: "",
    email: "",
    role: "user",
    imgUrl: "",
  };

  const [user, setUser] = useLocalStorage<User>("user", defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useLocalStorage("totalItems", 0);
  const [detailPengiriman, setDetailPengiriman] = useLocalStorage(
    "detailPengiriman",
    { username: "", noHandphone: "", alamatLengkap: "" },
  );

  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(defaultUser);
      pushRoute("/");
    } catch (err) {
      const error = err as AxiosError;
      toast({ description: error.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    if (user._id === "") return setIsAuthenticated(false);

    setIsAuthenticated(true);
  }, [user._id, user.username, user.role, user.email]);

  const pushRoute = (route: string) => {
    router.push(route);
  };

  const addProductToCart = async (product: {
    productId: string;
    profit: number;
    title: string;
    imgUrl: string;
    price: number;
    stock: number;
    weight: number;
  }) => {
    if (product.stock === 0) {
      console.warn("Product is out of stock.");
      return;
    }

    try {
      const data = await addProductToCartAction({
        userId: user._id,
        products: [product],
      });

      setTotalItems((data?.totalItems as number) || 1);

      // if (data?.status === "success") {
      //   toast({ description: data.message });
      // }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + "K";
    }
    return String(value);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const formatToRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getTotalSalesData = (data: TotalSalesData[]) => {
    interface DataType {
      date: Date;
      value: number;
    }

    const monthlyData = data.reduce<DataType[]>((acc, { date, value }) => {
      const month = date.getMonth();
      if (!acc[month]) {
        acc[month] = { date, value };
      }
      acc[month].value += value;
      return acc;
    }, []);

    const formattedData: formattedDataType[] = monthlyData
      .filter((entry) => entry)
      .sort((a, b) => a.date.getMonth() - b.date.getMonth())
      .map(({ date, value }) => ({
        month: new Date(2024, date.getMonth(), 1).toLocaleString("default", {
          month: "long",
        }),
        value,
      }));

    return formattedData;
  };

  const contextValues: AppContextType = {
    pushRoute,
    setDetailPengiriman,
    detailPengiriman,
    setTotalItems,
    totalItems,
    handleLogout,
    formatToRupiah,
    formatNumber,
    formatDate,
    getTotalSalesData,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    addProductToCart,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
