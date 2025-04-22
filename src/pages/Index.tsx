
import { PostsFeed } from "@/components/PostsFeed";
import SidebarRight from "@/components/SidebarRight";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import CreatePostDialog from "@/components/CreatePostDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const suggestedConnections = [
  {
    name: "Marina González",
    role: "Chief Marketing Officer",
    company: "TechVision Corp",
    mutualConnections: 12,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80",
    city: "Madrid"
  },
  {
    name: "Carlos Mendoza",
    role: "Sales Director",
    company: "GlobalTech Solutions",
    mutualConnections: 8,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80",
    city: "Barcelona"
  }
];

const userCity = "Madrid";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const feedRef = useRef<any>(null);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(profile);
      }
    };
    getUserData();
  }, []);

  const handlePostCreated = () => {
    // Increment the key to force a re-render of the PostsFeed component
    setRefreshKey(prev => prev + 1);
    
    // Scroll to the top of the feed to see the new post
    setTimeout(() => {
      if (feedRef.current) {
        window.scrollTo({
          top: feedRef.current.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    }, 100);
    
    // Show a success toast
    toast({
      title: "Publicación creada",
      description: "Tu contenido ha sido publicado correctamente",
    });
  };
  
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        <h1 className="text-2xl font-bold mb-4">Actividad</h1>
        
        {/* LinkedIn-style post creation card */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userProfile?.avatar_url} />
                <AvatarFallback>
                  {userProfile?.first_name?.[0]}
                  {userProfile?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-500 bg-gray-50 hover:bg-gray-100 h-12 px-4 border-gray-300"
                onClick={() => setOpenPostDialog(true)}
              >
                <span>¿Sobre qué quieres hablar?</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Create post dialog */}
        <CreatePostDialog 
          open={openPostDialog} 
          onOpenChange={setOpenPostDialog}
          onPublish={() => {
            handlePostCreated();
            setOpenPostDialog(false);
          }}
        />
        
        <div ref={feedRef} className="mt-6">
          <PostsFeed key={refreshKey} refreshTrigger={refreshKey} />
        </div>
      </div>
      <SidebarRight userCity={userCity} suggestedConnections={suggestedConnections} />
    </div>
  );
};

export default Index;
