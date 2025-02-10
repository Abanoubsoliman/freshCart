import React, { useContext, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { Avatar } from "@heroui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiHeart,
  FiList,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { setIsLoggedIn, isLoggedIn, userData } = useContext(authContext);

  const menuItems = [
    { name: "Home", icon: <FiHome className="text-lg" />, path: "/" },
    {
      name: "Categories",
      icon: <FiList className="text-lg" />,
      path: "/categories",
    },
    { name: "Brands", icon: <FiList className="text-lg" />, path: "/brands" },
    {
      name: "Cart",
      icon: <FiShoppingCart className="text-lg" />,
      path: "/cart",
    },
    {
      name: "Wishlist",
      icon: <FiHeart className="text-lg" />,
      path: "/wishlist",
    },
  ];

  function Logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <HeroUINavbar
    isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-600"
        />
        <Link to="/">
          <NavbarBrand className="gap-2">
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-32"
              src={logo}
              alt="logo"
            />
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {isLoggedIn && (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors
                  ${isActive ? "!text-green-600 font-medium" : ""}`
                  
                }
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="end" className="gap-4">
        {isLoggedIn ? (
          <Dropdown
            isOpen={isProfileMenuOpen}
            onOpenChange={setIsProfileMenuOpen}
          >
            <DropdownTrigger>
              <button className="outline-none">
                <Avatar
                  radius="full"
                  size="md"
                  isBordered
                  color="success"
                  classNames={{
                    base: "border-2 border-green-100",
                    icon: "text-green-600",
                  }}
                  name={userData?.name || ""}
                  src={userData?.avatar}
                />
              </button>
            </DropdownTrigger>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <DropdownMenu
                  as={motion.div}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  aria-label="Profile menu"
                  className="min-w-[240px] p-2 shadow-xl rounded-xl dropdown-menu"
                >
                  <DropdownItem key="profile" textValue="Profile">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar
                        size="sm"
                        name={userData?.name || ""}
                        src={userData?.avatar}
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {userData?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownItem>

                  <DropdownItem
                    key="changePassword"
                    textValue="Change Password"
                    className="px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <Link
                      to="/changePassword"
                      className="flex items-center gap-3"
                    >
                      <FiSettings className="text-gray-600" />
                      <span className="text-sm">Change Password</span>
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    textValue="Logout"
                    className="px-3 py-2 rounded-lg hover:bg-red-50"
                  >
                    <button
                      onClick={Logout}
                      className="flex items-center gap-3 w-full text-red-600"
                    >
                      <FiLogOut className="text-gray-600" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                to="/login"
                variant="flat"
                className="bg-green-50 text-green-700 hover:bg-green-100"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/register"
                color="success"
                variant="shadow"
                className="shadow-green-200"
              >
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {isLoggedIn && (
        <NavbarMenu className="px-4">
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </HeroUINavbar>
  );
}
