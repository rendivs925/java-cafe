"use client";

import { useRouter } from "next/navigation";
import { ReactNode, ReactElement, useState, useEffect } from "react";
import { createContext } from "use-context-selector";
import {
  AppContextType,
  CartProduct,
  formattedDataType,
  Operation,
  TotalSalesData,
  User,
} from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { logoutAction } from "@/actions/logoutAction";

// Create the context with a default value
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
  const [cartProductList, setCartProductList] = useLocalStorage<CartProduct[]>(
    "cartProductList",
    []
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logoutAction();
      setUser(defaultUser);
      moveRoute("/");
    } catch (err) {
      const error = err as AxiosError;
      toast({ description: error.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    if (user._id === "") return setIsAuthenticated(false);

    setIsAuthenticated(true);
  }, [user._id, user.username, user.role, user.email]);

  const moveRoute = (route: string) => {
    router.push(route);
  };

  const updateQuantity = (productId: number, operation: Operation) => {
    setCartProductList((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          if (operation === "increment" && item.qty < item.stock) {
            return { ...item, qty: item.qty + 1 };
          } else if (operation === "decrement" && item.qty > 1) {
            return { ...item, qty: item.qty - 1 };
          }
        }
        return item;
      })
    );
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(0) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "K";
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
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getTotalSalesData = (data: TotalSalesData[]) => {
    interface DataType {
      date: Date;
      value: number;
    }

    // Group by month and sum values
    const monthlyData = data.reduce<DataType[]>((acc, { date, value }) => {
      const month = date.getMonth(); // 0 for January, 1 for February, etc.
      if (!acc[month]) {
        acc[month] = { date, value };
      }
      acc[month].value += value;
      return acc;
    }, []);

    // Convert the array to a more readable format and sort by month
    const formattedData: formattedDataType[] = monthlyData
      .filter((entry) => entry) // Remove any undefined months
      .sort((a, b) => a.date.getMonth() - b.date.getMonth())
      .map(({ date, value }) => ({
        month: new Date(2024, date.getMonth(), 1).toLocaleString("default", {
          month: "long",
        }), // Get full month name
        value,
      }));

    return formattedData;
  };

  const contextValues: AppContextType = {
    moveRoute,
    updateQuantity,
    handleLogout,
    formatToRupiah,
    formatNumber,
    formatDate,
    getTotalSalesData,
    cartProductList,
    setCartProductList,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
