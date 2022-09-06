const { App } = require('@slack/bolt')
const { parsed } = require('dotenv').config()

// ボットトークンと Signing Secret を使ってアプリを初期化します
const app = new App({
  token: parsed.SLACK_BOT_TOKEN,
  signingSecret: parsed.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: parsed.SLACK_APP_TOKEN,
  port: parsed.PORT || 3000
})

app.message('hello', async ({ message, say }) => {
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say(`Hey there <@${message.user}>!`)
})
;(async () => {
  // アプリを起動します
  await app.start()

  console.log('⚡️ Bolt app is running!')
})()
