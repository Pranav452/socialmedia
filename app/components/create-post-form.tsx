'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/auth-helpers-nextjs'

interface CreatePostFormProps {
  user: User
  onPostCreated: () => void
  onClose: () => void
}

export function CreatePostForm({ user, onPostCreated, onClose }: CreatePostFormProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          { content, author: user.email, user_id: user.id }
        ])
        .select()

      if (error) throw error

      console.log('Post created:', data)
      onPostCreated()
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Error creating post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        rows={4}
        required
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  )
}