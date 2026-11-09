"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { pedidosIniciales, type Pedido, type ProductoPedido } from "@/data/pedidos";

type PedidosContextType = {
  pedidos: Pedido[];
  crearPedido: (mesa: string, metodoPago: string, productos: ProductoPedido[]) => void;
  calcularTotal: (productos: ProductoPedido[]) => number;
  cambiarCantidad: (pedidoId: string, productoId: number | string, cambio: number) => void;
  eliminarProducto: (pedidoId: string, productoId: number | string) => void;
  confirmarEntrega: (pedidoId: string) => void;
};

const PedidosContext = createContext<PedidosContextType | null>(null);

export function PedidosProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);

  const crearPedido = (mesa: string, metodoPago: string, productos: ProductoPedido[]) => {
    const ahora = new Date();
    const pedido: Pedido = {
      id: Date.now().toString(),
      mesa,
      hora: ahora.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      metodoPago,
      estado: "pendiente",
      productos,
    };

    setPedidos((anteriores) => [pedido, ...anteriores]);
  };

  const calcularTotal = (productos: ProductoPedido[]) =>
    productos.reduce((total, p) => total + p.precio * p.cantidad, 0);

  const cambiarCantidad = (pedidoId: string, productoId: number | string, cambio: number) => {
    setPedidos((anteriores) =>
      anteriores.map((pedido) => {
        if (pedido.id !== pedidoId || pedido.estado !== "pendiente") return pedido;
        return {
          ...pedido,
          productos: pedido.productos.map((producto) =>
            producto.id === productoId
              ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) }
              : producto
          ),
        };
      })
    );
  };

  const eliminarProducto = (pedidoId: string, productoId: number | string) => {
    const pedido = pedidos.find((p) => p.id === pedidoId);
    if (!pedido || pedido.estado !== "pendiente") return;
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    setPedidos((anteriores) =>
      anteriores
        .map((p) =>
          p.id === pedidoId
            ? { ...p, productos: p.productos.filter((pr) => pr.id !== productoId) }
            : p
        )
        .filter((p) => p.productos.length > 0)
    );
  };

  const confirmarEntrega = (pedidoId: string) => {
    setPedidos((anteriores) =>
      anteriores.map((pedido) =>
        pedido.id === pedidoId ? { ...pedido, estado: "entregado" } : pedido
      )
    );
  };

  return (
    <PedidosContext.Provider
      value={{ pedidos, crearPedido, calcularTotal, cambiarCantidad, eliminarProducto, confirmarEntrega }}
    >
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const ctx = useContext(PedidosContext);
  if (!ctx) throw new Error("usePedidos debe usarse dentro de PedidosProvider");
  return ctx;
}