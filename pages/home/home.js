let app = getApp();

Page({
    data: {
        text: "HOME",
        collection: [{
            id: 0,
            imgUrl: "../../1.jpg",
            text: "test1"
        }, {
            id: 1,
            imgUrl: "../../2.jpg",
            text: "test1"
        }, {
            id: 2,
            imgUrl: "../../3.jpg",
            text: "test2"
        }],
        phoneW: "",
        phoneH: "",
    },
    onLoad: function (options) {
        // 页面创建时执行
        let that = this
        wx.showLoading({
            title: "登记船长中",
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://dapeng.chat/cis',
                        method: 'POST',
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            'jsCode': res.code
                        },
                        success(e) {
                            console.log(e.data)
                            app.globalData.user_id = e.data
                            wx.hideLoading();
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
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
    goConstellationT: function () {
        wx.navigateTo({
            url: '/pages/constellation/constellation?style=1',
        })
    },
    goConstellationF: function () {
        wx.navigateTo({
            url: '/pages/constellation/constellation?style=2',
        })
    },
    goConstellationR: function () {
        wx.navigateTo({
            url: '/pages/constellation/constellation?style=3',
        })
    },
    goCollection: function () {
        wx.navigateTo({
            url: '/pages/collection/collection',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
})