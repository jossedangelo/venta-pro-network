
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { supabase } from '@/integrations/supabase/client';

export const PostsFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Modificamos la consulta para evitar el error de relación
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(postsData || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
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
            name: post.profiles?.first_name + ' ' + post.profiles?.last_name,
            role: post.profiles?.role || '',
            avatar: post.profiles?.avatar_url
          }}
          content={post.content}
          timestamp={new Date(post.created_at).toLocaleDateString()}
          likes={post.likes_count || 0}
          comments={post.comments_count || 0}
          hasImage={!!post.image_url}
          imageUrl={post.image_url}
          isVideo={post.image_url?.includes('youtube.com') || post.image_url?.includes('youtu.be')}
          onDelete={() => {
            // Implement delete functionality here
          }}
          isCurrentUser={true}
        />
      ))}
    </div>
  );
};
