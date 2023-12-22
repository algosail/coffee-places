import { Composer } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'
import placeQuery from './placeQuery.ts'

const composer = new Composer<GrammyContext>()

composer.use(placeQuery)

export default composer
