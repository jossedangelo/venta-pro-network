import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CreatePost } from "./CreatePost";
import PostCard from "./PostCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Profile {
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface Post {
  id: string;
  content: string;
  image_url?: string;
  created_at: string;
  profiles: Profile;
}

const PostsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          image_url,
          created_at,
          updated_at,
          user_id,
          profiles:user_id (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedPosts = data.map(post => ({
          id: post.id,
          content: post.content,
          image_url: post.image_url,
          created_at: post.created_at,
          profiles: post.profiles && typeof post.profiles === 'object' 
            ? post.profiles as Profile
            : { first_name: 'Usuario', last_name: 'Anónimo' }
        }));
        
        setPosts(formattedPosts);
      }
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error al cargar los posts",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div>
      <CreatePost onPostCreated={fetchPosts} />
      {posts.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          No hay publicaciones. ¡Sé el primero en compartir algo!
        </Card>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            author={{
              name: `${post.profiles.first_name} ${post.profiles.last_name}`,
              role: "Usuario",
              avatar: post.profiles.avatar_url || ""
            }}
            content={post.content}
            imageUrl={post.image_url}
            timestamp={new Date(post.created_at).toLocaleString()}
            likes={0}
            comments={[]}
          />
        ))
      )}
    </div>
  );
};

export default PostsFeed;
