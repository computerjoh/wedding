import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { cors } from 'hono/cors'
import { createClient } from '@supabase/supabase-js'
import type { Database, TablesInsert } from '../database.types'

const app = new Hono()

const RsvpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Must be a valid email'),
  isAttending: z.boolean(),
})

app.use('*', cors())

const route = app.post(
  '/rsvp',
  zValidator('json', RsvpSchema),
  async (c) => {
    const { name, email, isAttending } = c.req.valid('json')

    const row: TablesInsert<'wedding_rsvps'> = {
      name: name.trim(),
      email: email.toLowerCase(),
      is_attending: isAttending,
    }

    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { data, error } = await supabase
      .from('wedding_rsvps')
      .upsert(row, { onConflict: 'email' })
      .select()
      .single()

    if (error) {
      return c.json({ error: error.message }, 500)
    }

    return c.json({ ok: true, rsvp: data }, 201)
  }
)

export default app
export type AppType = typeof route