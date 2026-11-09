import Link from "next/link";
import HeroSection from "./components/HeroSection";
import ProductCardClient from "./components/ProductCardClient";
import { products } from "@/data/productos";
import BackToTop from "./components/BackToTop";
import { Coffee, Cake, Cookie, UtensilsCrossed } from "lucide-react";
import Sidebar from "./components/Sidebar";

const categories = [
  { slug: "cafe", name: "Café", icon: Coffee, desc: "Espresso, latte, cold brew" },
  { slug: "postres", name: "Postres", icon: Cake, desc: "Repostería artesanal" },
  { slug: "snacks", name: "Snacks", icon: Cookie, desc: "Para picar algo rico" },
  { slug: "platillos", name: "Platillos", icon: UtensilsCrossed, desc: "Comida completa" },
];

export default function Home() {
  const destacados = products.filter((p) => p.badge).slice(0, 4);
  const coffe = products.filter((p) => p.category === "cafe");
  const postres = products.filter((p) => p.category === "postres");
  const platillos = products.filter((p) => p.category === "postres");
  const snacks = products.filter((p) => p.category === "snacks");

  return (
    <div>
      <HeroSection />
      <Sidebar />
      {/* Categorías */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl font-bold text-center text-coffee-800 mb-4">
          Explora nuestro menú
        </h2>
        <p className="text-center text-coffee-600 mb-12">
          Algo especial para cada momento del día
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`#${cat.slug}`}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center"
              >
                {/* Contenedor del icono con fondo suave */}
                <div className="w-16 h-16 bg-coffee-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-coffee-100 transition-all duration-300">
                  <Icon size={32} className="text-coffee-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-coffee-800">
                  {cat.name}
                </h3>
                <p className="text-sm text-coffee-500 mt-1">{cat.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <BackToTop />
      {/* Destacados */}
      <section className="px-8 py-16 bg-coffee-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-coffee-800 mb-10 text-center">
            Los favoritos de la casa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((p) => (
              <ProductCardClient key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-16 max-w-7xl mx-auto" id="cafe">
        <header className="mb-12 text-center">
          <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2 flex items-center justify-center gap-3">
            <Coffee size={32} className="text-coffee-600" /> Café
          </h1>
          <p className="text-coffee-600 mt-3 max-w-xl mx-auto">
            Bebidas preparadas con granos de especialidad, tostados localmente.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffe.map((p) => (
            <ProductCardClient key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="px-8 py-16 max-w-7xl mx-auto" id="postres">
        <header className="mb-12 text-center">
          <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2 flex items-center justify-center gap-3">
            <Cake size={40} className="text-coffee-600" />
            <span>Postres</span>
          </h1>
          <p className="text-coffee-600 mt-3 max-w-xl mx-auto">
            Repostería hecha en casa cada mañana.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postres.map((p) => (
            <ProductCardClient key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="px-8 py-16 max-w-7xl mx-auto" id="platillos">
        <header className="mb-12 text-center">
          <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2 flex items-center justify-center gap-3">
            <UtensilsCrossed size={32} className="text-coffee-600" /> Platillos
          </h1>
          <p className="text-coffee-600 mt-3 max-w-xl mx-auto">
            Comida completa preparada al momento.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platillos.map((p) => (
            <ProductCardClient key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="px-8 py-16 max-w-7xl mx-auto" id="snacks">
        <header className="mb-12 text-center">
          <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2 flex items-center justify-center gap-3">
            <Cookie size={32} className="text-coffee-600" /> Snacks
          </h1>
          <p className="text-coffee-600 mt-3 max-w-xl mx-auto">
            Bocadillos perfectos para acompañar tu bebida.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snacks.map((p) => (
            <ProductCardClient key={p.id} product={p} />
          ))}
        </div>
      </section>
      {/* Banner */}
      <section className="bg-coffee-800 text-cream text-center py-16 px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold">
          Ven a visitarnos
        </h2>
        <p className="mt-3 text-coffee-100">
          Av. Principal 123 · Lun a Dom · 8:00 am – 10:00 pm
        </p>
      </section>
    </div>
  );
}