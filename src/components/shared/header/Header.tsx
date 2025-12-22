import React from "react";
import { MenuItems, UserMenu } from "@/components/shared/header";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-stretch py-4">
          <div className="mr-4">
            <Logo />
          </div>
          <div className="grow-1">
            <MenuItems />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
