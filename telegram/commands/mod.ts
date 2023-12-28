import { Composer } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'

import start from './start.ts'
import menu from './menu.ts'

const composer = new Composer<GrammyContext>()

composer.use(start)
composer.use(menu)

export const listOfCommands: Array<{
  command: string
  description: string
  show: boolean
}> = [
  { command: 'start', description: 'Start the bot', show: true },
  { command: 'menu', description: 'Show main menu', show: true },
]

export default composer
