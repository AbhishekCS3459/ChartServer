import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../ui/LogoutButton";

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white h-[60px] z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          EnergyTrack
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/logs">Logs</NavLink>
          <NavLink href="/settings">Settings</NavLink>
          <ProfileMenu />
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-white"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-black bg-opacity-95 p-4">
          <div className="flex flex-col space-y-2">
            <NavLink href="/dashboard" onClick={toggleMenu}>
              Dashboard
            </NavLink>
            <NavLink href="/logs" onClick={toggleMenu}>
              Logs
            </NavLink>
            <NavLink href="/settings" onClick={toggleMenu}>
              Settings
            </NavLink>
            <NavLink href="/profile" onClick={toggleMenu}>
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-white hover:text-gray-300 hover:underline transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function ProfileMenu() {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-gray-900 text-white border-gray-800"
      >
        <DropdownMenuItem className="focus:bg-gray-800">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-800">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-800">
          <LogOut className="mr-2 h-4 w-4" />
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
