// 动画:逐渐显现
const fadeIn = function (that, time, param, opacity) {
    let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease',
    });
    animation.opacity(opacity).step()
    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    json[param] = animation.export()
    that.setData(json)
}
// 动画:拉伸X轴
const stretchX = function (that, time, param, scaleX) {
    let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease',
    });
    animation.scaleX(scaleX).step()
    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    json[param] = animation.export()
    that.setData(json)
}
// 动画:设置元素宽度
const setWidth = function (that, time, param, width) {
    let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease',
    });
    animation.width(width).step()
    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    json[param] = animation.export()
    that.setData(json)
}
// 动画:设置元素x轴移动动画
const translateWidth = function (that, time, param, width) {
    let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease',
    });
    animation.translateX(width).step()
    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    json[param] = animation.export()
    that.setData(json)
}
// 动画:设置元素left值
const setLeft = function (that, time, param, left) {
    let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease',
    });
    animation.left(left).step()
    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    json[param] = animation.export()
    that.setData(json)
}
// 动画:设置元素right值
const setRight = function (that, time, param, right) {
    let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease',
    });
    animation.right(right).step()
    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    json[param] = animation.export()
    that.setData(json)
}

module.exports = {
    fadeIn: fadeIn,
    stretchX: stretchX,
    setWidth: setWidth,
    translateWidth: translateWidth,
    setLeft: setLeft,
    setRight: setRight,
}