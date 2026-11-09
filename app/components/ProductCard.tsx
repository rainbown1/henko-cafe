'use client';

import Image from "next/image";
import { Product } from "@/data/productos";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCardClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 bg-coffee-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-coffee-800">
          {product.name}
        </h3>
        <p className="text-sm text-coffee-600 mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee-500">
            ${product.price}
          </span>
          <button
            onClick={() => router.push(`/admin/detalleProducto/${product.id}`)}
            className="bg-coffee-800 hover:bg-coffee-600 text-cream text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}