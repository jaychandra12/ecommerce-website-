import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";

interface LifestylePost {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
  content?: string;
}

export default function LifestylePage() {
  const [match, params] = useRoute("/lifestyle/:id");
  const postId = match ? parseInt(params.id) : null;
  
  const { data: posts, isLoading: isPostsLoading } = useQuery<LifestylePost[]>({
    queryKey: ["/api/lifestyle"],
  });
  
  const { data: post, isLoading: isPostLoading } = useQuery<LifestylePost>({
    queryKey: [`/api/lifestyle/${postId}`],
    enabled: !!postId,
  });
  
  // If we're viewing a single post
  if (match && postId) {
    if (isPostLoading) {
      return (
        <div className="container mx-auto px-4 py-12">
          <div className="w-full h-96 bg-gray-200 animate-pulse mb-8 rounded-lg"></div>
          <div className="w-3/4 h-10 bg-gray-200 animate-pulse mb-4"></div>
          <div className="w-1/4 h-6 bg-gray-200 animate-pulse mb-8"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      );
    }
    
    if (!post) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="mb-6">The lifestyle post you're looking for doesn't exist.</p>
          <Link href="/lifestyle" className="text-accent hover:underline">
            Back to Lifestyle
          </Link>
        </div>
      );
    }
    
    return (
      <>
        <Helmet>
          <title>{`${post.title} | SneakerLand Lifestyle`}</title>
          <meta name="description" content={post.description} />
        </Helmet>
        
        <div className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <Link href="/lifestyle" className="inline-flex items-center text-accent hover:underline mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lifestyle
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-[60vh] object-cover rounded-lg mb-8"
              />
              
              <h1 className="text-3xl md:text-4xl font-bold font-outfit mb-4">{post.title}</h1>
              <p className="text-gray-500 mb-8">{new Date(post.date).toLocaleDateString()}</p>
              
              <div className="prose max-w-none">
                {post.content?.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  // Lifestyle gallery view
  return (
    <>
      <Helmet>
        <title>Lifestyle | SneakerLand</title>
        <meta name="description" content="Explore sneaker culture, styling tips, and urban fashion trends." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-outfit mb-2">Sneaker Lifestyle</h1>
          <p className="text-gray-600 mb-12">Explore the culture, fashion, and stories behind your favorite kicks.</p>
          
          {isPostsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="w-3/4 h-6 bg-gray-200 animate-pulse mb-2"></div>
                    <div className="w-1/4 h-4 bg-gray-200 animate-pulse mb-3"></div>
                    <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
                    <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <Link key={post.id} href={`/lifestyle/${post.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover-zoom"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{new Date(post.date).toLocaleDateString()}</p>
                      <p className="text-gray-600 line-clamp-3">{post.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
