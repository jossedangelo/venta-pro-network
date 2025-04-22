
import { PostsFeed } from "@/components/PostsFeed";
import SidebarRight from "@/components/SidebarRight";
import { CreatePost } from "@/components/CreatePost";
import { useEffect, useState, useRef } from "react";

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
  };
  
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        <h1 className="text-2xl font-bold mb-4">Actividad</h1>
        <CreatePost onPostCreated={handlePostCreated} />
        <div ref={feedRef} className="mt-6">
          <PostsFeed key={refreshKey} refreshTrigger={refreshKey} />
        </div>
      </div>
      <SidebarRight userCity={userCity} suggestedConnections={suggestedConnections} />
    </div>
  );
};

export default Index;
