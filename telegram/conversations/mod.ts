import { Composer } from 'grammy'
import { createConversation } from 'grammy_conversations'

import { GrammyContext } from '$grammy/context.ts'

import { addPlace } from './addPlace.ts'
import { editPlace } from './editPlace.ts'
import { mailing } from './mailing.ts'

const composer = new Composer<GrammyContext>()

composer.use(createConversation(addPlace, 'add-place'))
composer.use(createConversation(editPlace, 'edit-place'))
composer.use(createConversation(mailing, 'mailing'))

export default composer
