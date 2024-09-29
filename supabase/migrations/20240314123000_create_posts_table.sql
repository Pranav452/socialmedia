-- Migration: Create posts table
-- Description: Creates the posts table with necessary columns and RLS policies
-- Affected tables: posts
-- Special considerations: Enables Row Level Security (RLS) for the posts table

-- Create the posts table
create table public.posts (
  id bigint generated always as identity primary key,
  content text not null,
  user_id uuid not null default auth.uid() references auth.users(id),
  author text not null,
  created_at timestamptz not null default now()
);

-- Add a comment to describe the table's purpose
comment on table public.posts is 'Stores user-generated posts for the SocialFeed application';

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Create RLS policies for public access (since the current implementation allows public access)

-- Policy for selecting posts (public read access)
create policy "Allow public read access on posts"
  on public.posts
  for select
  to public
  using (true);

-- Policy for inserting posts (authenticated users only)
create policy "Allow authenticated users to create posts"
  on public.posts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Policy for updating posts (authenticated users can only update their own posts)
create policy "Allow users to update their own posts"
  on public.posts
  for update
  to authenticated
  using (auth.uid() = user_id);

-- Policy for deleting posts (authenticated users can only delete their own posts)
create policy "Allow users to delete their own posts"
  on public.posts
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Add comments to explain the rationale behind each policy
comment on policy "Allow public read access on posts" on public.posts is 'Allows anyone to read posts, as the current implementation shows posts to all users';
comment on policy "Allow authenticated users to create posts" on public.posts is 'Allows authenticated users to create new posts, ensuring the user_id matches the authenticated user';
comment on policy "Allow users to update their own posts" on public.posts is 'Allows users to update only their own posts, based on the user_id field';
comment on policy "Allow users to delete their own posts" on public.posts is 'Allows users to delete only their own posts, based on the user_id field';