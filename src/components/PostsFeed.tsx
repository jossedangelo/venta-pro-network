import { useState, useEffect } from 'react';
import { Post } from './Post';
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
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
