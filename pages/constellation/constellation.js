const utils = require("../../utils/myAnimation.js")
Page({
    data: {
        text: "This is page data.",   
        constellaImgSmallUrl:"",
        imgLoad:[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
        timer:0,
        textAreaIsOpen:0,
        flag:0,
        starName:"",
        starDescrib:"",
        constellaList:0,
        flash:0,
        loadOK:0
    },
    onLoad: function (options) {
        console.log(options)
        wx.showLoading({
            title: '加载中',
            mask:'true'
        })
        let that = this
        wx.request({
          url: 'https://dapeng.chat/Style?style='+options.style,
          data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success:(result) => {
                console.log(result)
                var data = result.data
                var arr = []
                
                for(var i=0;i<data.length;i++){
                    arr = data[i].constella_pic.split(",")
                    data[i].constella_pic = arr
                    

                }
                that.setData({
                    constellaList:data,
                    // loadOK:1
                })
                
                that.flash('click0')
            
            },
            fail:(result)=>{
                that.networkRequestFailed()
            }
        })
        


        // 页面创建时执行
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
    onPageScroll: function (e) {
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
    test: function () {
        wx.navigateTo({
            url: '/pages/star/star',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    flash:function(e){
        
        let that = this
        that.setData({
            flash: setInterval(function () {
                
                utils.startFlash(that,1500,'click')
                
                clearInterval(that.data.flash)
            }, 150)
        })
    },
    unFlash:function(e){
        console.log(e)
        let that = this
        that.setData({
            flash: setInterval(function () {
                utils.stopFlash(that,1500,e)
                clearInterval(that.data.flash)
            }, 150)
        })
    },
    // 自由数据
    customData: {
        hi: 'MINA'
    },
    imgOnload:function(e){

        var arr = e.currentTarget.id.split(",")
        console.log(arr)
        let that = this
        var l = e.currentTarget.id
        var data = that.data.imgLoad
        data[arr[0]][arr[1]] = 1
        console.log(data)
        that.setData({
            imgLoad:data
        })
        if(arr[2]==0&&arr[1]==0){
            wx.hideLoading()
            
        }
    },
    imgLoading:function(e){
        wx.hideLoading()
    },
    //touch start
    handleTouchStart: function(e) {    
        this.startTime = e.timeStamp;    
    },  
     
    handleTouchEnd: function(e) {    
        this.endTime = e.timeStamp;    
    },  
     
    handleClick: function(e) {   
        console.log(e)    
        let that = this
        that.setData({
            flag:0,
            starName:"",
            starDescrib:""
        })
        
        if (this.endTime - this.startTime < 350) {      
            console.log("点击");
            
            that.setData({
                textAreaIsOpen:1,
            })
            wx.request({
                url: 'https://dapeng.chat/Star/name?star_id='+e.currentTarget.id,
                data: {},
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) =>{
                    
                    that.setData({
                        starName:result.data
                    })
                }
            })
            wx.request({
                url: 'https://dapeng.chat/Star/word2?star_id='+e.currentTarget.id,
                data: {},
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) =>{
                    
                    that.setData({
                        starDescrib:result.data
                    })
                }
            })

            setTimeout(function () {
                
                that.setData({
                    flag:1
                })
            }, 500)
            that.setData({
                timer: setInterval(function () {
                    setTimeout(function () {
                        console.log("开始")
                        utils.fadeIn(that, 2000, 'text_border', 1)
                        
                    }, 500)
                    clearInterval(that.data.timer)
                }, 150)
            })
            // that.flash()
            
        }  
    },  
     
    handleLongPress: function(e) {    
        
        var id = e.currentTarget.id 
        wx.navigateTo({
          url: '../star/star?id='+id,
        })
    },
    closeEverthing:function(e){
        if(this.data.flag==1){
            this.setData({
                textAreaIsOpen:0,
                flag:0,
                text_border:0
            })   
        }
    },
    closeEverthing2:function(e){
        // if(this.data.flag==1){
        //     this.setData({
        //         textAreaIsOpen:0,
        //         flag:0,
        //         text_border:0
        //     })   
        // }
        // var data = e.detail.current
        // console.log(data)
        // // for(var i=0;i<13;i++){
        // //     this.unFlash("click"+i)
        // // }
        // this.flash("click"+data)
    },
    networkRequestFailed:function(){
        wx.showModal({
            title:"发生错误！",
            content:"请求服务器超时，请检查网络后重新启动",
            showCancel:false,
            success (res) {
                if (res.confirm) {
                    const page=getCurrentPages();
                    console.log(page)
                    wx.navigateBack({
                        delta: page.length,
                    })
                } 
              }
        })
    },
    reLoadimage:function(e){
        console.log(e)
    },
    
    

})