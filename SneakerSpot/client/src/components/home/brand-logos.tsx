import { Link } from "wouter";

interface Brand {
  id: string;
  name: string;
}

const brands: Brand[] = [
  { id: "nike", name: "NIKE" },
  { id: "adidas", name: "ADIDAS" },
  { id: "jordan", name: "JORDAN" },
  { id: "newbalance", name: "NB" },
  { id: "puma", name: "PUMA" },
  { id: "converse", name: "CONVERSE" }
];

export default function BrandLogos() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-outfit mb-10 text-center">Shop By Brand</h2>
        <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-4 justify-between">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/shop?brand=${brand.id}`}>
              <div className="flex-shrink-0 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-20 h-20 flex items-center justify-center">
                  <span className="text-xl font-bold">{brand.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
