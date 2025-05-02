import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format-price";

export default function CartPage() {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };
  
  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const calculateSubtotal = () => {
    return cart?.items?.reduce((total, item) => {
      const price = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(String(item.price));
      return total + (price * item.quantity);
    }, 0) || 0;
  };
  
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 200 ? 0 : 15;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order placed!",
        description: "Your order has been successfully placed.",
      });
      setIsCheckingOut(false);
    }, 1500);
  };
  
  if (!cart?.items || cart.items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart | SneakerLand</title>
          <meta name="description" content="View and manage items in your shopping cart." />
        </Helmet>
        
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold font-outfit mb-8">Your Cart</h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Your Cart | SneakerLand</title>
        <meta name="description" content="View and manage items in your shopping cart." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-outfit mb-8">Your Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-medium">Cart Items ({cart.items.length})</h2>
                </div>
                
                <div className="divide-y">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-600 text-sm">
                              Size: US {item.selectedSize}
                            </p>
                            <p className="text-sm text-gray-500">{item.brand}</p>
                          </div>
                          <p className="font-bold mt-2 sm:mt-0">{formatPrice(item.price)}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 border-r"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 border-l"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {calculateShipping() === 0 
                        ? "Free" 
                        : formatPrice(calculateShipping())}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                    {calculateShipping() === 0 && (
                      <p className="text-green-600 text-sm mt-2">
                        You've qualified for free shipping!
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-accent hover:bg-accent/90"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">We Accept</h3>
                  <div className="flex space-x-2">
                    <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                    <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">MC</div>
                    <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                    <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">PPAY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
