import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { PiCoffeeFill } from "react-icons/pi";
import { IoCart } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { GrAnalytics } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { BiSolidLogOut } from "react-icons/bi";
import Link from "next/link";

const links = [
  { href: "/", label: "Dashboard", isActive: true, icon: <RiDashboardFill fontSize="24" /> },
  { href: "/about", label: "Products", isActive: false, icon: <PiCoffeeFill fontSize="24" /> },
  { href: "/services", label: "Orders", isActive: false, icon: <IoCart fontSize="24" /> },
  { href: "/contact", label: "Sales", isActive: false, icon: <TbReportMoney fontSize="24" /> },
  { href: "/contact", label: "Reports", isActive: false, icon: <GrAnalytics fontSize="24" /> },
  { href: "/contact", label: "Settings", isActive: false, icon: <IoMdSettings fontSize="24" /> },
  { href: "/contact", label: "Logout", isActive: false, icon: <BiSolidLogOut fontSize="24" /> },
];

const Sidebar = () => {
  return (
    <aside className="h-screen py-12 bg-secondary w-[330px] text-white px-6 sticky top-0">
      <h1 className="mb-12">Java Cafe</h1>
      <ul className="space-y-4">
        {links.map(({ href, label, isActive, icon }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={`flex hover:after:hidden items-center px-8 py-4 rounded-lg space-x-4 w-full transition-all duration-300 ${
                isActive ? "bg-primary" : "bg-transparent hover:bg-primary"
              }`}
            >
              {icon}
              <span className="text-muted-foreground">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
