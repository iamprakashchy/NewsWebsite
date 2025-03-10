"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  CircleUser,
  Cog,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebar } from "@/components/ui/Admin/sidebar-provider"

interface NavItemProps {
  title: string
  href: string
  icon: React.ElementType
  isActive?: boolean
  children?: React.ReactNode
  isCollapsed?: boolean
}

function NavItem({ title, href, icon: Icon, isActive, children, isCollapsed }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = Boolean(children)

  return (
    <li className="relative">
      {hasChildren ? (
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
            isActive && "bg-muted font-medium text-foreground",
            isCollapsed && "justify-center px-2",
          )}
          rightIcon={<ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5" />
            {!isCollapsed && <span>{title}</span>}
          </div>
        </Button>
      ) : (
        <Link href={href}>
          <Button
            variant="ghost"
            leftIcon={<Icon className="h-5 w-5" />}
            className={cn(
              "flex w-full items-center justify-start px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
              isActive && "bg-muted font-medium text-foreground",
              isCollapsed && "justify-center px-2",
            )}
          >
            {!isCollapsed && <span className="ml-3">{title}</span>}
          </Button>
        </Link>
      )}
      {hasChildren && isOpen && !isCollapsed && <ul className="ml-4 mt-1 border-l pl-2">{children}</ul>}
    </li>
  )
}

function NavSubItem({ title, href, isActive }: { title: string; href: string; isActive?: boolean }) {
  return (
    <li>
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-start px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
            isActive && "bg-muted font-medium text-foreground",
          )}
        >
          {title}
        </Button>
      </Link>
    </li>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          {isOpen && <span>Acme Admin</span>}
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-2">
          <ul className="space-y-1">
            <NavItem
              title="Dashboard"
              href="/dashboard"
              icon={LayoutDashboard}
              isActive={pathname === "/dashboard"}
              isCollapsed={!isOpen}
            />
            <NavItem
              title="Analytics"
              href="#"
              icon={BarChart3}
              isActive={pathname.startsWith("/analytics")}
              isCollapsed={!isOpen}
            >
              <NavSubItem title="Overview" href="/analytics" isActive={pathname === "/analytics"} />
              <NavSubItem title="Reports" href="/analytics/reports" isActive={pathname === "/analytics/reports"} />
              <NavSubItem title="Metrics" href="/analytics/metrics" isActive={pathname === "/analytics/metrics"} />
            </NavItem>
            <NavItem
              title="Products"
              href="#"
              icon={Package}
              isActive={pathname.startsWith("/products")}
              isCollapsed={!isOpen}
            >
              <NavSubItem title="All Products" href="/products" isActive={pathname === "/products"} />
              <NavSubItem title="Add Product" href="/products/new" isActive={pathname === "/products/new"} />
              <NavSubItem
                title="Categories"
                href="/products/categories"
                isActive={pathname === "/products/categories"}
              />
            </NavItem>
            <NavItem
              title="Orders"
              href="#"
              icon={ShoppingCart}
              isActive={pathname.startsWith("/orders")}
              isCollapsed={!isOpen}
            >
              <NavSubItem title="All Orders" href="/orders" isActive={pathname === "/orders"} />
              <NavSubItem title="Pending" href="/orders/pending" isActive={pathname === "/orders/pending"} />
              <NavSubItem title="Completed" href="/orders/completed" isActive={pathname === "/orders/completed"} />
            </NavItem>
            <NavItem
              title="Customers"
              href="/customers"
              icon={Users}
              isActive={pathname === "/customers"}
              isCollapsed={!isOpen}
            />
            <NavItem
              title="Reports"
              href="#"
              icon={FileText}
              isActive={pathname.startsWith("/reports")}
              isCollapsed={!isOpen}
            >
              <NavSubItem title="Sales" href="/reports/sales" isActive={pathname === "/reports/sales"} />
              <NavSubItem title="Inventory" href="/reports/inventory" isActive={pathname === "/reports/inventory"} />
              <NavSubItem
                title="Performance"
                href="/reports/performance"
                isActive={pathname === "/reports/performance"}
              />
            </NavItem>
          </ul>
          <div className="my-2 border-t" />
          <ul className="space-y-1">
            <NavItem
              title="Settings"
              href="/settings"
              icon={Cog}
              isActive={pathname === "/settings"}
              isCollapsed={!isOpen}
            />
            <NavItem
              title="Help & Support"
              href="/support"
              icon={LifeBuoy}
              isActive={pathname === "/support"}
              isCollapsed={!isOpen}
            />
            <NavItem
              title="Profile"
              href="/profile"
              icon={CircleUser}
              isActive={pathname === "/profile"}
              isCollapsed={!isOpen}
            />
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  )
}

