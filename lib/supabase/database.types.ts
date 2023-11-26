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
      nvl_categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      nvl_post_parts: {
        Row: {
          created_at: string
          id: number
          part_content: string | null
          part_status: string | null
          part_title: string | null
          post_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          part_content?: string | null
          part_status?: string | null
          part_title?: string | null
          post_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          part_content?: string | null
          part_status?: string | null
          part_title?: string | null
          post_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nvl_post_parts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "nvl_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      nvl_posts: {
        Row: {
          created_at: string
          id: number
          post_author: string
          post_category: number | null
          post_content: string | null
          post_featured: string | null
          post_slug: string | null
          post_status: string | null
          post_title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_author?: string
          post_category?: number | null
          post_content?: string | null
          post_featured?: string | null
          post_slug?: string | null
          post_status?: string | null
          post_title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          post_author?: string
          post_category?: number | null
          post_content?: string | null
          post_featured?: string | null
          post_slug?: string | null
          post_status?: string | null
          post_title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nvl_posts_post_category_fkey"
            columns: ["post_category"]
            isOneToOne: false
            referencedRelation: "nvl_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      nvl_profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: number
          photo: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: number
          photo?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: number
          photo?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}