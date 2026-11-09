"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePedidos } from "@/context/PedidosContext";
import { Trash2, CreditCard, Banknote, CheckCircle } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";

export default function CarritoPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const { crearPedido } = usePedidos();
  const [mesa, setMesa] = useState("");
  const [metodoPago, setMetodoPago] = useState<"tarjeta" | "efectivo" | "">("");
  const [ordenado, setOrdenado] = useState(false);

  const handleOrdenar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mesa || !metodoPago) return;

    crearPedido(
      mesa,
      metodoPago === "tarjeta" ? "Tarjeta" : "Efectivo",
      cart.map((item) => ({
        id: item.cartItemId,
        nombre: item.name,
        precio: item.price,
        cantidad: item.quantity,
        ingredientes: item.selectedIngredients.map((ingredient) => ingredient.name),
      }))
    );
    setOrdenado(true);
    clearCart();
  };

  if (ordenado) {
    return (
      <section className="px-8 py-20 max-w-2xl mx-auto text-center">
        <Sidebar />
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="font-display text-4xl font-bold text-coffee-800 mb-4">
          ¡Orden Confirmada!
        </h1>
        <p className="text-coffee-600 text-lg mb-2">
          Tu pedido ha sido enviado a la cocina.
        </p>
        <p className="text-coffee-800 font-semibold text-xl mb-8">
          Mesa: {mesa} | Pago: {metodoPago === "tarjeta" ? "Tarjeta" : "Efectivo"}
        </p>
        <Link
          href="/"
          className="bg-coffee-800 hover:bg-coffee-600 text-cream px-8 py-3 rounded-full font-medium transition-colors"
        >
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <section className="px-8 py-16 max-w-5xl mx-auto">
      <Sidebar />
      <header className="mb-10">
        <h1 className="font-display text-5xl font-bold text-coffee-800">
          Tu Carrito
        </h1>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
          <p className="text-coffee-500 text-xl mb-6">Tu carrito está vacío</p>
          <Link
            href="/cafe"
            className="bg-coffee-800 hover:bg-coffee-600 text-cream px-8 py-3 rounded-full font-medium transition-colors"
          >
            Ver el menú
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-coffee-800">{item.name}</h3>
                  <p className="text-sm text-coffee-500">
                    ${item.price} x {item.quantity}
                  </p>
                  {item.selectedIngredients.length > 0 && (
                    <p className="mt-1 text-sm text-coffee-600">
                      Ingredientes: {item.selectedIngredients.map((ingredient) => ingredient.name).join(", ")}
                    </p>
                  )}
                </div>
                <p className="font-bold text-coffee-800">
                  ${item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Formulario de orden */}
          <div className="bg-white rounded-3xl p-6 shadow-md h-fit sticky top-8">
            <h2 className="font-display text-2xl font-bold text-coffee-800 mb-6">
              Detalles del pedido
            </h2>

            <form onSubmit={handleOrdenar} className="space-y-6">
              {/* Número de mesa */}
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Número de mesa
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Ej. 12"
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>
              {/* Método de pago */}
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Método de pago
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Opción Tarjeta */}
                  <label
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      metodoPago === "tarjeta"
                        ? "border-coffee-500 bg-coffee-50 text-coffee-800"
                        : "border-coffee-100 text-coffee-500 hover:border-coffee-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      checked={metodoPago === "tarjeta"}
                      onChange={() => setMetodoPago("tarjeta")}
                    />
                    <CreditCard size={24} />
                    <span className="text-sm font-medium">Tarjeta</span>
                  </label>

                  {/* Opción Efectivo */}
                  <label
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      metodoPago === "efectivo"
                        ? "border-coffee-500 bg-coffee-50 text-coffee-800"
                        : "border-coffee-100 text-coffee-500 hover:border-coffee-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="metodoPago"
                      value="efectivo"
                      checked={metodoPago === "efectivo"}
                      onChange={() => setMetodoPago("efectivo")}
                    />
                    <Banknote size={24} />
                    <span className="text-sm font-medium">Efectivo</span>
                  </label>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-coffee-100 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-coffee-600">Total a pagar</span>
                  <span className="text-3xl font-bold text-coffee-800">
                    ${total}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!mesa || !metodoPago}
                  className="w-full bg-coffee-800 hover:bg-coffee-600 disabled:bg-coffee-300 disabled:cursor-not-allowed text-cream font-semibold py-3 rounded-xl transition-colors"
                >
                  Ordenar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}