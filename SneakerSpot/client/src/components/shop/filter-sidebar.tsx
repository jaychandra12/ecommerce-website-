import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  brands: string[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
}

export default function FilterSidebar({ 
  brands = ["Nike", "Adidas", "Jordan", "New Balance", "Puma", "Converse"],
  sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
  minPrice = 0,
  maxPrice = 500
}: FilterSidebarProps) {
  const [location, setLocation] = useLocation();
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Parse existing URL parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Handle brands
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrands(brandParam.split(","));
    }
    
    // Handle sizes
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      setSelectedSizes(sizeParam.split(",").map(size => parseFloat(size)));
    }
    
    // Handle price range
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    if (minPriceParam && maxPriceParam) {
      setPriceRange([parseFloat(minPriceParam), parseFloat(maxPriceParam)]);
    }
    
    // Handle sort
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSortBy(sortParam);
    }
  }, []);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleSizeChange = (size: number, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams();
    
    // Add brands
    if (selectedBrands.length > 0) {
      searchParams.set("brand", selectedBrands.join(","));
    }
    
    // Add sizes
    if (selectedSizes.length > 0) {
      searchParams.set("size", selectedSizes.join(","));
    }
    
    // Add price range
    if (priceRange[0] !== minPrice) {
      searchParams.set("minPrice", priceRange[0].toString());
    }
    if (priceRange[1] !== maxPrice) {
      searchParams.set("maxPrice", priceRange[1].toString());
    }
    
    // Add sort
    if (sortBy !== "featured") {
      searchParams.set("sort", sortBy);
    }
    
    // Update URL
    const queryString = searchParams.toString();
    setLocation(`/shop${queryString ? `?${queryString}` : ''}`);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange([minPrice, maxPrice]);
    setSortBy("featured");
    setLocation("/shop");
  };

  return (
    <div className="w-full lg:w-64 mb-6 lg:mb-0">
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={resetFilters}
          >
            Reset All
          </Button>
        </div>
        
        {/* Sort By */}
        <div className="mb-6">
          <Label htmlFor="sort-by" className="block mb-2 font-medium">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Brand */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Brand</h4>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <Checkbox 
                  id={`brand-${brand}`} 
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <label 
                  htmlFor={`brand-${brand}`}
                  className="ml-2 text-sm cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Size */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Size (US)</h4>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center">
                <Checkbox 
                  id={`size-${size}`} 
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <label 
                  htmlFor={`size-${size}`}
                  className="ml-2 text-sm cursor-pointer"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Price Range</h4>
          <Slider
            defaultValue={priceRange}
            max={maxPrice}
            min={minPrice}
            step={10}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
        
        {/* Apply Filters Button */}
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
