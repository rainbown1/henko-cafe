import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import { Coffee, Cake, Cookie, UtensilsCrossed } from "lucide-react";
import { PedidosProvider } from "@/context/PedidosContext";

export const metadata: Metadata = {
  title: "Cafeteria - snacks marquesitas Henko",
  description: "Café de especialidad, postres y marquesitas.",
};

const categories = [
  { slug: "cafe", name: "Café", icon: Coffee, desc: "Espresso, latte, cold brew" },
  { slug: "postres", name: "Postres", icon: Cake, desc: "Repostería artesanal" },
  { slug: "snacks", name: "Snacks", icon: Cookie, desc: "Para picar algo rico" },
  { slug: "platillos", name: "Platillos", icon: UtensilsCrossed, desc: "Comida completa" },
];


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <CartProvider>
          <Suspense fallback={null}>
          </Suspense>
          <main className="min-h-screen">
            <PedidosProvider>{children}</PedidosProvider>
      </main>
      </CartProvider>
      </body>
    </html>
  );
}