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

app.message('hello', async ({ message, say, client }) => {
  await client.reactions.add({
    name: "doughnut",
    channel: message.channel,
    timestamp: message.ts,
  });

  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me'
          },
          action_id: 'button_click'
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  })
})

app.action('button_click', async ({ body, ack, say }) => {
  // アクションのリクエストを確認
  await ack()
  await say(`<@${body.user.id}> clicked the button`)
})

;(async () => {
  // アプリを起動します
  await app.start()

  console.log('⚡️ Bolt app is running!')
})()
