
"use client";

import {
  Clock,
  Utensils,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePedidos } from "@/context/PedidosContext";
import Sidebar from "../components/Sidebar";

export default function AdminPage() {
  const { pedidos } = usePedidos();
  const router = useRouter();

  const pendientes = pedidos.filter(
    (pedido) => pedido.estado === "pendiente"
  ).length;

  return (
    <section className="px-4 py-10 mx-auto max-w-5xl md:px-8">
      <Sidebar />
      <header className="mb-10 flex items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-coffee-100">
        <div>
          <h1 className="font-display text-4xl font-bold text-coffee-800">
            ¡Hola, Bienvenido!
          </h1>
          <p className="text-coffee-500 mt-2">
            Aquí tienes el resumen de los pedidos activos en este momento.
          </p>
        </div>
        <div className="hidden md:flex bg-coffee-50 p-4 rounded-2xl">
          <LayoutDashboard size={40} className="text-coffee-600" />
        </div>
      </header>
      {/* Contador de pedidos pendientes */}
      <div className="mb-6 flex items-center gap-2 text-coffee-700 font-medium">
        <Clock size={20} />
        <span>
          Tienes {pendientes} pedidos pendientes.
        </span>
      </div>
      {/* Pedidos por mesa */}
      <div className="flex flex-col gap-5 pb-10">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className={`w-full rounded-2xl border-2 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all ${pedido.estado === "entregado"
                ? "bg-coffee-50 border-coffee-200 opacity-70"
                : "bg-white border-coffee-500 shadow-md"
              }`}
          >
            <div className="flex flex-row justify-between items-center w-full">
              <span className="bg-coffee-800 text-cream px-3 py-1 rounded-lg font-bold text-lg flex items-center gap-2">
                <Utensils size={16} />
                Mesa {pedido.mesa}
              </span>
              <button
                onClick={() => router.push(`/admin/detallePedido/${pedido.id}`)}
                className="flex items-center gap-2 text-sm font-semibold text-coffee-700 hover:text-coffee-900"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {pedidos.length === 0 && (
        <p className="text-center text-coffee-500 py-10">
          No hay pedidos registrados.
        </p>
      )}
    </section>
  );
}
