export interface ProductoPedido {
  id: number | string;
  nombre: string;
  precio: number;
  cantidad: number;
  ingredientes?: string[];
}

export interface Pedido {
  id: string;
  mesa: string;
  hora: string;
  metodoPago: string;
  estado: "pendiente" | "entregado";
  productos: ProductoPedido[];
}

export const pedidosIniciales: Pedido[] = [
  {
    id: "1001",
    mesa: "4",
    hora: "10:30 AM",
    metodoPago: "Tarjeta",
    estado: "pendiente",
    productos: [
      { id: 1, nombre: "Cappuccino", precio: 45, cantidad: 2 },
      { id: 2, nombre: "Cheesecake de Fresa", precio: 65, cantidad: 1 },
      { id: 3, nombre: "Sándwich Club", precio: 80, cantidad: 1 },
      {
        id: 8,
        nombre: "Crepa",
        precio: 90,
        cantidad: 1,
        ingredientes: ["Nutella", "Fresa"],
      },
    ],
  },
  {
    id: "1002",
    mesa: "12",
    hora: "10:45 AM",
    metodoPago: "Efectivo",
    estado: "pendiente",
    productos: [
      { id: 4, nombre: "Huevos Benedictinos", precio: 85, cantidad: 1 },
      { id: 5, nombre: "Cold Brew", precio: 35, cantidad: 1 },
      {
        id: 8,
        nombre: "Crepa",
        precio: 90,
        cantidad: 1,
        ingredientes: ["Nutella", "Fresa"],
      },
    ],
  },
  {
    id: "1003",
    mesa: "2",
    hora: "11:00 AM",
    metodoPago: "Tarjeta",
    estado: "entregado",
    productos: [
      { id: 6, nombre: "Pasta Alfredo", precio: 100, cantidad: 1 },
      { id: 7, nombre: "Mocha", precio: 45, cantidad: 1 },
      {
        id: 8,
        nombre: "Crepa",
        precio: 90,
        cantidad: 1,
        ingredientes: ["Nutella", "Fresa"],
      },
    ],
  },
];