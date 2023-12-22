import { Composer } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'

import start from '$grammy/handlers/commands/start.ts'
import menu from '$grammy/handlers/commands/menu.ts'
import list from '$grammy/handlers/commands/list.ts'

const composer = new Composer<GrammyContext>()

composer.use(start)
composer.use(menu)
composer.use(list)

export const listOfCommands: Array<{
  command: string
  description: string
  show: boolean
}> = [
  { command: 'start', description: 'Start the bot', show: true },
  { command: 'menu', description: 'Show main menu', show: true },
  { command: 'list', description: 'Show all places', show: true },
]

export default composer
