export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          created_at: string
          content: string
          author: string
        }
        Insert: {
          id?: number
          created_at?: string
          content: string
          author: string
        }
        Update: {
          id?: number
          created_at?: string
          content?: string
          author?: string
        }
      }
    }
  }
}