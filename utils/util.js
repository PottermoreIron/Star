const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const drawCanvas = (that, id, width, height, img1, img2, text) => {
    const textArr = text.split("\r\n")
    let ctx = wx.createCanvasContext(id)
    ctx.drawImage(img1, 0, 0, width, height)
    ctx.drawImage(img2, width / 2 - 25, height / 1.5, 50, 50)
    ctx.setFontSize(15);
    ctx.setFillStyle("white");
    for (let index = 0; index < textArr.length; index++) {
        ctx.fillText(textArr[index], 10, 30 + index * 30);
    }
    ctx.draw(true, () => {
        wx.canvasToTempFilePath({
            canvasId: id,
            success: (result) => {
                console.log(result)
                return result.tempFilePath
            },
            fail: (e) => {
                console.log(e)
            },
            complete: () => {
                console.log("complete")
            }
        }, that);
    })
}

module.exports = {
    formatTime,
    drawCanvas
}