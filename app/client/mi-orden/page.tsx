"use client";

import { CheckCircle2, Clock, Utensils, CreditCard, Banknote } from "lucide-react";
import { usePedidos } from "@/context/PedidosContext";
import Sidebar from "@/app/components/Sidebar";

export default function MiOrdenPage() {
  const { pedidos, calcularTotal } = usePedidos();

  return (
    <section className="px-8 py-10 max-w-5xl mx-auto">
      <Sidebar />
      {/* Contador de pedidos pendientes */}
      <div className="mb-6 flex items-center gap-2 text-coffee-700 font-medium">
        <Clock size={20} />
        <span>
          Tienes {pedidos.filter((p) => p.estado === "pendiente").length} pedidos
          pendientes.
        </span>
      </div>

      {/* Lista de Pedidos (Tarjetas de ancho completo) */}
      <div className="flex flex-col gap-5">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className={`w-full rounded-2xl border-2 transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
              pedido.estado === "entregado"
                ? "bg-coffee-50 border-coffee-200 opacity-60"
                : "bg-white border-coffee-500 shadow-md"
            }`}
          >
            {/* Información del pedido */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-coffee-800 text-cream px-3 py-1 rounded-lg font-bold text-lg flex items-center gap-2">
                  <Utensils size={16} /> Mesa {pedido.mesa}
                </span>
                <span className="text-sm text-coffee-500 font-medium">
                  {pedido.id} · {pedido.hora}
                </span>
                {pedido.estado === "entregado" && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={14} /> Entregado
                  </span>
                )}
              </div>

              {/* Lista de productos */}
              <ul className="text-coffee-700 text-sm space-y-1 mb-3">
                {pedido.productos.map((producto) => (
                  <li key={producto.id} className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-coffee-400"></span>
                      {producto.cantidad}x {producto.nombre}
                    </span>
                    {producto.ingredientes && producto.ingredientes.length > 0 && (
                      <span className="ml-4 text-coffee-500">
                        Ingredientes: {producto.ingredientes.join(", ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Detalles extra */}
              <div className="flex items-center gap-4 text-sm text-coffee-600">
                <span className="flex items-center gap-1 font-semibold text-coffee-800">
                  Total: ${calcularTotal(pedido.productos).toFixed(2)}
                </span>
                <span className="flex items-center gap-1">
                  {pedido.metodoPago === "Tarjeta" ? (
                    <CreditCard size={16} />
                  ) : (
                    <Banknote size={16} />
                  )}
                  {pedido.metodoPago}
                </span>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="w-full md:w-auto">
              <h2
                className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  pedido.estado === "entregado"
                    ? "bg-transparent text-coffee-400 cursor-not-allowed"
                    : "bg-coffee-800 text-cream shadow-lg"
                }`}
              >
                {pedido.estado === "entregado" ? (
                  "Completado"
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    Pendiente
                  </>
                )}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}