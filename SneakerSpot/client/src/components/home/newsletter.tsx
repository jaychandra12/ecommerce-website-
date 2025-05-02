import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // In a real app, you would call an API endpoint here
      // await apiRequest("POST", "/api/newsletter", { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-accent text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-outfit mb-4">Get Exclusive Drops</h2>
          <p className="text-lg mb-8">
            Sign up for our newsletter to receive early access to releases, restock alerts, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-md text-black flex-grow max-w-md focus:outline-none h-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity h-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
