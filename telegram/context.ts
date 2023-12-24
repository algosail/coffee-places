import type { Location } from 'grammy_types'

import type { ParseModeFlavor } from 'https://deno.land/x/grammy_parse_mode@1.5.0/hydrate.ts'
import type {
  Context,
  Conversation,
  ConversationFlavor,
  SessionFlavor,
} from './deps.ts'

export interface GrammySession {
  placeId: string | null
  location: Location | null
  cursor: number
  user?: {
    __language_code?: string
  }
}

export type GrammyContext =
  & SessionFlavor<GrammySession>
  & ParseModeFlavor<Context>
  & ConversationFlavor<Context>

export type GrammyConversation = Conversation<GrammyContext>
