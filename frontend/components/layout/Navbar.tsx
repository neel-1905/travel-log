"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/spinner";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = ["Nice"];

  const { data, status } = useSession();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className=" bg-theme-bg"
      maxWidth="lg"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-gray-300">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              // size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {status === "authenticated" ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              //   isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{data?.user?.email}</p>
            </DropdownItem>

            <DropdownItem key="settings" href={`/`}>
              My Profile
            </DropdownItem>
            <DropdownItem key={`account_settings`} href="/">
              Account Settings
            </DropdownItem>
            <DropdownItem
              onClick={() => signOut()}
              key="logout"
              color="danger"
              className="text-danger-theme-danger"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : status === "loading" ? (
        <Spinner size="md" />
      ) : null}
    </Navbar>
  );
};

export default NavbarComponent;
