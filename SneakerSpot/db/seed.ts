import { db } from "./index";
import { products, drops, lifestylePosts, reviews } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Starting to seed database...");

    // Check if products already exist to avoid duplicates
    const existingProducts = await db.query.products.findMany({
      limit: 1
    });

    if (existingProducts.length === 0) {
      console.log("Seeding products...");
      
      // Seed products
      const productData = [
        {
          name: "Air Jordan 1 Retro High",
          brand: "Nike",
          price: 199.99,
          description: "The Air Jordan 1 Retro High is a timeless silhouette that revolutionized basketball footwear. This iconic design features premium materials, a comfortable fit, and classic colorways that have stood the test of time.",
          imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
          features: [
            "Premium leather upper",
            "Air cushioning in the heel",
            "Padded collar for comfort",
            "Rubber outsole for traction",
            "Iconic Wings logo"
          ],
          rating: 4.5,
          reviewCount: 128,
          isFeatured: true
        },
        {
          name: "Yeezy Boost 350 V2",
          brand: "Adidas",
          price: 249.99,
          description: "The Adidas Yeezy Boost 350 V2 combines style and performance with its distinctive silhouette and responsive Boost cushioning. The Primeknit upper provides a snug, sock-like fit while the innovative lacing system offers additional support.",
          imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [6, 7, 8, 9, 10, 11, 12, 13],
          features: [
            "Primeknit upper for flexibility and breathability",
            "Boost midsole for energy return",
            "Unique center stitching",
            "Rubber outsole for durability",
            "Distinctive lateral side stripe"
          ],
          rating: 4.0,
          reviewCount: 96,
          isFeatured: true
        },
        {
          name: "990v5 Grey",
          brand: "New Balance",
          price: 185.00,
          description: "The New Balance 990v5 Grey continues the legacy of the iconic 990 series. Made in the USA with premium materials, this silhouette delivers unmatched comfort and style. The perfect blend of stability, cushioning, and timeless design.",
          imageUrl: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560073744-7643b964bdf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
          features: [
            "Pigskin/mesh upper for durability and breathability",
            "ENCAP midsole cushioning",
            "Blown rubber outsole for traction and durability",
            "Made in USA",
            "Dual-density collar foam for comfort"
          ],
          rating: 5.0,
          reviewCount: 72,
          isFeatured: true
        },
        {
          name: "Air Max 97 OG",
          brand: "Nike",
          price: 175.00,
          description: "The Nike Air Max 97 OG features a revolutionary design inspired by Japanese bullet trains. With its distinctive wavy upper, reflective details, and full-length Air cushioning, this iconic silhouette delivers unparalleled style and comfort.",
          imageUrl: "https://images.unsplash.com/photo-1540591279158-4dafa7b110fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1540591279158-4dafa7b110fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583979365152-173a8f14181b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590048964291-dbc3c96b3717?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [6, 7, 8, 9, 10, 11, 12],
          features: [
            "Mesh and synthetic upper with welded overlays",
            "Full-length Max Air unit for responsive cushioning",
            "Foam midsole for lightweight comfort",
            "Rubber waffle outsole for traction",
            "Reflective details for visibility"
          ],
          rating: 4.5,
          reviewCount: 58,
          isFeatured: true
        },
        {
          name: "Chuck 70 High Top",
          brand: "Converse",
          price: 85.00,
          description: "The Converse Chuck 70 High Top is a premium upgrade to the classic Chuck Taylor All Star. With enhanced cushioning, reinforced stitching, and premium canvas, this iconic silhouette offers improved comfort while maintaining its timeless style.",
          imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [5, 6, 7, 8, 9, 10, 11, 12],
          features: [
            "Premium canvas upper for durability",
            "Enhanced cushioning for all-day comfort",
            "OrthoLite insole for cushioning",
            "Reinforced stitching for added durability",
            "Vintage look with modern comfort"
          ],
          rating: 4.0,
          reviewCount: 42,
          isFeatured: false
        },
        {
          name: "Suede Classic XXI",
          brand: "Puma",
          price: 75.00,
          description: "The Puma Suede Classic XXI is a modern take on the iconic silhouette that revolutionized sneaker culture. With its premium suede upper, padded collar, and classic formstrip, this timeless design continues to set the standard for street style.",
          imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [7, 8, 9, 10, 11, 12],
          features: [
            "Premium suede upper for durability and style",
            "Padded collar and tongue for comfort",
            "Rubber outsole for grip and traction",
            "Iconic formstrip design",
            "Cushioned footbed for comfort"
          ],
          rating: 4.2,
          reviewCount: 37,
          isFeatured: false
        },
        {
          name: "Dunk Low Retro",
          brand: "Nike",
          price: 110.00,
          description: "The Nike Dunk Low Retro delivers a vintage look with modern comfort. Originally designed for the hardwood, this iconic silhouette has evolved into a streetwear staple. The leather upper, padded collar, and classic colorways pay homage to the original design.",
          imageUrl: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1657979063143-3c735882b1ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1626752876438-3462f5ecb373?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [6, 7, 8, 9, 10, 11, 12, 13],
          features: [
            "Leather upper for durability and support",
            "Perforated toe box for breathability",
            "Padded collar for ankle support",
            "Rubber outsole with pivot point for traction",
            "Low-top design for mobility"
          ],
          rating: 4.7,
          reviewCount: 63,
          isFeatured: true
        },
        {
          name: "Ultraboost 22",
          brand: "Adidas",
          price: 190.00,
          description: "The Adidas Ultraboost 22 combines style and performance with its responsive Boost cushioning and adaptive Primeknit upper. Engineered with data from thousands of runners, this silhouette delivers unmatched comfort and energy return for any activity.",
          imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1640464293382-8edba33385a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1584735174914-6b1272458e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          ],
          availableSizes: [6, 7, 8, 9, 10, 11, 12],
          features: [
            "Primeknit upper for adaptive support",
            "Boost midsole for energy return",
            "Linear Energy Push system for responsive stride",
            "Continental™ Rubber outsole for traction",
            "Redesigned heel counter for stability"
          ],
          rating: 4.8,
          reviewCount: 84,
          isFeatured: true
        }
      ];

      await db.insert(products).values(productData);

      // Seed reviews for products
      const reviewsData = [
        {
          productId: 1,
          author: "MichaelJ",
          date: new Date("2023-08-15"),
          rating: 5,
          comment: "Best Jordan 1 colorway I've ever owned. Quality is top-notch and they're surprisingly comfortable for all-day wear."
        },
        {
          productId: 1,
          author: "SneakerFreak23",
          date: new Date("2023-07-22"),
          rating: 4,
          comment: "Great quality leather, but they do take a few days to break in. Once they're broken in though, they're perfect."
        },
        {
          productId: 2,
          author: "YeezyFan",
          date: new Date("2023-09-03"),
          rating: 5,
          comment: "Super comfortable and the Boost technology really makes a difference when you're on your feet all day."
        },
        {
          productId: 2,
          author: "StreetStyler",
          date: new Date("2023-08-12"),
          rating: 3,
          comment: "Look great but run small. I'd recommend going up half a size from your normal."
        }
      ];

      await db.insert(reviews).values(reviewsData);

      // Seed upcoming and past drops
      const dropData = [
        {
          name: "Air Jordan 4 'Black Cat' Retro",
          brand: "Nike",
          imageUrl: "https://images.unsplash.com/photo-1600181516264-3ea807ff44b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          releaseDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
          price: 225.00,
          description: "The iconic 'Black Cat' colorway returns on the Air Jordan 4. Featuring an all-black nubuck upper with subtle tonal details, this stealthy design pays homage to Michael Jordan's notorious 'Black Cat' nickname.",
          status: "upcoming"
        },
        {
          name: "Yeezy 700 V3 'Copper Fade'",
          brand: "Adidas",
          imageUrl: "https://images.unsplash.com/photo-1584735175315-9d5b23a7dd4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          releaseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          price: 230.00,
          description: "The Yeezy 700 V3 'Copper Fade' features a progressive gradient from deep copper to black across its engineered mesh upper. The RPU cage offers structure while the PU encapsulated EVA midsole provides exceptional comfort.",
          status: "upcoming"
        },
        {
          name: "New Balance 550 'White Grey'",
          brand: "New Balance",
          imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          releaseDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          price: 110.00,
          description: "The New Balance 550 returns in a clean 'White Grey' colorway. This basketball-inspired low-top silhouette features a premium leather upper, perforated details, and subtle grey accents for a versatile, everyday look.",
          status: "upcoming"
        },
        {
          name: "Nike Dunk Low 'University Blue'",
          brand: "Nike",
          imageUrl: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          releaseDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          price: 100.00,
          description: "The Nike Dunk Low 'University Blue' celebrates collegiate colors with its clean white leather base and university blue overlays. This classic silhouette delivers timeless style and versatile appeal for any outfit.",
          status: "sold-out"
        },
        {
          name: "Jordan 11 'Cool Grey'",
          brand: "Nike",
          imageUrl: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          releaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          price: 225.00,
          description: "The iconic Air Jordan 11 'Cool Grey' returns in its original form. Featuring a grey nubuck upper, patent leather mudguard, and icy translucent outsole, this legendary silhouette continues to define basketball and streetwear style.",
          status: "sold-out"
        }
      ];

      await db.insert(drops).values(dropData);

      // Seed lifestyle posts
      const lifestylePostData = [
        {
          title: "How to Style Your Air Jordan 1s: A Complete Guide",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          imageUrl: "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          description: "Discover the versatility of the Air Jordan 1 with our complete styling guide for every season.",
          content: "The Air Jordan 1 is perhaps the most versatile sneaker ever created. From its basketball court origins to its streetwear dominance, this iconic silhouette has transcended its athletic roots to become a fashion staple.\n\nFor spring and summer, pair your AJ1s with cropped pants or shorts to highlight the silhouette. Light wash denim and basic tees create a perfect canvas to let your sneakers be the focal point. For a more elevated look, try chino shorts with an untucked button-up shirt.\n\nIn fall and winter, the high-top design offers both style and protection from the elements. Dark denim, cargo pants, or even tailored trousers can work beautifully. Layer with hoodies, flannel shirts, or light jackets for a balanced proportion.\n\nColorway selection is key to versatility. If you're building your collection, start with classic colorways like 'Chicago,' 'Royal,' or 'Shadow' which offer maximum versatility. More vibrant options like 'Court Purple' or 'Pine Green' can add a perfect pop of color to an otherwise neutral outfit.\n\nRemember, confidence is the most important accessory. Wear your AJ1s with pride, keep them clean, and build outfits that complement rather than compete with your kicks."
        },
        {
          title: "The Sustainable Sneaker Revolution",
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
          imageUrl: "https://images.unsplash.com/photo-1600490232762-bc0141a0b896?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          description: "How the sneaker industry is embracing eco-friendly materials and production methods.",
          content: "The sneaker industry is undergoing a major transformation as sustainability becomes a priority for both brands and consumers. From recycled materials to innovative production processes, the future of footwear is increasingly eco-conscious.\n\nMajor players like Adidas have committed to using only recycled polyester in all products by 2024, while Nike's Move to Zero initiative aims to eliminate carbon emissions and waste. New Balance has introduced recycled PET bottles in its uppers, and Converse has reimagined its Chuck Taylor with recycled canvas and rubber.\n\nBeyond the established brands, newcomers like Allbirds, Veja, and Nothing New are building their identities around sustainable practices from the ground up. These brands prove that performance and style don't have to be sacrificed for environmental responsibility.\n\nThe sustainable revolution extends beyond materials to production methods as well. Brands are investing in zero-waste manufacturing, water conservation, and reduced energy consumption. 3D printing technology is allowing for on-demand production, significantly reducing overstock waste.\n\nAs consumers, we can contribute to this positive change by researching brands' environmental commitments, caring properly for our sneakers to extend their lifespan, and considering secondhand options. The resale market not only offers sustainability benefits but often provides access to coveted styles at better prices.\n\nThe sustainable sneaker revolution is just beginning, and our purchasing decisions have the power to accelerate positive change in the industry."
        },
        {
          title: "Sneaker Collecting 101: Building Your First Rotation",
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
          imageUrl: "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          description: "Essential tips for new collectors on how to build a versatile sneaker collection without breaking the bank.",
          content: "Building a sneaker collection can seem overwhelming with countless releases dropping every week. For beginners, the key is focusing on versatility and quality rather than quantity.\n\nStart with a core rotation of 5-7 pairs that cover different needs. A classic white leather sneaker (like the Adidas Stan Smith or Nike Air Force 1) serves as a versatile foundation. Add a running-inspired silhouette for comfort (New Balance 990 or Nike Air Max 90), a high-top for style variation (Converse Chuck Taylor or Air Jordan 1), and a weather-resistant option for adverse conditions.\n\nResearch is essential before any purchase. Follow sneaker news sites, YouTube channels, and Instagram accounts to learn about quality, sizing, and styling potential. Understanding the resale market can also help you make informed decisions about which sneakers might hold or increase their value.\n\nBe strategic about releases. Not every hyped sneaker deserves your attention or money. Consider how a new addition will complement your existing collection and wardrobe. Sometimes the best pickups are general releases that fly under the radar of hype-driven collectors.\n\nCare for your collection properly with appropriate cleaning methods, storage solutions, and rotation to prevent excessive wear. A well-maintained sneaker will last years longer than a neglected one.\n\nRemember that collecting should be enjoyable. Focus on sneakers that speak to your personal style rather than what's trending. The most satisfying collections reflect the owner's unique taste and lifestyle."
        }
      ];

      await db.insert(lifestylePosts).values(lifestylePostData);

      console.log("Database seeded successfully!");
    } else {
      console.log("Database already contains data, skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
