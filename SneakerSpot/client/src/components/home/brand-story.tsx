import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function BrandStory() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-outfit mb-6">Our Story</h2>
          <p className="text-lg leading-relaxed mb-8">
            SneakerLand was born from a passion for sneaker culture and urban lifestyle. We're more than just a marketplace—we're a community of collectors, enthusiasts, and trendsetters united by our love for authentic style and premium footwear.
          </p>
          <p className="text-lg leading-relaxed mb-10">
            From rare collectibles to the latest drops, we curate only the best for those who understand that sneakers aren't just shoes—they're a statement, an investment, and a way of life.
          </p>
          <Button 
            asChild
            className="border-2 border-white text-white bg-transparent px-8 py-3 rounded-md font-medium hover:bg-white hover:text-black transition duration-300 font-outfit h-auto"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
