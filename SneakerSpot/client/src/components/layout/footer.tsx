import { Link } from "wouter";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold font-outfit mb-6">SneakerLand</h3>
            <p className="text-gray-400 mb-6">
              The ultimate destination for premium sneakers and authentic streetwear.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-white hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" className="text-white hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="text-white hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">All Sneakers</Link>
              </li>
              <li>
                <Link href="/shop?brand=nike" className="text-gray-400 hover:text-white transition-colors">Nike</Link>
              </li>
              <li>
                <Link href="/shop?brand=adidas" className="text-gray-400 hover:text-white transition-colors">Adidas</Link>
              </li>
              <li>
                <Link href="/shop?brand=jordan" className="text-gray-400 hover:text-white transition-colors">Jordan</Link>
              </li>
              <li>
                <Link href="/shop?brand=newbalance" className="text-gray-400 hover:text-white transition-colors">New Balance</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/authenticity" className="text-gray-400 hover:text-white transition-colors">Authenticity Guarantee</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SneakerLand. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-xs text-black font-bold">VISA</div>
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-xs text-black font-bold">MC</div>
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-xs text-black font-bold">AMEX</div>
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-xs text-black font-bold">PPAY</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
