import Image from "next/image";
import { Leaf, Heart, Star } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";

export const metadata = { title: "Sobre Nosotros · Café Aroma" };

export default function NosotrosPage() {
  return (
    <section className="px-8 py-16 max-w-5xl mx-auto">
      <Sidebar />
      <header className="text-center mb-12">
        <p className="text-coffee-500 uppercase tracking-widest text-sm">
          Nuestra historia
        </p>
        <h1 className="font-display text-5xl font-bold text-coffee-800 mt-2">
          Sobre Nosotros
        </h1>
      </header>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"
            alt="Interior de la cafetería"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-coffee-800 mb-4">
            Una taza con propósito
          </h2>
          <p className="text-coffee-700 leading-relaxed">
            En <strong>Café Aroma</strong> creemos que una buena taza de café
            puede cambiar tu día. Desde 2015 nos dedicamos a seleccionar granos
            de especialidad directamente de productores locales, tostándolos
            con cuidado para preservar sus notas y aromas.
          </p>
          <p className="text-coffee-700 leading-relaxed mt-4">
            Cada postre es elaborado en nuestra cocina, cada platillo se prepara
            al momento y cada cliente es recibido como en casa.
          </p>
        </div>
      </div>

      {/* Valores */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Leaf, title: "Sostenible", desc: "Granos de comercio justo y empaques eco-amigables." },
          { icon: Heart, title: "Hecho con amor", desc: "Cada platillo preparado con dedicación artesanal." },
          { icon: Star, title: "Calidad", desc: "Ingredientes frescos y proveedores de confianza." },
        ].map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-8 shadow-md text-center flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-coffee-50 rounded-full flex items-center justify-center mb-4">
                <Icon size={32} className="text-coffee-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-coffee-800">
                {v.title}
              </h3>
              <p className="text-sm text-coffee-600 mt-2">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-16 bg-coffee-800 text-cream rounded-2xl p-10 text-center">
        <h3 className="font-display text-2xl font-bold mb-3">Visítanos</h3>
        <p>Av. Principal 123, Centro</p>
        <p>Lunes a Domingo · 8:00 am – 10:00 pm</p>
        <p className="mt-2 text-coffee-200">+52 555 123 4567</p>
      </div>
    </section>
  );
}