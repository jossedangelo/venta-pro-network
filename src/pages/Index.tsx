
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import ProfileSummary from "@/components/ProfileSummary";
import ConnectionCard from "@/components/ConnectionCard";
import { Share2, Image, BarChart, Award } from "lucide-react";
import { useState } from "react";
import CreatePostDialog from "@/components/CreatePostDialog";
import { toast } from "@/components/ui/use-toast";

const suggestedConnections = [
  {
    name: "Ana Pérez",
    role: "Sales Manager",
    company: "InnovaTech",
    mutualConnections: 12,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80"
  },
  {
    name: "Roberto Silva",
    role: "Account Executive",
    company: "GlobalSoft",
    mutualConnections: 8,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=85"
  },
  {
    name: "Elena Torres",
    role: "Business Development",
    company: "SalesForce",
    mutualConnections: 15,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=85"
  }
];

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: "1",
      author: {
        name: "María García",
        role: "Directora de Ventas en TechCorp",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80"
      },
      content: "Acabo de cerrar el trimestre con un 135% de cumplimiento! Todo el esfuerzo valió la pena. Gracias a mi equipo por el increíble trabajo.",
      timestamp: "Hace 2 horas",
      likes: 34,
      comments: 8,
      hasImage: false
    },
    {
      id: "2",
      author: {
        name: "Juan Martínez",
        role: "Account Executive en SaaS Solutions",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80"
      },
      content: "Compartiendo mi experiencia en el evento de ventas consultivas de ayer. Aprendí técnicas revolucionarias para entender las necesidades ocultas de los clientes.",
      timestamp: "Hace 5 horas",
      likes: 22,
      comments: 4,
      hasImage: true,
      imageUrl: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop"
    }
  ]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleNewPost = (postData) => {
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: "José D'Angelo",
        role: "Sales Development Representative",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      },
      content: postData.content,
      timestamp: "Ahora",
      likes: 0,
      comments: 0,
      hasImage: postData.linkPreview?.image ? true : false,
      imageUrl: postData.linkPreview?.image || "",
      isVideo: postData.linkPreview?.isVideo || false
    };
    
    setPosts([newPost, ...posts]);
    toast({
      title: "Post publicado",
      description: "Tu actualización ha sido publicada correctamente",
    });
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post eliminado",
      description: "Tu publicación ha sido eliminada correctamente",
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Contenido principal */}
      <div className="col-span-12 lg:col-span-8">
        {/* Compartir actualización */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center mb-4">
              <Input 
                placeholder="Comparte una actualización o noticia..." 
                className="flex-grow cursor-pointer" 
                onClick={handleOpenDialog}
                readOnly
              />
              <Button onClick={handleOpenDialog}>Publicar</Button>
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" className="flex items-center" onClick={handleOpenDialog}>
                <Image className="mr-2 h-4 w-4" />
                Foto
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center" onClick={handleOpenDialog}>
                <BarChart className="mr-2 h-4 w-4" />
                Estadística
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center" onClick={handleOpenDialog}>
                <Award className="mr-2 h-4 w-4" />
                Logro
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center" onClick={handleOpenDialog}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="destacado" className="mb-4">
          <TabsList>
            <TabsTrigger value="destacado">Destacado</TabsTrigger>
            <TabsTrigger value="reciente">Reciente</TabsTrigger>
            <TabsTrigger value="siguiendo">Siguiendo</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            {...post} 
            onDelete={() => handleDeletePost(post.id)}
            isCurrentUser={post.author.name === "José D'Angelo"}
          />
        ))}
      </div>
      
      {/* Sidebar derecho */}
      <aside className="hidden lg:block lg:col-span-4">
        <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)]">
          <ProfileSummary />
          
          <Card className="mb-4 mt-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Conexiones recomendadas</h3>
              <div className="grid gap-4">
                {suggestedConnections.map((person, index) => (
                  <ConnectionCard key={index} person={person} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Post Creation Dialog */}
      <CreatePostDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onPublish={handleNewPost}
      />
    </div>
  );
};

export default Index;
