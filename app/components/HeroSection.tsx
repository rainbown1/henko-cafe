import Link from "next/link";
import { User } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-coffee-900/60 p-10"/>
      <div className="absolute flex flex-col top-6 right-6 z-20 gap-2">
        <Link
          href="/login" // Puedes cambiar esto a "/login" si luego creas una página de login
          className="flex items-center gap-2 bg-cream/10 hover:bg-cream/20 backdrop-blur-md border border-cream/30 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg"
        >
          <User size={18} />
          <span>Iniciar Sesión</span>
        </Link>
        <Link
          href="/admin" // Puedes cambiar esto a "/login" si luego creas una página de login
          className="flex items-center gap-2 bg-cream/10 hover:bg-cream/20 backdrop-blur-md border border-cream/30 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg"
        >
          <User size={18} />
          <span>Mesero</span>
        </Link>
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl p-10">
        
        <p className="text-amber-100 uppercase tracking-[0.3em] text-sm mb-4">
          Desde 2015
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
          Café que <span className="text-taupe-400">despierta</span> tus sentidos
        </h1>
        <p className="text-amber-100 text-lg mt-6 max-w-xl mx-auto">
          Granos seleccionados, repostería artesanal y un espacio acogedor para
          tus mejores momentos.
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <Link
            href="/client/cafe"
            className="text-amber-100 hover:bg-coffee-200 text-coffee-900 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Ver Menú
          </Link>
          <Link
            href="/nosotros"
            className="border-2 border-cream text-amber-100 hover:bg-cream hover:text-coffee-900 font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Conócenos
          </Link>
        </div>
      </div>
    </section>
  );
}