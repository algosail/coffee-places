import type { ParseModeFlavor } from 'https://deno.land/x/grammy_parse_mode@1.5.0/hydrate.ts'
import type {
  Context,
  Conversation,
  ConversationFlavor,
  SessionFlavor,
} from './deps.ts'

export interface GrammySession {
  placeId?: string
  user?: {
    __language_code?: string
  }
}

export type GrammyContext =
  & SessionFlavor<GrammySession>
  & ParseModeFlavor<Context>
  & ConversationFlavor<Context>

export type GrammyConversation = Conversation<GrammyContext>
