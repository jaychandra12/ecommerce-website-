import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Grid, List, LayoutGrid, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/shop/filter-sidebar";
import ProductCard from "@/components/shop/product-card";
import { useMobile } from "@/hooks/use-mobile";

export default function ShopPage() {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersVisible, setFiltersVisible] = useState(!isMobile);
  
  // Reset filters visibility when screen size changes
  useEffect(() => {
    setFiltersVisible(!isMobile);
  }, [isMobile]);

  // Extract query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(searchParams.entries());

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", queryParams],
  });

  return (
    <>
      <Helmet>
        <title>Shop | SneakerLand</title>
        <meta name="description" content="Browse our collection of premium sneakers from top brands." />
      </Helmet>
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-outfit mb-2">Shop All Sneakers</h1>
            <p className="text-gray-600">Find your perfect pair from our curated collection.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Toggle for Mobile */}
            {isMobile && (
              <Button 
                onClick={() => setFiltersVisible(!filtersVisible)}
                variant="outline"
                className="flex items-center gap-2 mb-4"
              >
                <Filter className="w-4 h-4" />
                {filtersVisible ? "Hide Filters" : "Show Filters"}
              </Button>
            )}
            
            {/* Filter Sidebar (conditionally rendered on mobile) */}
            {filtersVisible && <FilterSidebar 
              brands={["Nike", "Adidas", "Jordan", "New Balance", "Puma", "Converse"]}
              sizes={[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13]}
              minPrice={0}
              maxPrice={500}
            />}
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">
                  {isLoading ? (
                    "Loading products..."
                  ) : (
                    `Showing ${products?.length || 0} products`
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
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
              ) : products?.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search for something else.
                  </p>
                  <Button
                    onClick={() => window.location.href = "/shop"}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products?.map((product) => (
                    <div 
                      key={product.id}
                      className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md"
                    >
                      <div className="md:w-1/3">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                          <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-4">{product.description}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
                          <Button
                            onClick={() => window.location.href = `/product/${product.id}`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
