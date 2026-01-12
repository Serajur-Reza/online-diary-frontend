"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/tailwind-merge";
import { userInfo } from "@/utils/auth";
import { deleteCookie } from "cookies-next/client";

const navigation = [
  { name: "Home", href: "/" },
  // { name: "Calendar", href: "/calendar" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const res = userInfo();

    setUser(res);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        // variant="ghost"
        // size="icon"
        className="fixed left-4 top-4 z-60 lg:hidden"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <span className="text-sm font-bold text-sidebar-primary-foreground">
              A
            </span>
          </div> */}
          <span className="text-lg font-semibold text-sidebar-foreground">
            Online Diary
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {/* <item.icon className="h-4 w-4" /> */}
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Secondary navigation */}
          {/* <div className="pt-4">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Support
            </p>
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div> */}
        </nav>

        {/* User profile section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent">
            {/* <Avatar className="h-9 w-9">
              <AvatarImage src="/professional-headshot.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar> */}
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-sidebar-foreground">
                {user?.username}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button
              // variant="ghost"
              // size="icon"
              className="h-8 w-8 text-muted-foreground cursor-pointer hover:text-sidebar-foreground"
              aria-label="Logout"
              onClick={() => {
                deleteCookie("refreshToken");
                localStorage?.removeItem("accessToken");
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
