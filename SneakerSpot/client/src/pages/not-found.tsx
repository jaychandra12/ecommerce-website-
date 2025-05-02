import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404: Page Not Found | SneakerLand</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#FF3131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-outfit mb-2">
            404: Lost your kicks?
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for seems to have stepped out.
          </p>
          
          <Button asChild size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
