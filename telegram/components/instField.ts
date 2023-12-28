import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'

export const instField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string> => {
  if (prev) {
    await ctx.reply(`Change instagram:`)
  } else {
    await ctx.reply(`Instagram:`)
  }

  const inst = await con.form.text()

  if (inst.startsWith('http')) return inst
  if (inst.startsWith('@')) return `https://www.instagram.com/${inst.slice(1)}/`
  return `https://www.instagram.com/${inst}/`
}
