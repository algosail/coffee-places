import { Composer } from 'grammy'
import { createConversation } from 'grammy_conversations'

import { GrammyContext } from '$grammy/context.ts'

import { addPlace } from '$grammy/handlers/conversations/addPlace.ts'
import { editPlace } from '$grammy/handlers/conversations/editPlace.ts'

const composer = new Composer<GrammyContext>()

composer.use(createConversation(addPlace, 'add-place'))
composer.use(createConversation(editPlace, 'edit-place'))

export default composer
