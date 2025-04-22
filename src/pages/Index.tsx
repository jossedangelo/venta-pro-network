
import { PostsFeed } from "@/components/PostsFeed";
import SidebarRight from "@/components/SidebarRight";
import { CreatePost } from "@/components/CreatePost";
import { useEffect, useState } from "react";

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
  const [refreshPosts, setRefreshPosts] = useState(0);
  
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        <h1 className="text-2xl font-bold mb-4">Actividad</h1>
        <CreatePost 
          onPostCreated={() => setRefreshPosts(prev => prev + 1)} 
        />
        <PostsFeed key={refreshPosts} />
      </div>
      <SidebarRight userCity={userCity} suggestedConnections={suggestedConnections} />
    </div>
  );
};

export default Index;
