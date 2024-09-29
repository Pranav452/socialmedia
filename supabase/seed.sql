-- Seed data for the posts table
INSERT INTO public.posts (content, user_id, author, created_at)
VALUES
  ('Just finished a great book on web development! 📚 #coding #webdev', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Alice Johnson', '2024-03-14T10:00:00Z'),
  ('Beautiful sunset at the beach today. 🌅 #nature #photography', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Bob Smith', '2024-03-14T11:30:00Z'),
  ('Excited to start my new coding project using Next.js! 💻 #nextjs #javascript', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Charlie Brown', '2024-03-14T13:15:00Z'),
  ('Just adopted a cute puppy! 🐶 #pets #doglovers', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Diana Ross', '2024-03-14T15:45:00Z'),
  ('Trying out a new recipe for dinner tonight. Wish me luck! 🍳 #cooking #foodie', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Ethan Hunt', '2024-03-14T18:20:00Z'),
  ('Finally solved that tricky bug in my code. Feels great! 🎉 #debugging #programming', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Alice Johnson', '2024-03-15T09:10:00Z'),
  ('Morning jog in the park. Starting the day right! 🏃‍♂️ #fitness #health', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Bob Smith', '2024-03-15T07:30:00Z'),
  ('Just launched my personal portfolio website. Check it out! 🚀 #webdesign #portfolio', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Charlie Brown', '2024-03-15T14:00:00Z'),
  ('Movie night with friends. Popcorn ready! 🍿 #movies #friends', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Diana Ross', '2024-03-15T20:00:00Z'),
  ('Learning about AI and machine learning. Fascinating stuff! 🤖 #AI #ML', '6eda0fa6-1ce6-466c-9f74-86fda0f71f51', 'Ethan Hunt', '2024-03-16T11:45:00Z');

-- Add a comment to explain the purpose of this seed data
COMMENT ON TABLE public.posts IS 'Initial seed data for the posts table, providing a variety of sample posts for testing and development. All posts are associated with a single user ID for testing purposes.';
