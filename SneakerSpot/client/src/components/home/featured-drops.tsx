import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/shop/product-card";

export default function FeaturedDrops() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold font-outfit">Featured Drops</h2>
          <Link href="/shop" className="text-accent font-medium flex items-center group">
            View All
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="w-full h-64 bg-gray-200 animate-pulse" />
                <div className="p-4">
                  <div className="w-20 h-4 bg-gray-200 animate-pulse mb-1" />
                  <div className="w-40 h-5 bg-gray-200 animate-pulse mb-2" />
                  <div className="w-32 h-4 bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
