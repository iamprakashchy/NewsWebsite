"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu";
import { NAVIGATION_MENUS } from "./constants";
import { throttle } from "lodash";
import { cn } from "@/lib/utils";
import DarkModeToggle from "../DarkModeToggle";
import { SearchModal } from "../search-modal";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      className={cn(
        "nav-container",
        isScrolled ? "nav-scrolled" : "bg-transparent",
        "py-1 transition-transform duration-300 shadow-sm",
        !isVisible && "-translate-y-full"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between max-w-full">
          <Logo />

          <DesktopNavigation />

          <div className="flex items-center gap-2">
            <MobMenu Menus={NAVIGATION_MENUS} />
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex w-10 h-10  items-center justify-center rounded-full bg-background shadow-sm ">
                <SearchModal />
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

const Logo = () => (
  <Link
    href="/"
    className="text-2xl xl:text-3xl font-bold whitespace-nowrap text-primary font-rajdhani w-full h-auto max-w-[140px] sm:max-w-[180px] xl:max-w-[180px]"
  >
    <Image
      src="/images/logo-whitebg.png"
      alt="Hackintown"
      width={180}
      height={180}
      className="w-full h-full dark:hidden"
    />
    <Image
      src="/images/logo-blackbg.png"
      alt="Hackintown"
      width={180}
      height={180}
      className="w-full h-full dark:block hidden"
    />
  </Link>
);

const DesktopNavigation = () => (
  <nav className="hidden lg:flex items-center gap-2">
    <ul className="flex items-center gap-2 text-base">
      {NAVIGATION_MENUS.map((menu) => (
        <DesktopMenu key={menu.name} menu={menu} />
      ))}
    </ul>
  </nav>
);
