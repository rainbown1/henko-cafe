import ProductCard from "@/app/components/ProductCard";
import { products } from "@/data/productos";
import { Coffee } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";

export const metadata = { title: "Café · Café Aroma" };

export default function CafePage() {
  const items = products.filter((p) => p.category === "cafe");
  return (
    <section className="px-8 py-16 max-w-7xl mx-auto">
      <Sidebar />
      <header className="mb-12 text-center">
        <p className="text-coffee-500 uppercase tracking-widest text-sm">Menú</p>
        
        <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2">
         <Coffee size={32} className="text-coffee-600" /> Café
        </h1>
        <p className="text-coffee-600 mt-3 max-w-xl mx-auto">
          Bebidas preparadas con granos de especialidad, tostados localmente.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}