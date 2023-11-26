import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TableProfile = Tables<'nvl_profiles'>
export type TableCategory = Tables<'nvl_categories'>