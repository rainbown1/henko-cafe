"use client";

import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import {
  CheckCircle2, Utensils, CreditCard, Banknote,
  Trash2, Plus, Minus, Pencil, ArrowLeft
} from "lucide-react";
import { usePedidos } from "@/context/PedidosContext";

function DetallePedidoContent() {
  const params = useParams();
  const router = useRouter();
  const pedidoId = params.id as string;

  const { pedidos, calcularTotal, cambiarCantidad, eliminarProducto, confirmarEntrega } = usePedidos();
  const [editando, setEditando] = useState(false);

  const pedido = pedidos.find((p) => p.id === pedidoId);

  if (!pedido) {
    return (
      <section className="px-4 py-10 mx-auto max-w-3xl">
        <p className="text-center text-coffee-500">Pedido no encontrado.</p>
        <button
          onClick={() => router.push("/admin")}
          className="mt-4 flex items-center gap-2 text-coffee-700 hover:text-coffee-900 font-semibold"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </section>
    );
  }

  const entregado = pedido.estado === "entregado";
  const total = calcularTotal(pedido.productos);

  return (
    <section className="px-4 py-10 mx-auto max-w-3xl">
      {/* Botón volver */}
      <button
        onClick={() => router.push("/admin")}
        className="mb-6 flex items-center gap-2 text-coffee-700 hover:text-coffee-900 font-semibold"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div
        className={`w-full rounded-2xl border-2 p-6 transition-all ${
          entregado
            ? "bg-coffee-50 border-coffee-200 opacity-70"
            : "bg-white border-coffee-500 shadow-md"
        }`}
      >
        {/* Info del pedido */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-coffee-800 text-cream px-3 py-1 rounded-lg font-bold text-lg flex items-center gap-2">
            <Utensils size={16} />
            Mesa {pedido.mesa}
          </span>
          <span className="text-sm text-coffee-500 font-medium">
            {pedido.id} · {pedido.hora}
          </span>
          {entregado && (
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 size={14} /> Entregado
            </span>
          )}
        </div>

        {/* Encabezado productos */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <h3 className="font-semibold text-coffee-800">Productos del pedido</h3>
          {!entregado && (
            <button
              onClick={() => setEditando((v) => !v)}
              className="flex items-center gap-2 text-sm font-semibold text-coffee-700 hover:text-coffee-900"
            >
              <Pencil size={15} />
              {editando ? "Finalizar edición" : "Editar pedido"}
            </button>
          )}
        </div>

        {/* Lista de productos */}
        <ul className="space-y-3 mb-5">
          {pedido.productos.map((producto) => (
            <li
              key={producto.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-coffee-100 pb-3"
            >
              <div className="flex-1">
                <p className="text-coffee-800 font-medium">{producto.nombre}</p>
                <p className="text-sm text-coffee-500">
                  ${producto.precio.toFixed(2)} por unidad
                </p>
                {producto.ingredientes && producto.ingredientes.length > 0 && (
                  <div className="mt-2 text-sm text-coffee-600">
                    <p className="font-medium">Ingredientes:</p>
                    <ul className="mt-1 list-inside list-disc space-y-0.5">
                      {producto.ingredientes.map((ingrediente) => (
                        <li key={`${producto.id}-${ingrediente}`}>{ingrediente}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                {editando && !entregado ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${producto.nombre}`}
                      disabled={producto.cantidad <= 1}
                      onClick={() => cambiarCantidad(pedido.id, producto.id, -1)}
                      className="rounded-lg border border-coffee-300 p-2 hover:bg-coffee-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-6 text-center font-semibold">
                      {producto.cantidad}
                    </span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${producto.nombre}`}
                      onClick={() => cambiarCantidad(pedido.id, producto.id, 1)}
                      className="rounded-lg border border-coffee-300 p-2 hover:bg-coffee-100"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Eliminar ${producto.nombre}`}
                      onClick={() => eliminarProducto(pedido.id, producto.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-coffee-600">
                    {producto.cantidad} × ${producto.precio.toFixed(2)}
                  </span>
                )}
                <span className="font-semibold text-coffee-800 min-w-20 text-right">
                  ${(producto.precio * producto.cantidad).toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Total y método de pago */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-coffee-600 mb-6">
          <span className="font-bold text-coffee-900 text-base">
            Total: ${total.toFixed(2)}
          </span>
          <span className="flex items-center gap-1">
            {pedido.metodoPago === "Tarjeta" ? <CreditCard size={16} /> : <Banknote size={16} />}
            {pedido.metodoPago}
          </span>
        </div>

        {/* Estado */}
        {entregado ? (
          <div className="px-6 py-3 rounded-xl font-bold text-coffee-400 text-center">
            Completado
          </div>
        ) : (
          <button
            type="button"
            onClick={() => confirmarEntrega(pedido.id)}
            className="w-full px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-coffee-800 text-cream shadow-lg hover:bg-coffee-700 transition-colors"
          >
            <CheckCircle2 size={20} />
            Marcar entregado
          </button>
        )}
      </div>
    </section>
  );
}

export default function DetallePedidoPage() {
  return (
    <Suspense fallback={<p className="px-4 py-10 text-center text-coffee-500">Cargando pedido...</p>}>
      <DetallePedidoContent />
    </Suspense>
  );
}