'use client'

import { useEffect, useState } from 'react'
import { Post } from "@/types/post"
import { AvatarImage } from "./components/avatar-image"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Header } from './components/header'
import { CreatePostForm } from './components/create-post-form'
import { Button } from "@/components/ui/button"
import { PlusIcon } from '@radix-ui/react-icons'
import { User } from '@supabase/auth-helpers-nextjs'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const supabase = createClientComponentClient()

  const fetchPosts = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching posts:', error)
      setError('Failed to load posts. Please try again later.')
    } else {
      setPosts(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPosts()

    // Check for user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        {user && (
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setIsCreatePostOpen(true)}
              className="rounded-full w-12 h-12 flex items-center justify-center"
            >
              <PlusIcon className="w-6 h-6" />
            </Button>
          </div>
        )}
        {isCreatePostOpen && user && (
          <CreatePostForm
            user={user}
            onPostCreated={() => {
              fetchPosts()
              setIsCreatePostOpen(false)
            }}
            onClose={() => setIsCreatePostOpen(false)}
          />
        )}
        {isLoading ? (
          <p className="text-center">Loading posts...</p>
        ) : (
          <ul className="space-y-6 max-w-2xl mx-auto">
            {posts.map((post) => (
              <li key={post.id} className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <AvatarImage author={post.author} />
                  <div>
                    <h2 className="font-semibold text-lg">{post.author}</h2>
                    <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-4 text-lg">{post.content}</p>
                <div className="flex justify-between text-gray-500 text-sm">
                  <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like
                  </button>
                  <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Comment
                  </button>
                  <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
      </main>
    </div>
  )
}