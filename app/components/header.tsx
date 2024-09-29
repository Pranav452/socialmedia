'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/auth-helpers-nextjs'

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/') // Redirect to home page after sign out
  }

  return (
    <header className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-blue-600">
          SocialFeed
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">Welcome, {user.email}!</p>
              <button
                onClick={handleSignOut}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                href="/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}