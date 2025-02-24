"use client";

import { IoIosArrowDroprightCircle } from "react-icons/io";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ViewAllButtonProps {
    href: string;
    text?: string;
    className?: string;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "text";
    size?: "sm" | "md" | "lg";
}

export default function ViewAllButton({
    href,
    text = "View All",
    className,
    icon = <IoIosArrowDroprightCircle className="size-6" />,
    variant = "default",
    size = "md",
}: ViewAllButtonProps) {
    const variants = {
        default: "text-red-500 hover:text-red-600",
        outline: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        text: "text-muted-foreground hover:text-foreground",
    };

    const sizes = {
        sm: "text-sm gap-1.5",
        md: "text-base gap-2",
        lg: "text-lg gap-2.5",
    };

    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center transition-all duration-300 shadow-sm px-3 py-1.5 rounded-full border border-border",
                variants[variant],
                sizes[size],
                className
            )}
        >
            <span>{text}</span>
            {icon}
        </Link>
    );
} 