import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Premium sneakers on display" 
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-outfit mb-4 leading-tight">
              Own the Street.<br />Rock the Culture.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              The ultimate destination for premium sneakers and authentic streetwear.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-accent text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition duration-300 font-outfit h-auto"
              >
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="text-white border-white bg-transparent hover:bg-white hover:text-black transition duration-300 font-outfit h-auto px-8 py-3"
              >
                <Link href="/drops">Explore Drops</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
