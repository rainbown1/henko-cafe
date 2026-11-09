'use client';

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/productos";
// 1. IMPORTAMOS EL ARRAY GLOBAL DE INGREDIENTES
import { ingredients as allIngredients, type IngredientCategory } from "@/data/ingredientes"; 
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { Suspense } from 'react';

const ingredientCategoryLabels: Record<IngredientCategory, string> = {
  dulces: "Dulces",
  cereales: "Cereales",
  frutas: "Frutas",
  aderezos: "Aderezos",
  quesos: "Quesos",
  carnes_frias: "Carnes frías",
  Leche: "Leches",
};

export default function DetalleProductoPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productoId = params.id;
  const producto = products.find((p) => p.id === Number(productoId));

  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);

  // 2. CREAMOS UN ARRAY CON LOS OBJETOS DE INGREDIENTES DISPONIBLES PARA ESTE PRODUCTO
  const availableIngredients = useMemo(() => {
    if (!producto || !producto.ingredientCategories) return [];
    
    // Filtramos el array global por las categorías que tiene el producto
    return allIngredients.filter((ing) => 
      producto.ingredientCategories?.includes(ing.category)
    );
  }, [producto]);

  const ingredientsByCategory = useMemo(() => {
    if (!producto?.ingredientCategories) return [];

    return producto.ingredientCategories
      .map((category) => ({
        category,
        ingredients: availableIngredients.filter((ingredient) => ingredient.category === category),
      }))
      .filter((group) => group.ingredients.length > 0);
  }, [producto, availableIngredients]);

  // 3. CALCULAMOS EL PRECIO USANDO EL ARRAY FILTRADO
  const totalPrice = useMemo(() => {
    if (!producto) return 0;
    
    const basePrice = producto.price;
    const extrasPrice = selectedIngredients.reduce((acc, id) => {
      // Buscamos en el array filtrado, no en producto.ingredientCategories
      const ing = availableIngredients.find((i) => i.id === id);
      return acc + (ing?.price || 0);
    }, 0);

    return (basePrice + extrasPrice) * quantity;
  }, [producto, selectedIngredients, quantity, availableIngredients]);

  if (!producto) {
    return (
      <section className="px-4 py-10 mx-auto max-w-3xl flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-xl text-gray-500 font-medium mb-4">Producto no encontrado.</p>
        <button
          onClick={() => router.push('/admin')}
          className="flex items-center gap-2 text-taupe-700 hover:text-taupe-900 font-semibold transition-colors"
        >
          <ArrowLeft size={18} /> Volver al menú
        </button>
      </section>
    );
  }

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    // 4. OBTENEMOS LOS OBJETOS COMPLETOS DE LOS INGREDIENTES SELECCIONADOS
    const ingredientObjects = availableIngredients.filter((i) =>
      selectedIngredients.includes(i.id)
    );

    for (let i = 0; i < quantity; i++) {
        addToCart(producto, ingredientObjects);
    }

    alert(`Agregado: ${quantity} x ${producto.name}`);
    router.push('/admin/carrito');
  };

  return (
    <Suspense fallback={<div>Cargando detalle del producto...</div>}>
      <section className="relative min-h-screen bg-gray-50 pb-32">
      
      {/* Imagen del producto */}
      <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
        <Image
          src={producto.image}
          alt={producto.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all z-10"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Contenido */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-t-3xl p-6 shadow-sm min-h-[50vh]">
          
          {/* Título y Descripción */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{producto.name}</h1>
              <span className="text-2xl font-bold text-taupe-600">${producto.price}</span>
            </div>
            <p className="text-gray-500 mt-2 leading-relaxed">{producto.description}</p>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* Selección de Ingredientes */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              Personaliza tu pedido
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                Opcional
              </span>
            </h2>
            
            {/* 5. USAMOS availableIngredients EN LUGAR DE producto.ingredientCategories */}
            {ingredientsByCategory.length > 0 ? (
              <div className="space-y-6">
                {ingredientsByCategory.map(({ category, ingredients }) => (
                  <section key={category}>
                    <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold uppercase tracking-wide text-taupe-700">
                      {ingredientCategoryLabels[category]}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ingredients.map((ingrediente) => {
                        const isSelected = selectedIngredients.includes(ingrediente.id);
                        return (
                          <label
                            key={ingrediente.id}
                            className={`
                              flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                              ${isSelected 
                                ? 'border-taupe-500 bg-taupe-50' 
                                : 'border-gray-100 hover:border-gray-200 bg-white'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-5 h-5 rounded-md border flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-taupe-500 border-taupe-500' : 'border-gray-300 bg-white'}
                              `}>
                                {isSelected && <Check size={14} className="text-white" />}
                              </div>
                              <span className={`text-sm font-medium ${isSelected ? 'text-taupe-900' : 'text-gray-700'}`}>
                                {ingrediente.name}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-gray-500">
                              +${ingrediente.price}
                            </span>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={isSelected}
                              onChange={() => toggleIngredient(ingrediente.id)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Este producto no requiere personalización.</p>
            )}
          </div>

          {/* Selector de Cantidad */}
          <div className="mt-8 flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
            <span className="font-semibold text-gray-700">Cantidad</span>
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-bold text-lg text-gray-800">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Botón Fijo Inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Total a pagar</span>
            <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-taupe-600 hover:bg-taupe-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-gray-500 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
            <ShoppingCart size={20} />
            Agregar al carrito
        </button>
        </div>
      </div>

    </section>
    </Suspense>
  );
}