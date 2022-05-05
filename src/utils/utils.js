var { LiveChatWidget } = typeof window !== 'undefined' && window

function minimizeChatWidget() {
  LiveChatWidget.call('minimize')
}
function closeChatWidget() {
  LiveChatWidget.call('hide')
}
function maximizeChatWidget() {
  LiveChatWidget.call('maximize')
}

module.exports.closeChatWidget = closeChatWidget
module.exports.minimizeChatWidget = minimizeChatWidget
module.exports.maximizeChatWidget = maximizeChatWidget
