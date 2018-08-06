// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/swiper01.jpg',
      '/images/swiper02.jpg',
      '/images/swiper03.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    page: 1,
    pageSize: 4,
    hasMoreData: true,
    prolist: []

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getProListPage('正在加载数据...')
  },

  /**
   * 获取信息分页列表
   */

  getProListPage: function () {
    var self = this;
    var data = {
      page: self.data.page
    }

    wx.request({
      url: 'http://baonisheng.cn/article.php',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        // self.setData({
        //   proList: res.data
        // });

        if (self.data.page == 1) {
          var tmpProList = [];
        }else{
          var tmpProList = self.data.proList;
        }

        

        var proList = res.data;
        if (proList.length < self.data.pageSize){
          self.setData({
            proList: tmpProList.concat(proList),
            hasMoreData: false
          })
        }else{
          self.setData({
            proList: tmpProList.concat(proList),
            hasMoreData: true,
            page: self.data.page + 1
          })
        }


      }
    })

  },

  /**
   * 详情
   */
  toDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var proList = this.data.proList;
    var title = proList[index].title;
    wx.setStorageSync('title', title);
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
    // wx.navigateTo({
    //   url: '/pages/detail/detail?title='+title,
    // })

  },

  /**
   * 获取信息列表
   */

  getProList:function(){
    var self = this;
    wx.request({
      url: 'http://baonisheng.cn/article.php', 
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        self.setData({
          proList:res.data
        });
      }
    })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getProListPage('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getProListPage('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})