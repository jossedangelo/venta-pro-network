
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "@/hooks/use-toast";

export const PostsFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentUserId(data.user.id);
      }
    };

    getCurrentUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch posts with author information
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          image_url,
          user_id,
          likes_count,
          comments_count
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      // If no posts, show empty state
      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Get user profiles for each post
      const postsWithProfiles = await Promise.all(
        postsData.map(async (post: any) => {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name, role, avatar_url')
            .eq('id', post.user_id)
            .single();

          if (profileError) {
            console.error('Error fetching profile for post:', profileError);
            return {
              ...post,
              profiles: {
                first_name: 'Usuario',
                last_name: 'Desconocido',
                role: '',
                avatar_url: null
              }
            };
          }

          return {
            ...post,
            profiles: profileData
          };
        })
      );
      
      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error al cargar publicaciones",
        description: "No se pudieron cargar las publicaciones. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-[200px] rounded-lg" />
          ))}
        </div>
      )}
      
      {!loading && posts.length === 0 && (
        <div className="text-center p-6 border rounded-lg bg-background">
          <p className="text-muted-foreground">No hay publicaciones aún. ¡Sé el primero en compartir algo!</p>
        </div>
      )}
      
      {posts.map((post) => (
        <PostCard 
          key={post.id}
          author={{
            name: `${post.profiles?.first_name || ''} ${post.profiles?.last_name || ''}`.trim(),
            role: post.profiles?.role || '',
            avatar: post.profiles?.avatar_url
          }}
          content={post.content}
          timestamp={new Date(post.created_at).toLocaleDateString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })}
          likes={post.likes_count || 0}
          comments={post.comments_count || 0}
          hasImage={!!post.image_url}
          imageUrl={post.image_url}
          isVideo={post.image_url?.includes('youtube.com') || post.image_url?.includes('youtu.be')}
          onDelete={async () => {
            const { error } = await supabase
              .from('posts')
              .delete()
              .eq('id', post.id);
            
            if (!error) {
              fetchPosts();
            }
          }}
          isCurrentUser={post.user_id === currentUserId}
        />
      ))}
    </div>
  );
};
