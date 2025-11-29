import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";
import Logo from "../Logo";

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

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <div className="flex items-center">
            <nav className="mr-4">
              <ul className="flex items-center">
                {menuItems.map((item) => (
                  <li key={item.label} className="px-4 py-2">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
