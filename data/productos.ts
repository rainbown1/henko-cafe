import type { IngredientCategory } from "@/data/ingredientes";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "cafe" | "postres" | "snacks" | "platillos";
  badge?: string;
  ingredientCategories?: IngredientCategory[];
};

export const products: Product[] = [
  // CAFÉ
  {
    id: 1,
    name: "Espresso Clásico",
    description: "Shot concentrado de café de grano tostado oscuro.",
    price: 45,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600",
    category: "cafe",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso con leche vaporizada y espuma cremosa.",
    price: 60,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600",
    category: "cafe",
    ingredientCategories: ["Leche"]
  },
  {
    id: 3,
    name: "Latte de Vainilla",
    description: "Café suave con leche y jarabe de vainilla natural.",
    price: 65,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    category: "cafe",
    badge: "Nuevo",
    ingredientCategories: ["Leche"]
  },
  {
    id: 4,
    name: "Cold Brew",
    description: "Extracción en frío durante 18 horas, muy refrescante.",
    price: 70,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
    category: "cafe",
  },
  {
    id: 5,
    name: "Mocha",
    description: "Espresso, chocolate y leche vaporizada coronado con crema.",
    price: 68,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600",
    category: "cafe",
    ingredientCategories: ["Leche"]
  },
  {
    id: 6,
    name: "Americano",
    description: "Espresso diluido en agua caliente, intenso y aromático.",
    price: 50,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600",
    category: "cafe",
  },

  // POSTRES
  {
    id: 7,
    name: "Cheesecake de Fresa",
    description: "Cremoso cheesecake con coulis de fresa natural.",
    price: 75,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
    category: "postres",
    badge: "Favorito",
    ingredientCategories: ["frutas"],
  },
  {
    id: 8,
    name: "Brownie con Helado",
    description: "Brownie tibio de chocolate con helado de vainilla.",
    price: 80,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
    category: "postres",
    ingredientCategories: ["dulces", "cereales", "frutas"],
  },
  {
    id: 9,
    name: "Tiramisú",
    description: "Postre italiano con capas de mascarpone y café.",
    price: 85,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
    category: "postres",
  },
  {
    id: 10,
    name: "Croissant de Almendra",
    description: "Hojaldre francés relleno de crema de almendra.",
    price: 55,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    category: "postres",
  },
  {
    id: 19,
    name: "Crepa",
    description: "Crepa recién hecha para combinar con tus ingredientes favoritos.",
    price: 90,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600",
    category: "postres",
    badge: "Personalizable",
    ingredientCategories: ["dulces", "cereales", "frutas"],
  },

  // SNACKS
  {
    id: 11,
    name: "Papas Rústicas",
    description: "Papas fritas con romero y sal de mar.",
    price: 55,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
    category: "snacks",
    ingredientCategories: ["aderezos"],
  },
  {
    id: 12,
    name: "Nachos con Queso",
    description: "Totopos con queso cheddar fundido y jalapeños.",
    price: 70,
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=600",
    category: "snacks",
    badge: "Picante",
    ingredientCategories: ["quesos", "aderezos"],
  },
  {
    id: 13,
    name: "Sándwich Club",
    description: "Pan tostado con pollo, tocino, lechuga y tomate.",
    price: 85,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
    category: "snacks",
    ingredientCategories: ["quesos", "carnes_frias", "aderezos"],
  },
  {
    id: 14,
    name: "Aros de Cebolla",
    description: "Crujientes aros de cebolla empanizados.",
    price: 60,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600",
    category: "snacks",
  },

  // PLATILLOS
  {
    id: 15,
    name: "Huevos Benedictinos",
    description: "Huevos pochados con salsa holandesa sobre muffin.",
    price: 120,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600",
    category: "platillos",
    badge: "Brunch",
    ingredientCategories: ["quesos", "carnes_frias", "aderezos"],
  },
  {
    id: 16,
    name: "Pasta Alfredo",
    description: "Fettuccine en salsa cremosa de parmesano.",
    price: 145,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    category: "platillos",
    ingredientCategories: ["quesos", "aderezos"],
  },
  {
    id: 17,
    name: "Ensalada César",
    description: "Lechuga romana, crutones, parmesano y aderezo césar.",
    price: 110,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600",
    category: "platillos",
    ingredientCategories: ["quesos", "aderezos", "carnes_frias"],
  },
  {
    id: 18,
    name: "Bagel con Salmón",
    description: "Bagel tostado con queso crema, salmón y alcaparras.",
    price: 130,
    image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=600",
    category: "platillos",
    ingredientCategories: ["quesos", "carnes_frias", "aderezos"],
  },
];