import { useState } from "react";
import { Link } from "wouter";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@shared/schema";
import { formatPrice } from "@/lib/format-price";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovering, setIsHovering] = useState(false);

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

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 object-cover hover-zoom"
          />
        </Link>
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            onClick={() => addToCart(product)}
            className="bg-white text-black px-4 py-2 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 h-auto"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Link href={`/product/${product.id}`}>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex mr-1">
                  {renderStars(Number(product.rating))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount})</span>
              </div>
            </div>
            <p className="font-bold text-lg">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
