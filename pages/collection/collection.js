let app = getApp();
Page({
    data: {

        collection: [],
        phoneW: "",
        phoneH: "",
        emptyColelction: true
    },
    onLoad: function (options) {
        // 页面创建时执行
        let that = this
        let user_id = app.globalData.user_id
        wx.getSystemInfo({
            success: (result) => {
                console.log(result)
                that.setData({
                    phoneW: result.windowWidth,
                    phoneH: result.windowHeight
                })
            },
            fail: () => {},
            complete: () => {}
        });
        console.log(user_id)
        wx.showLoading({
            title: "查找航行日志中",
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
        if (user_id !== "") {
            var reqTask = wx.request({
                url: 'https://dapeng.chat/Collect?user_id=' + user_id,
                data: {},
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    wx.hideLoading();
                    console.log(result)
                    if (result.data.length === 0) {
                        that.setData({
                            emptyColelction: true
                        })
                    } else {
                        that.setData({
                            collection: result.data,
                            emptyColelction: false
                        })
                    }
                },
                fail: () => {},
                complete: () => {}
            });
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
        let that = this
        wx.showNavigationBarLoading();
        wx.showLoading({
            title: '刷新中...',
        })
        // 触发下拉刷新时执行
        let user_id = app.globalData.user_id
        var reqTask = wx.request({
            url: 'https://dapeng.chat/Collect?user_id=' + user_id,
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result)
                that.setData({
                    collection: result.data
                })

            },
            fail: () => {},
            complete: () => {
                wx.hideNavigationBarLoading();
                wx.hideLoading();
                wx.stopPullDownRefresh();
            }
        });
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
    goStar(e) {
        let id = e.currentTarget.id
        wx.navigateTo({
            url: '../star/star?id=' + id,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    }

})