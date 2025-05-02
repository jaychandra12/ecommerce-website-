import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const lifestyleImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Street style outfit with sneakers"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600490232762-bc0141a0b896?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Urban fashion"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Sneakerhead lifestyle"
  }
];

export default function LifestyleCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold font-outfit">Street Style</h2>
          <Link href="/lifestyle" className="text-accent font-medium flex items-center group">
            View All
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleImages.map((image) => (
            <Link key={image.id} href={`/lifestyle/${image.id}`}>
              <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover-zoom"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
