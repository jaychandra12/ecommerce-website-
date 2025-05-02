import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Helmet } from "react-helmet";
import { Star, StarHalf, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format-price";
import { Product } from "@shared/schema";
import ProductCard from "@/components/shop/product-card";

export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const productId = parseInt(params?.id || "0");
  
  const { data: product, isLoading: isProductLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });
  
  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/related/${productId}`],
    enabled: !!productId,
  });
  
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    addToCart({
      ...product,
      selectedSize: parseFloat(selectedSize)
    });
  };
  
  const nextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 w-4 h-4" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 w-4 h-4" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-yellow-400 w-4 h-4" />);
    }

    return stars;
  };
  
  if (isProductLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-full md:w-1/2">
            <div className="w-32 h-4 bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-72 h-8 bg-gray-200 animate-pulse mb-4"></div>
            <div className="w-24 h-6 bg-gray-200 animate-pulse mb-6"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-200 animate-pulse mb-6"></div>
            <div className="w-48 h-10 bg-gray-200 animate-pulse mb-4"></div>
            <div className="w-full h-12 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/shop">Back to Shop</a>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`${product.name} | SneakerLand`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="bg-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Gallery */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={product.images?.[currentImageIndex] || product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.images && product.images.length > 1 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`aspect-square rounded cursor-pointer border-2 ${currentImageIndex === index ? 'border-accent' : 'border-transparent'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-2 font-outfit">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-bold mb-6">{formatPrice(product.price)}</p>
              
              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Size (US)</label>
                <Select value={selectedSize} onValueChange={handleSizeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.availableSizes?.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        US {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart} 
                className="w-full mb-6 bg-accent hover:bg-accent/90 text-white"
                size="lg"
              >
                Add to Cart
              </Button>
              
              {/* Product Tabs */}
              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <div className="prose max-w-none">
                    <p>{product.description}</p>
                    
                    {product.features && (
                      <div className="mt-4">
                        <h4 className="text-lg font-medium mb-2">Features:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-4">
                    {product.reviews?.length ? (
                      product.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="font-medium">{review.author}</span>
                            <span className="text-gray-500 text-sm ml-auto">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet for this product.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 font-outfit">You Might Also Like</h2>
            
            {isRelatedLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts?.slice(0, 4).map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
