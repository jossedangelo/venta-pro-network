
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
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          *,
          profile:profiles!inner(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(postsData || []);
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
            name: post.profile?.first_name + ' ' + post.profile?.last_name,
            role: post.profile?.role || '',
            avatar: post.profile?.avatar_url
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
