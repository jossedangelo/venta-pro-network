
import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { supabase } from '@/integrations/supabase/client';

export const PostsFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
        *,
        profiles:profiles(*)
      `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
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
          isVideo={post.is_video}
          onDelete={() => {
            // Implement delete functionality here
          }}
          isCurrentUser={true}
        />
      ))}
    </div>
  );
};
