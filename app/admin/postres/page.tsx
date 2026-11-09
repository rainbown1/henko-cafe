import ProductCard from "@/app/components/ProductCard";
import { products } from "@/data/productos";
import { Cake } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";

export const metadata = { title: "Postres · Café Aroma" };

export default function PostresPage() {
  const items = products.filter((p) => p.category === "postres");
  return (
    <section className="px-8 py-16 max-w-7xl mx-auto">
      <Sidebar />
      <header className="mb-12 text-center">
        <p className="text-coffee-500 uppercase tracking-widest text-sm">Menú</p>
        <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2">
          <Cake size={32} className="text-coffee-600" /> Postres
        </h1>
        <p className="text-coffee-600 mt-3 max-w-xl mx-auto">
          Repostería hecha en casa cada mañana.
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