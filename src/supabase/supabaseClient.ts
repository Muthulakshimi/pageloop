// // Function to create the documents table
// export const createDocumentsTable = async () => {
//   const { error } = await supabase.rpc('exec', {
//     sql: `
//       CREATE TABLE IF NOT EXISTS documents (
//         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//         title TEXT NOT NULL,
//         content TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT NOW(),
//         updated_at TIMESTAMP DEFAULT NOW()
//       );
//     `
//   })

//   if (error) {
//     console.error('Error creating table:', error)
//   } else {
//     console.log('Documents table created or already exists.')
//   }
// }

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)