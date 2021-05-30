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
const startFlash = function (that, time, param) {

    var count = 0;
    let animation = wx.createAnimation({
        duration: time, // 动画持续时间，单位 ms
        timingFunction: 'ease-in-out', // 动画的效果
        delay: 0, // 动画延迟时间，单位 ms
        transformOrigin: '50% 50%' // 动画的中心点
    });

    let json = '{"' + param + '":""}'
    json = JSON.parse(json)
    setInterval(function () {

        if (count % 2 == 0) {
            animation.scale(3.5).step();
        } else {
            animation.scale(0.5).step();
        }

        json[param] = animation.export()
        that.setData(json)
        count++;
        if (count == 1500) {
            count = 0;
        }
    }.bind(that), 1500);
}
const stopFlash = function (that, time, param) {

    // let animation = wx.createAnimation({
    //     duration: time,
    //     timingFunction: 'ease',
    // });
    // animation.opacity(1).step()
    // let json = '{"' + param + '":""}'
    // json = JSON.parse(json)
    // json[param] = animation.export()
    // that.setData(json)
}
module.exports = {
    fadeIn: fadeIn,
    stretchX: stretchX,
    setWidth: setWidth,
    translateWidth: translateWidth,
    setLeft: setLeft,
    setRight: setRight,
    startFlash: startFlash,
    stopFlash: stopFlash,
}