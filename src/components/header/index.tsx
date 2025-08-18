import Link from "next/link";
import React from "react";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
];

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <span className="flex items-center gap-4 text-2xl font-bold">
            LOGO
          </span>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
