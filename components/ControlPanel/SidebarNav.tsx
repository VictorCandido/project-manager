"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { MenuItemInterface } from "@/types/MenuItemInterface"
import { controlPanelMenuItems } from "@/utils/menuItems"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {controlPanelMenuItems.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.link
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}