// app/waiter/menu/[id]/page.tsx (o la ruta donde lo tengas)
import { Suspense } from 'react';
import DetalleProductoPage from '@/app/components/ProductDetail';// El componente con toda tu lógica

export default function ProductoPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-medium">Cargando detalle del producto...</p>
      </div>
    }>
      <DetalleProductoPage />
    </Suspense>
  );
}