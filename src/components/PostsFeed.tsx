
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CreatePost } from "./CreatePost";
import PostCard from "./PostCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  content: string;
  image_url?: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
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
          *,
          profiles (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (error: any) {
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
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <CreatePost />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          author={{
            name: `${post.profiles.first_name} ${post.profiles.last_name}`,
            avatar: post.profiles.avatar_url
          }}
          content={post.content}
          imageUrl={post.image_url}
          timestamp={new Date(post.created_at).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default PostsFeed;
