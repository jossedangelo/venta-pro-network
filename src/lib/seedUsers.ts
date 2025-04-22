
import { supabase } from '@/integrations/supabase/client';

export const createFakeUsers = async () => {
  const users = [
    {
      email: 'marina.gonzalez@techvision.com',
      password: 'TechVision2025!',
      metadata: {
        first_name: 'Marina',
        last_name: 'González',
        role: 'Chief Marketing Officer',
        company: 'TechVision Corp'
      }
    },
    {
      email: 'carlos.mendoza@globaltech.com',
      password: 'GlobalTech2025!',
      metadata: {
        first_name: 'Carlos',
        last_name: 'Mendoza',
        role: 'Sales Director',
        company: 'GlobalTech Solutions'
      }
    }
  ];

  for (const user of users) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: user.metadata
        }
      });

      if (error) {
        console.error('Error creating user:', error);
        continue;
      }

      console.log('User created:', data.user?.email);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }
};
