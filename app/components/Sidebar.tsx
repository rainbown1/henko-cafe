"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Coffee, Cake, Cookie, UtensilsCrossed, Info, User, 
  ShoppingCart, Menu, X, LogOut, LayoutDashboard, LucideIcon, Bell 
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// 1. Definimos un tipo para los enlaces que nos permite tener isLogout como opcional
type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  isLogout?: boolean;
};

const clientLinks: NavLink[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/client/nosotros", label: "Nosotros", icon: Info }
];

const adminLinks: NavLink[] = [
  { href: "/admin", label: "Panel Admin", icon: LayoutDashboard },
  { href: "/admin/cafe", label: "Café", icon: Coffee },
  { href: "/admin/postres", label: "Postres", icon: Cake },
  { href: "/admin/snacks", label: "Snacks", icon: Cookie },
  { href: "/admin/platillos", label: "Platillos", icon: UtensilsCrossed },
  { href: "/admin/carrito", label: "Carrito", icon: ShoppingCart },
  { href: "/login", label: "Cerrar Sesión", icon: LogOut, isLogout: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopHidden, setIsDesktopHidden] = useState(false);
  
  const isAdmin = pathname.startsWith("/admin");
  const links = isAdmin ? adminLinks : clientLinks;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Botón Hamburguesa - Solo visible en móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-60 md:hidden bg-coffee-800 text-cream p-3 rounded-xl shadow-lg border border-coffee-700"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {!isDesktopHidden && (
        <button
          onClick={() => setIsDesktopHidden(true)}
          className="fixed left-4 top-4 z-60 hidden rounded-xl border border-coffee-700 bg-coffee-800 p-3 text-cream shadow-lg md:flex"
          aria-label="Ocultar menú"
          title="Ocultar menú"
        >
          <X size={24} />
        </button>
      )}

      {isDesktopHidden && (
        <button
          onClick={() => setIsDesktopHidden(false)}
          className="fixed left-4 top-4 z-60 hidden rounded-xl border border-coffee-700 bg-coffee-800 p-3 text-cream shadow-lg md:flex"
          aria-label="Mostrar menú"
          title="Mostrar menú"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Overlay oscuro para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-[-150%]"} 
          ${isDesktopHidden ? "md:translate-x-[-150%]" : "md:translate-x-0"}`}
      >
        <nav className="bg-coffee-800/95 backdrop-blur-md text-cream rounded-2xl shadow-2xl p-2 flex flex-col gap-1 border border-coffee-700">
          {links.map(({ href, label, icon: Icon, isLogout }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isLogout 
                    ? "hover:bg-red-500/20 text-red-300 hover:text-red-100" 
                    : active
                    ? "bg-coffee-500 text-white"
                    : "hover:bg-coffee-700 text-coffee-100"
                }`}
              >
                <div className="relative">
                  <Icon size={20} className="shrink-0" />
                  {/* El contador del carrito solo se muestra para clientes */}
                  {!isAdmin && href === "/carrito" && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                {/* En móviles mostramos el texto siempre, en PC solo al hacer hover */}
                <span className="text-sm font-medium whitespace-nowrap md:max-w-0 md:overflow-hidden md:group-hover:max-w-30 transition-all duration-300">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}