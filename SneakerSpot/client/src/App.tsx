import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HomePage from "@/pages/home-page";
import ShopPage from "@/pages/shop-page";
import ProductPage from "@/pages/product-page";
import DropsPage from "@/pages/drops-page";
import LifestylePage from "@/pages/lifestyle-page";
import CartPage from "@/pages/cart-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/drops" component={DropsPage} />
      <Route path="/lifestyle" component={LifestylePage} />
      <ProtectedRoute path="/cart" component={CartPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
