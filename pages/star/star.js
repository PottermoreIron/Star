const bkm = wx.getBackgroundAudioManager();
Page({
    data: {
        stars: [],
        background: [{
                "class": "demo1",
                //"texts": ["I love you", "How about you?"],
                "texts": "I love you\nHow about you?",
                "img": "../../1.JPG"
            },
            {
                "class": "demo2",
                //"texts": ["Sorry for that.", "I'm not"],
                "texts": "Sorry for that.\nI'm not",
                "img": "../../2.JPG",
            },
            {
                "class": "demo3",
                //"texts": ["OK", "Thanks"],
                "texts": "OK\nThanks",
                "img": "../../3.JPG"
            }
        ],
        currentIndex: 0,
        text: "",
        description: "",
        isText: true,
        buttonText: "More",
        timer: 0,
        isCollection: false,
        isCanvasShow: false,
        phoneW: "",
        phoneH: "",
        imgUrl: "",
        qrCodeImgUrl: "https://dapeng.chat/view.jpg",
        canvasTmp: "",
        songAuthor: "",
        songName: ""
    },
    onLoad: function (options) {

        // 页面创建时执行
        // 

        let that = this
        console.log(options.id)
        const star_id = options.id
        wx.getSystemInfo({
            success: (result) => {
                that.setData({
                    phoneW: result.windowWidth,
                    phoneH: result.windowHeight
                })
            },
            fail: () => {},
            complete: () => {}
        });

        that.setData({
            isText: true
        })

        const utils = require("../../utils/myAnimation.js")
        const draw = require("../../utils/util.js")
        var reqTask = wx.request({
            url: 'https://dapeng.chat/Star/next?star_id=' + star_id,
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                that.setData({
                    stars: result.data
                })
                console.log(that.data.stars)
                let star = that.data.stars[that.data.currentIndex]
                let tmp = star.star_word1
                that.setData({
                    description: star.star_word2,
                    imgUrl: star.star_pic,
                    songName: star.song_name,
                    songAuthor: star.song_author
                })
                wx.getImageInfo({
                    src: that.data.imgUrl,
                    success: (result1) => {
                        wx.getImageInfo({
                            src: that.data.qrCodeImgUrl,
                            success: (result2) => {
                                that.drawCanvas(that, 'poster_' + that.data.currentIndex, that.data.phoneW / 1.5, that.data.phoneH / 1.5, result1.path, result2.path, tmp)
                            },
                            fail: () => {},
                            complete: () => {}
                        });

                    },
                    fail: () => {},
                    complete: () => {}
                });

                let index = 0;
                that.setData({
                    timer: setInterval(function () {
                        let tmp_text = tmp.substring(0, index)
                        index++
                        that.setData({
                            text: tmp_text
                        })
                        if (tmp_text.length == tmp.length) {
                            setTimeout(function () {
                                utils.fadeIn(that, 2000, 'text_border', 1)
                                utils.setLeft(that, 2000, 'music_line1', '0%')
                                utils.setRight(that, 2000, 'music_line2', '0%')
                                utils.setLeft(that, 2000, 'heart', '25%')
                                utils.setRight(that, 2000, 'share', '25%')
                                utils.fadeIn(that, 4000, 'rocket', 1)
                                utils.fadeIn(that, 4000, 'edit', 1)
                                utils.fadeIn(that, 5000, 'myButton', 1)
                                utils.fadeIn(that, 5000, 'songInfo', 1)
                            }, 500)
                            clearInterval(that.data.timer)
                        }
                    }, 150)
                })
                that.musicPlay(star.song_name, star.song_url)
            },
            fail: () => {},
            complete: () => {}
        });
        that.setData({
            text: "",
        })
        if (that.data.timer) {
            clearInterval(that.data.timer)
        }
    },
    onShow: function () {
        // 页面出现在前台时执行
    },
    onReady: function () {
        // 页面首次渲染完毕时执行

    },
    onHide: function () {
        // 页面从前台变为后台时执行
    },
    onUnload: function () {
        // 页面销毁时执行
    },
    onPullDownRefresh: function () {
        // 触发下拉刷新时执行
    },
    onReachBottom: function () {
        // 页面触底时执行
    },
    onShareAppMessage: function () {
        // 页面被用户分享时执行
    },
    onPageScroll: function () {
        // 页面滚动时执行
    },
    onResize: function () {
        // 页面尺寸变化时执行
    },
    onTabItemTap(item) {
        // tab 点击时执行
        console.log(item.index)
        console.log(item.pagePath)
        console.log(item.text)
    },
    // 事件响应函数
    itemChange: function (e) {
        const utils = require("../../utils/myAnimation.js")
        let that = this
        utils.fadeIn(that, 0, 'text_border', 0)
        utils.setLeft(that, 0, 'music_line1', '-40%')
        utils.setRight(that, 0, 'music_line2', '-40%')
        utils.setLeft(that, 0, 'heart', '-10%')
        utils.setRight(that, 0, 'share', '-10%')
        utils.fadeIn(that, 0, 'rocket', 0)
        utils.fadeIn(that, 0, 'edit', 0)
        utils.fadeIn(that, 0, 'myButton', 0)
        utils.fadeIn(that, 0, 'songInfo', 0)
        if (that.data.timer) {
            clearInterval(that.data.timer)
        }
        that.setData({
            currentIndex: e.detail.current,
            text: "",
            isText: true,
            buttonText: "More",
            isCanvasShow: false
        })
        let star = that.data.stars[that.data.currentIndex]
        let tmp = star.star_word1
        that.setData({
            description: star.star_word2,
            imgUrl: star.star_pic,
            songName: star.song_name,
            songAuthor: star.song_author
        })
        wx.getImageInfo({
            src: that.data.imgUrl,
            success: (result1) => {
                wx.getImageInfo({
                    src: that.data.qrCodeImgUrl,
                    success: (result2) => {
                        console.log(result2)
                        that.drawCanvas(that, 'poster_' + that.data.currentIndex, that.data.phoneW / 1.5, that.data.phoneH / 1.5, result1.path, result2.path, tmp)
                    },
                    fail: (e) => {
                        console.log(e)
                    },
                    complete: () => {
                        console.log("compelete")
                    }
                });

            },
            fail: () => {},
            complete: () => {}
        });
        let index = 0;
        that.setData({
            timer: setInterval(function () {
                let tmp_text = tmp.substring(0, index)
                index++
                that.setData({
                    text: tmp_text
                })
                if (tmp_text.length == tmp.length) {
                    setTimeout(function () {
                        utils.fadeIn(that, 2000, 'text_border', 1)
                        utils.setLeft(that, 2000, 'music_line1', '0%')
                        utils.setRight(that, 2000, 'music_line2', '0%')
                        utils.setLeft(that, 2000, 'heart', '25%')
                        utils.setRight(that, 2000, 'share', '25%')
                        utils.fadeIn(that, 4000, 'rocket', 1)
                        utils.fadeIn(that, 4000, 'edit', 1)
                        utils.fadeIn(that, 5000, 'myButton', 1)
                        utils.fadeIn(that, 5000, 'songInfo', 1)
                    }, 500)
                    clearInterval(that.data.timer)
                }
            }, 150)
        })
        bkm.pause()
        setTimeout(() => {
            that.musicPlay(star.song_name, star.song_url)
        }, 150);


    },
    opCollection() {
        let that = this
        that.setData({
            isCollection: !that.data.isCollection
        })
    },
    opEdit() {
        let that = this
        that.setData({
            isCanvasShow: true
        })
    },
    opShare() {
        console.log("share")
    },
    changeText() {
        let that = this
        that.setData({
            isText: !that.data.isText,
            buttonText: that.data.buttonText == "More" ? "Back" : "More"
        })
    },
    musicPlay(title, src) {
        bkm.title = title
        bkm.src = src
        bkm.play()
        bkm.onEnded(() => {
            bkm.play()
        })
    },
    drawCanvas: function (that, id, width, height, img1, img2, text) {
        console.log(img1, img2)
        const textArr = text.split("\r\n")
        let ctx = wx.createCanvasContext(id)
        ctx.drawImage(img1, 0, 0, width, height)
        ctx.drawImage(img2, width / 2 - 25, height / 1.5, 50, 50)
        ctx.setFontSize(15);
        ctx.setFillStyle("white");
        for (let index = 0; index < textArr.length; index++) {
            ctx.fillText(textArr[index], 10, 30 + index * 30);
        }
        ctx.draw(false, () => {
            wx.canvasToTempFilePath({
                canvasId: id,
                success: (result) => {
                    console.log(result)
                    that.setData({
                        canvasTmp: result.tempFilePath
                    })
                },
                fail: (e) => {
                    console.log(e)
                },
                complete: () => {
                    console.log("complete")
                }
            }, that);
        })
    },
    closeCanvas() {
        let that = this
        that.setData({
            isCanvasShow: !that.data.isCanvasShow
        })
    },
    savePoster() {
        let that = this
        wx.getSetting({ //询问用户是否保存相册到本地
            success: (set) => {
                wx.saveImageToPhotosAlbum({
                    filePath: that.data.canvasTmp,
                    success: (res) => {
                        if (res.errMsg == "saveImageToPhotosAlbum:ok") {
                            wx.showToast({
                                title: '保存成功',
                            });
                        }
                    }
                })
                //拒绝保存到本地的处理机制
                if (set.authSetting['scope.writePhotosAlbum'] == false) {
                    wx.openSetting({
                        success(set) {
                            console.log(set)
                        }
                    })
                }
            }
        })
    }
})