"use client";
import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { PiCoffeeFill } from "react-icons/pi";
import { IoCart } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { GrAnalytics } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { BiSolidLogOut } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <RiDashboardFill className="text-2xl" />,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: <PiCoffeeFill className="text-2xl" />,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: <IoCart className="text-2xl" />,
  },
  {
    href: "/admin/sales",
    label: "Sales",
    icon: <TbReportMoney className="text-2xl" />,
  },
  {
    href: "/admin/reports",
    label: "Reports",
    icon: <GrAnalytics className="text-2xl" />,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: <IoMdSettings className="text-2xl" />,
  },
  {
    href: "/auth/logout",
    label: "Logout",
    icon: <BiSolidLogOut className="text-2xl" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="h-screen py-12 bg-background w-full max-w-[300px] text-white px-6 sticky min-h-svh top-0 bottom-0">
      <h1 className="mb-12 text-foreground justify-center flex gap-4">
        Cafe{" "}
        <span className="text-foreground">
          <PiCoffeeFill />
        </span>
      </h1>
      <ul className="space-y-4">
        {links.map(({ href, label, icon }, index) => (
          <li key={index} className="group">
            <Link
              href={href}
              className={`flex hover:after:hidden items-center px-8 py-4 rounded-lg space-x-4 w-full transition-all duration-300 ${
                pathname === href
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:bg-primary/85 group-hover:text-primary-foreground/85"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
