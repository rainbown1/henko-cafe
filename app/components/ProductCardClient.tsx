'use client';

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/productos";

export default function ProductCardClient({ product }: { product: Product }) {
  return (
    <Link
      href={`/client/producto/${product.id}`}
      aria-label={`Ver detalles de ${product.name}`}
      className="group relative block overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee-600"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent"
        />
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-display text-xl font-bold drop-shadow-md">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/90 drop-shadow">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}