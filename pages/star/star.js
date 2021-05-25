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
        timer: 0,
        isCollection: false
    },
    onLoad: function (options) {

        // 页面创建时执行
        // 
        let that = this
        var reqTask = wx.request({
            url: 'https://dapeng.chat/Star/next?star_id=1',
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
                let tmp = star.star_word
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
        const utils = require("../../utils/myAnimation.js")
        that.setData({
            text: "",
        })
        if (that.data.timer) {
            clearInterval(that.data.timer)
        }
        // let tmp = that.data.background[that.data.currentIndex].texts
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
        if (that.data.timer) {
            clearInterval(that.data.timer)
        }
        that.setData({
            currentIndex: e.detail.current,
            text: "",
        })
        let star = that.data.stars[that.data.currentIndex]
        let tmp = star.star_word
        console.log(tmp)
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
        console.log("edit")
    },
    opShare() {
        console.log("share")
    },
    musicPlay(title, src) {
        bkm.title = title
        bkm.src = src
        bkm.play()
        bkm.onEnded(() => {
            bkm.play()
        })
    }
})