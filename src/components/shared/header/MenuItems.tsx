import Link from "next/link";
import React from "react";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Posts",
    href: "/posts",
  },
  {
    label: "About Us",
    href: "/aboutus",
  },
];

const MenuItems = () => {
  return (
    <nav className="mr-4 flex items-center">
      <ul className="flex items-center">
        {menuItems.map((item) => (
          <li key={item.label} className="px-4 py-2">
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuItems;
