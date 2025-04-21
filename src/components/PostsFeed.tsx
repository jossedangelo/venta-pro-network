
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, BarChart, Award, Share2 } from "lucide-react";
import CreatePostDialog from "@/components/CreatePostDialog";
import PostCard from "@/components/PostCard";
import { toast } from "@/components/ui/use-toast";

interface PostsFeedProps {
  initialPosts: any[];
}

const PostsFeed = ({ initialPosts }: PostsFeedProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleNewPost = (postData: any) => {
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: "José D'Angelo",
        role: "Sales Development Representative",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      },
      content: postData.content,
      timestamp: postData.scheduledDate
        ? `Programado para ${new Date(postData.scheduledDate).toLocaleString('es-ES', {
            day: 'numeric',
            month: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}`
        : "Ahora",
      likes: 0,
      comments: 0,
      hasImage: postData.image || (postData.linkPreview?.image ? true : false),
      imageUrl: postData.image ? URL.createObjectURL(postData.image) : (postData.linkPreview?.image || ""),
      isVideo: postData.linkPreview?.isVideo || false,
      isScheduled: !!postData.scheduledDate,
      link: postData.linkPreview?.url || "",
      videoId: postData.linkPreview?.videoId || ""
    };

    setPosts([newPost, ...posts]);
    toast({
      title: postData.scheduledDate ? "Post programado" : "Post publicado",
      description: postData.scheduledDate
        ? "Tu actualización ha sido programada correctamente"
        : "Tu actualización ha sido publicada correctamente",
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post eliminado",
      description: "Tu publicación ha sido eliminada correctamente",
    });
  };

  const visiblePosts = posts.filter(post => !post.isScheduled);

  return (
    <>
      {/* Post creation card */}
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
              <ImageIcon className="mr-2 h-4 w-4" />
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

      {visiblePosts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
          onDelete={() => handleDeletePost(post.id)}
          isCurrentUser={post.author.name === "José D'Angelo"}
        />
      ))}
      <CreatePostDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPublish={handleNewPost}
      />
    </>
  );
};

export default PostsFeed;
