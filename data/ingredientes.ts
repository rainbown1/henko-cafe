// data/ingredientes.ts

export type IngredientCategory = 
  | "dulces" 
  | "cereales" 
  | "frutas" 
  | "aderezos" 
  | "quesos" 
  | "carnes_frias"
  | "Leche";

export type Ingredient = {
  id: number;
  name: string;
  category: IngredientCategory;
  price: number; // <--- Nuevo campo obligatorio
};

export const ingredients: Ingredient[] = [
  // DULCES (Precios un poco más altos por ser untables/cremas)
  { id: 1, name: "Nutella", category: "dulces", price: 15 },
  { id: 2, name: "Cajeta", category: "dulces", price: 10 },
  { id: 3, name: "Lechera", category: "dulces", price: 10 },
  { id: 4, name: "Crema de cacahuate", category: "dulces", price: 12 },
  { id: 5, name: "Crema de almendras", category: "dulces", price: 15 },
  { id: 6, name: "Miel maple", category: "dulces", price: 12 },
  { id: 7, name: "Hersheys", category: "dulces", price: 10 },
  { id: 8, name: "Mermelada Fresa", category: "dulces", price: 8 },
  { id: 9, name: "Mermelada Zarzamora", category: "dulces", price: 8 },
  { id: 10, name: "Mermelada Piña", category: "dulces", price: 8 },
  { id: 11, name: "Mermelada Frutos rojos", category: "dulces", price: 8 },

  // CEREALES (Precios variados según el topping)
  { id: 12, name: "Nuez", category: "cereales", price: 10 },
  { id: 13, name: "Oreo", category: "cereales", price: 8 },
  { id: 14, name: "Mazapán", category: "cereales", price: 8 },
  { id: 15, name: "Almendras", category: "cereales", price: 12 },
  { id: 16, name: "Bombón", category: "cereales", price: 10 },
  { id: 17, name: "Chips de chocolate", category: "cereales", price: 6 },
  { id: 18, name: "M&M's", category: "cereales", price: 8 },
  { id: 19, name: "Coco tostado", category: "cereales", price: 6 },
  { id: 20, name: "Kinder Delice", category: "cereales", price: 15 },
  { id: 21, name: "Granola", category: "cereales", price: 6 },
  { id: 22, name: "Pasas", category: "cereales", price: 5 },
  { id: 23, name: "Arroz inflado", category: "cereales", price: 5 },

  // FRUTAS (Suelen ser más económicas)
  { id: 24, name: "Fresa", category: "frutas", price: 8 },
  { id: 25, name: "Plátano", category: "frutas", price: 5 },
  { id: 26, name: "Durazno", category: "frutas", price: 7 },
  { id: 27, name: "Kiwi", category: "frutas", price: 8 },
  { id: 28, name: "Uva verde", category: "frutas", price: 6 },

  // ADEREZOS (Precios bajos)
  { id: 29, name: "Chipotle", category: "aderezos", price: 5 },
  { id: 30, name: "Ranch", category: "aderezos", price: 5 },
  { id: 31, name: "Habanero", category: "aderezos", price: 5 },
  { id: 32, name: "Cilantro", category: "aderezos", price: 5 },
  { id: 33, name: "Chimichurri", category: "aderezos", price: 5 },

  // QUESOS (Más caros)
  { id: 34, name: "Bola Edam", category: "quesos", price: 15 },
  { id: 35, name: "Philadelphia", category: "quesos", price: 12 },

  // CARNES FRÍAS (Los más caros)
  { id: 36, name: "Pepperoni", category: "carnes_frias", price: 15 },
  { id: 37, name: "Jamón", category: "carnes_frias", price: 12 },
  { id: 38, name: "Salchicha", category: "carnes_frias", price: 10 },

  //Leches
  { id: 39, name: "Almendras", category: "Leche", price: 15 },
  { id: 39, name: "Coco", category: "Leche", price: 15 },
  { id: 39, name: "Deslactosada", category: "Leche", price: 15 },
];

// Función auxiliar para obtener ingredientes por categoría
export const getIngredientsByCategory = (category: IngredientCategory) => {
  return ingredients.filter((ing) => ing.category === category);
};