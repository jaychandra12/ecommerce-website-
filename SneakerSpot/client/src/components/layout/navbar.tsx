import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  User,
  Search,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { cart } = useCart();
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const cartItemsCount = cart?.items?.length || 0;

  // Active link styling
  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold font-outfit">
              Sneaker<span className="text-accent">Land</span>
            </h1>
          </Link>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              <Link href="/" className={`nav-link font-medium ${isActive("/") ? "text-accent" : ""}`}>
                Home
              </Link>
              <Link href="/shop" className={`nav-link font-medium ${isActive("/shop") ? "text-accent" : ""}`}>
                Shop
              </Link>
              <Link href="/drops" className={`nav-link font-medium ${isActive("/drops") ? "text-accent" : ""}`}>
                Drops
              </Link>
              <Link href="/lifestyle" className={`nav-link font-medium ${isActive("/lifestyle") ? "text-accent" : ""}`}>
                Lifestyle
              </Link>
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {!isMobile && (
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {!isMobile && (
              user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{user.username}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" size="icon" aria-label="User">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )
            )}
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-white w-full border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link href="/" className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
              Home
            </Link>
            <Link href="/shop" className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
              Shop
            </Link>
            <Link href="/drops" className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
              Drops
            </Link>
            <Link href="/lifestyle" className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
              Lifestyle
            </Link>
            {user ? (
              <>
                <div className="py-2 px-4 font-medium">
                  Signed in as: {user.username}
                </div>
                <Button
                  variant="ghost"
                  className="justify-start py-2 px-4 h-auto font-medium"
                  onClick={() => {
                    logoutMutation.mutate();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth" className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                Login / Register
              </Link>
            )}
            <div className="pt-2 relative mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search"
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
