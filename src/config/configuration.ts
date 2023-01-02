export default () => {
  return {
    packageVersion: process.env.npm_package_version || '',

    wecomBotTokenList: (process.env.WECOM_BOT_TOKEN_LIST || '').split(',').filter(token => !!token),
    workproTokenGatewayEndpoint: process.env.WORKPRO_TOKEN_GATEWAY_ENDPOINT || '',

    larkWebhookKey: process.env.LARK_WEBHOOK_KEY || '',
  }
}
