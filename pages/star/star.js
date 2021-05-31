const bkm = wx.getBackgroundAudioManager();
let app = getApp();
Page({
    data: {
        // 随机星数组
        stars: [],
        // 第几张幻灯片
        currentIndex: 0,
        // 用来保存star_word,实现打字机功能
        text: "",
        // 用来保存star_description
        description: "",
        // 标记显示的文字是word还是description
        isText: true,
        // 控制显示description还是word的button按钮上的文字
        buttonText: "More",
        // 用于打字机效果的计时器
        timer: 0,
        // 用户是否收藏这个页面
        isCollection: false,
        // 海报的画布是否显示
        isCanvasShow: false,
        // 设备宽度
        phoneW: "",
        // 设备高度
        phoneH: "",
        // 当前star的背景图路径
        imgUrl: "",
        // 程序码路径
        qrCodeImgUrl: "https://dapeng.chat/view.jpg",
        // 海报的临时路径
        canvasTmp: "",
        canvasText: "",
        // 歌曲作者
        songAuthor: "",
        // 歌曲名
        songName: "",
        // 控制edit的text框
        isEdit: false,
    },
    onLoad: function (options) {

        // 页面创建时执行
        // 
        wx.showLoading({
            title: "宇宙遨游中",
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

        let that = this
        const user_id = app.globalData.user_id


        // 获取star_id,以确定第一个star是谁
        const star_id = options.id
        // 获取设备宽高,以确定画布大小
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
        // 第一次进来显示的都是star_word
        that.setData({
            isText: true,
            isEdit: false
        })
        // 拿动画相关函数
        const utils = require("../../utils/myAnimation.js")

        var reqTask = wx.request({
            url: 'https://dapeng.chat/Star/ifCollect?star_id=' + star_id + '&&user_id=' + user_id,
            // url: 'https://dapeng.chat/Star/ifCollect?star_id=1&&user_id=oCc995GMLEZ269-QlgEHVfNdbXls',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                that.setData({
                    isCollection: result.data
                })
            },
            fail: () => {},
            complete: () => {}
        });
        // 请求随机星数组
        var reqTask = wx.request({
            url: 'https://dapeng.chat/Star/next?star_id=' + star_id,
            // url: 'https://dapeng.chat/Star/next?star_id=1',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                that.setData({
                    // 设置stars数据
                    stars: result.data
                })
                console.log(that.data.stars)
                // 目前的star
                let star = that.data.stars[that.data.currentIndex]
                // 目前的star_word
                let tmp = star.star_word1
                that.setData({
                    // 设置目前的description
                    description: star.star_word2,
                    // 设置目前星背景图
                    imgUrl: star.star_pic,
                    // 设置歌名
                    songName: star.song_name,
                    // 设置歌手
                    songAuthor: star.song_author
                })
                wx.hideLoading();
                // 网络图片必须转为临时路径才能进行绘制

                let index = 0;
                // 打字机效果,setTimeInterval实现
                that.setData({
                    timer: setInterval(function () {
                        let tmp_text = tmp.substring(0, index)
                        index++
                        that.setData({
                            text: tmp_text
                        })
                        if (tmp_text.length == tmp.length) {
                            // 当文字打完,进行动画展示
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
                // 播放音乐
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
    },
    // 事件响应函数
    itemChange: function (e) {
        // 切换幻灯片
        const utils = require("../../utils/myAnimation.js")
        let that = this
        const user_id = app.globalData.user_id
        // 动画变成初态
        utils.fadeIn(that, 0, 'text_border', 0)
        utils.setLeft(that, 0, 'music_line1', '-40%')
        utils.setRight(that, 0, 'music_line2', '-40%')
        utils.setLeft(that, 0, 'heart', '-10%')
        utils.setRight(that, 0, 'share', '-10%')
        utils.fadeIn(that, 0, 'rocket', 0)
        utils.fadeIn(that, 0, 'edit', 0)
        utils.fadeIn(that, 0, 'myButton', 0)
        utils.fadeIn(that, 0, 'songInfo', 0)
        // 清除计时器,防止是在文字未完全显示时切换的幻灯片
        if (that.data.timer) {
            clearInterval(that.data.timer)
        }
        // 重新设置相关信息
        that.setData({
            currentIndex: e.detail.current,
            text: "",
            isText: true,
            buttonText: "More",
            isCanvasShow: false,
            isEdit: false
        })
        let star = that.data.stars[that.data.currentIndex]
        let tmp = star.star_word1
        that.setData({
            description: star.star_word2,
            imgUrl: star.star_pic,
            songName: star.song_name,
            songAuthor: star.song_author
        })
        // 初始化收藏图标
        var reqTask = wx.request({
            url: 'https://dapeng.chat/Star/ifCollect?star_id=' + star.star_id + '&&user_id=' + user_id,
            // url: 'https://dapeng.chat/Star/ifCollect?star_id=' + star.star_id + '&&user_id=oCc995GMLEZ269-QlgEHVfNdbXls',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                that.setData({
                    isCollection: result.data
                })
            },
            fail: () => {},
            complete: () => {}
        });
        // 画海报
        wx.getImageInfo({
            src: that.data.imgUrl,
            success: (result1) => {
                wx.getImageInfo({
                    src: that.data.qrCodeImgUrl,
                    success: (result2) => {
                        that.drawCanvas(that, 'poster_' + that.data.currentIndex, that.data.phoneW / 1.5, that.data.phoneH / 1.5, result1.path, result2.path, tmp)
                    },
                    fail: (e) => {
                        console.log(e)
                    },
                    complete: () => {}
                });

            },
            fail: () => {},
            complete: () => {}
        });
        let index = 0;
        // 设置动画及文字
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
        // 音乐控制
        bkm.pause()
        setTimeout(() => {
            that.musicPlay(star.song_name, star.song_url)
        }, 150);


    },
    opCollection() {
        let that = this
        let star = that.data.stars[that.data.currentIndex]
        const user_id = app.globalData.user_id
        var reqTask = wx.request({

            url: 'https://dapeng.chat/Star/collect?star_id=' + star.star_id + '&&user_id=' + user_id,
            // url: 'https://dapeng.chat/Star/ifCollect?star_id=' + star.star_id + '&&user_id=oCc995GMLEZ269-QlgEHVfNdbXls',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log("收藏完成!")

            },
            fail: () => {},
            complete: () => {}
        });
        that.setData({
            isCollection: !that.data.isCollection
        })
    },
    opShare() {
        let that = this
        // 目前的star
        let star = that.data.stars[that.data.currentIndex]
        // 目前的star_word
        let tmp = star.star_word1
        wx.showLoading({
            title: "正在绘图",
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
        wx.getImageInfo({
            // 先访问背景图
            src: that.data.imgUrl,
            success: (result1) => {
                wx.getImageInfo({
                    // 成功后再访问程序码
                    src: that.data.qrCodeImgUrl,
                    success: (result2) => {

                        // 进行海报的绘制
                        // 注意 canvas_id必须不同,否则换一张幻灯片就画不出来了,所以用了一个index
                        that.drawCanvas(that, 'poster_' + that.data.currentIndex, that.data.phoneW / 1.5, that.data.phoneH / 1.5, result1.path, result2.path, tmp)
                    },
                    fail: () => {},
                    complete: () => {
                        wx.hideLoading();
                        that.setData({
                            isCanvasShow: true
                        })
                    }
                });

            },
            fail: () => {},
            complete: () => {}
        });

    },
    textInput(e) {
        let that = this
        that.setData({
            canvasText: e.detail.value
        })
    },
    opEdit() {
        let that = this
        that.setData({
            isEdit: true,
            canvasText: "",
        })
    },
    comEdit() {
        let that = this
        that.setData({
            isEdit: false
        })
        wx.showLoading({
            title: "正在绘图",
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
        wx.getImageInfo({
            // 先访问背景图
            src: that.data.imgUrl,
            success: (result1) => {

                wx.getImageInfo({
                    // 成功后再访问程序码
                    src: that.data.qrCodeImgUrl,
                    success: (result2) => {

                        // 进行海报的绘制
                        // 注意 canvas_id必须不同,否则换一张幻灯片就画不出来了,所以用了一个index
                        that.drawCanvas(that, 'poster_' + that.data.currentIndex, that.data.phoneW / 1.5, that.data.phoneH / 1.5, result1.path, result2.path, that.data.canvasText)
                    },
                    fail: () => {},
                    complete: () => {
                        wx.hideLoading();
                        that.setData({
                            isCanvasShow: true
                        })
                    }
                });

            },
            fail: () => {},
            complete: () => {}
        });

    },
    changeText() {
        // 控制button文字的显示
        let that = this
        that.setData({
            isText: !that.data.isText,
            buttonText: that.data.buttonText == "More" ? "Back" : "More"
        })
    },
    musicPlay(title, src) {
        // 控制音乐的播放
        bkm.title = title
        bkm.src = src
        bkm.play()
        bkm.onEnded(() => {
            bkm.play()
        })
    },
    drawCanvas: function (that, id, width, height, img1, img2, text) {
        // 画海报
        const textArr = text.split("\n")
        console.log(textArr)
        let ctx = wx.createCanvasContext(id)
        ctx.drawImage(img1, 0, 0, width, height)
        ctx.drawImage(img2, width / 2 - 25, height / 1.2, 50, 50)
        ctx.setFontSize(12);
        ctx.setFillStyle("white");
        for (let index = 0; index < textArr.length; index++) {
            ctx.fillText(textArr[index], 30, 80 + index * 30);
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
                complete: () => {}
            }, that);
        })
    },
    closeCanvas() {
        // 关闭海报界面
        let that = this
        that.setData({
            isCanvasShow: !that.data.isCanvasShow,
            canvasText: ""
        })
    },
    savePoster() {
        // 保存海报到手机
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