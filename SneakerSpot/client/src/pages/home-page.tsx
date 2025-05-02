import HeroSection from "@/components/home/hero-section";
import FeaturedDrops from "@/components/home/featured-drops";
import BrandLogos from "@/components/home/brand-logos";
import LifestyleCarousel from "@/components/home/lifestyle-carousel";
import BrandStory from "@/components/home/brand-story";
import Newsletter from "@/components/home/newsletter";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>SneakerLand - Premium Sneaker Marketplace</title>
        <meta name="description" content="The ultimate destination for premium sneakers and authentic streetwear." />
      </Helmet>
      
      <HeroSection />
      <FeaturedDrops />
      <BrandLogos />
      <LifestyleCarousel />
      <BrandStory />
      <Newsletter />
    </>
  );
}
