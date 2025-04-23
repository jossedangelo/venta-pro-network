
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

export const PostsFeed = ({ refreshTrigger = 0 }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentUserId(data.user.id);
      }
    };

    getCurrentUser();
    fetchPosts(true);
  }, []);

  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchPosts(false);
    }
  }, [refreshTrigger]);

  const fetchPosts = async (initialLoad = false) => {
    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      
      // Consulta optimizada que obtiene publicaciones y perfiles en una sola consulta
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          image_url,
          user_id,
          likes_count,
          comments_count,
          recognize_count,
          profiles (
            first_name,
            last_name,
            role,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setLoading(false);
        setIsRefreshing(false);
        return;
      }

      setPosts(postsData);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error al cargar publicaciones",
        description: "No se pudieron cargar las publicaciones. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="space-y-4">
          <div className="flex justify-center items-center mb-4">
            <LoaderCircle className="h-6 w-6 text-primary animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">Cargando publicaciones...</span>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-40 w-full rounded" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && posts.length === 0 && (
        <div className="text-center p-6 border rounded-lg bg-background">
          <p className="text-muted-foreground">No hay publicaciones aún. ¡Sé el primero en compartir algo!</p>
        </div>
      )}

      {isRefreshing && (
        <div className="mb-4 bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-40 w-full rounded" />
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
              fetchPosts(false);
            }
          }}
          isCurrentUser={post.user_id === currentUserId}
          postId={post.id}
          recognizeCount={post.recognize_count || 0}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};
