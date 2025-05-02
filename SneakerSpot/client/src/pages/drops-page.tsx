import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Clock, BellPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/format-price";

interface Drop {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  releaseDate: string;
  price: number;
  description: string;
  status: "upcoming" | "sold-out";
}

export default function DropsPage() {
  const [email, setEmail] = useState("");
  const [selectedDrop, setSelectedDrop] = useState<Drop | null>(null);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: drops, isLoading } = useQuery<{upcoming: Drop[], past: Drop[]}>({
    queryKey: ["/api/drops"],
  });
  
  const handleNotify = (drop: Drop) => {
    setSelectedDrop(drop);
    setNotifyDialogOpen(true);
  };
  
  const submitNotification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    // Simulating an API call
    setTimeout(() => {
      toast({
        title: "Notification Set!",
        description: `We'll email you when ${selectedDrop?.name} drops.`,
      });
      setEmail("");
      setNotifyDialogOpen(false);
    }, 500);
  };
  
  const calculateTimeRemaining = (releaseDate: string) => {
    const releaseTime = new Date(releaseDate).getTime();
    const now = new Date().getTime();
    const timeRemaining = releaseTime - now;
    
    if (timeRemaining <= 0) {
      return "Released";
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="w-48 h-8 bg-gray-200 animate-pulse mb-8"></div>
        <div className="w-full h-12 bg-gray-200 animate-pulse mb-6"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="mb-6 bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-24 bg-gray-200 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Upcoming Drops | SneakerLand</title>
        <meta name="description" content="Stay updated on the latest sneaker releases and drops." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-outfit mb-2">Sneaker Drops</h1>
          <p className="text-gray-600 mb-8">Stay updated on the hottest upcoming and recent sneaker releases.</p>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming Drops</TabsTrigger>
              <TabsTrigger value="past">Past Drops</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-6">
                {drops?.upcoming.map((drop) => (
                  <div 
                    key={drop.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img 
                          src={drop.imageUrl} 
                          alt={drop.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-500 text-sm mb-1">{drop.brand}</p>
                              <h3 className="text-xl font-bold mb-2">{drop.name}</h3>
                            </div>
                            <p className="font-bold text-lg">{formatPrice(drop.price)}</p>
                          </div>
                          <p className="text-gray-600 mb-4">{drop.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-accent" />
                            <div>
                              <p className="text-sm text-gray-500">Releasing on {new Date(drop.releaseDate).toLocaleDateString()}</p>
                              <p className="font-medium">{calculateTimeRemaining(drop.releaseDate)}</p>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => handleNotify(drop)}
                            className="flex items-center gap-2"
                          >
                            <BellPlus className="h-4 w-4" />
                            Get Notified
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {drops?.upcoming.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">No upcoming drops</h3>
                    <p className="text-gray-600">
                      Check back soon for new release announcements.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="space-y-6">
                {drops?.past.map((drop) => (
                  <div 
                    key={drop.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden opacity-75 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 relative">
                        <img 
                          src={drop.imageUrl} 
                          alt={drop.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sold Out
                        </div>
                      </div>
                      <div className="p-6 md:w-3/4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-500 text-sm mb-1">{drop.brand}</p>
                            <h3 className="text-xl font-bold mb-2">{drop.name}</h3>
                          </div>
                          <p className="font-bold text-lg">{formatPrice(drop.price)}</p>
                        </div>
                        <p className="text-gray-600 mb-4">{drop.description}</p>
                        <p className="text-sm text-gray-500">
                          Released on {new Date(drop.releaseDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {drops?.past.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">No past drops</h3>
                    <p className="text-gray-600">
                      Check the upcoming tab for new releases.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Notification Dialog */}
      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Drop Notification</DialogTitle>
            <DialogDescription>
              We'll email you when {selectedDrop?.name} drops on {selectedDrop ? new Date(selectedDrop.releaseDate).toLocaleDateString() : ''}.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={submitNotification}>
            <div className="py-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">Notify Me</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
