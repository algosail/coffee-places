import { Composer } from "grammy";

import { GrammyContext } from "$grammy/context.ts";
import { getFullName } from "$utils/grammy.ts";

const composer = new Composer<GrammyContext>();

composer.command("start", async (ctx) => {
  await ctx.replyWithChatAction("typing");

  await ctx.reply(
    `
		Hi ${getFullName(ctx.from!).replaceAll(".", "")}, welcome to the <b>${
      ctx.me.username
    }</b>.
    \nI am here to help you find good coffee places ☕️🎉
		\nSend me your location
    `
  );
});

export default composer;
