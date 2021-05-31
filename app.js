// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        /*
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd46f803d22534c05&secret=aaf482313853cfa97b9f1ae1e2582d95&js_code=' + res.code + '&grant_type=authorization_code';
                    wx.request({
                        url: url,
                        method: 'GET',
                        success: (result) => {
                            console.log(result)
                        },
                        fail: () => {
                            console.log("meiyou")
                        },
                        complete: () => {}
                    });
                }
            }
        })
        */
    },
    globalData: {
        user_id: null
    }
})