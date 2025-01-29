"use client";
import { Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImPower } from "react-icons/im";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TopNav() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false);
            } else { // scrolling up
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    // Trending items
    const trendingItems = [
        "Top 10 Best Movies of 2018 So Far: Great Movies To Watch Now",
        "Breaking: Market Crash Expected Soon",
        "New iPhone Leaks Show Shocking Design",
    ];

    return (
        <div className={cn(
            "bg-background border-b transition-transform duration-300",
            !isVisible && "-translate-y-full"
        )}>
            <div className="container flex flex-col md:flex-row items-center justify-between py-2">
                {/* Left: Trending label + slider */}
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                    <ImPower className="size-3 sm:size-4 text-primary" />
                    <span className="bg-primary text-primary-foreground text-xs sm:text-sm px-2 py-1 rounded">
                        Trending
                    </span>
                    <div className="w-64 md:w-96">
                        <Slider {...settings}>
                            {trendingItems.map((item, idx) => (
                                <div key={idx}>
                                    <p className="text-xs sm:text-sm truncate text-foreground/80">{item}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Right: date/time + social icons */}
                <div className="flex items-center text-xs sm:text-sm space-x-4">
                    <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-foreground/80" />
                        <span>{new Date().toLocaleString()}</span>
                    </div>
                    {/* Social icons placeholder */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="cursor-pointer text-blue-600"
                    >
                        <Facebook className="size-4 sm:size-5 text-foreground/80" />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="cursor-pointer text-sky-400"
                    >
                        <Twitter className="size-4 sm:size-5 text-foreground/80" />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="cursor-pointer text-pink-500"
                    >
                        <Instagram className="size-4 sm:size-5 text-foreground/80" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
