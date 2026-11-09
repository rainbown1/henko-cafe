"use client";

import { useState } from "react";
import Link from "next/link";
import { Coffee, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-cream">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Panel Izquierdo (Decorativo - Oculto en móviles) */}
        <div className="hidden md:flex md:w-1/2 relative bg-coffee-800 p-10 flex-col justify-between overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800"
            alt="Café"
            fill
            className="object-cover opacity-30"
          />
          <div className="relative z-10 text-cream">
            <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold">
              <Coffee size={28} />
              Café Aroma
            </Link>
          </div>
          <div className="relative z-10 text-cream">
            <h2 className="font-display text-3xl font-bold mb-4">
              Bienvenido de vuelta
            </h2>
            <p className="text-coffee-100 text-sm font-bold">
              Inicia sesión para ver tus pedidos, acumular puntos y disfrutar de
              beneficios exclusivos.
            </p>
          </div>
        </div>

        {/* Formulario (Derecha) */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <h1 className="font-display text-3xl font-bold text-coffee-800">
              Iniciar Sesión
            </h1>
            <p className="text-coffee-500 text-sm mt-2">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 text-coffee-800"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 text-coffee-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-taupe-400 hover:bg-taupe-600 text-taupe-700 hover:text-taupe-400 text-bold font-semibold py-3 rounded-xl transition-colors mt-2"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-coffee-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/registro" className="font-semibold text-coffee-800 hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}