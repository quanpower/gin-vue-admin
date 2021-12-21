// import * as bigdataService from '@/service/bigdata/bigdata'

const bigdata = {
  state: {
    cardList: [],
    cardList2: [],
    totalTime: 1000
  },
  mutations: {
    SET_CARD_LIST (state, cardList) {
      console.log('===SET_CARD_LIST===')
      state.cardList = cardList
    },
    SET_CARD_LIST2 (state, cardList) {
      console.log('===SET_CARD_LIST2===')
      state.cardList2 = cardList
    },
    SET_TOTAL_TIME (state, totalTime) {
      state.totalTime = totalTime
    }
  },

  actions: {
    // Get BigData Realtime Data

    // GetBigDataRealtimeData ({
    //   commit
    // }, state) {
    //   return new Promise((resolve, reject) => {
    //     bigdataService.getBigDataRealtimeData2().then((response) => {
    //       const data = response.data
    //       console.log('----getRealData----')
    //       console.log(data)

    //       commit('SET_CARD_LIST', data)

    //       resolve(data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // GetBigDataRealtimeData2 ({
    //   commit
    // }, state) {
    //   return new Promise((resolve, reject) => {
    //     bigdataService.getBigDataRealtimeData4().then((response) => {
    //       const data = response.data
    //       console.log('----getRealData----')
    //       console.log(data)

    //       commit('SET_CARD_LIST2', data)

    //       resolve(data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    GetTotalTime ({
      commit
    }, state) {
      var timesData = '2021-10-11 12:00:00'
      // var dateBegin = new Date(timesData.replace(/-/g, "/")); //将-转化为/，使用new Date
      var dateBegin = new Date(timesData.replace(/-/g, '/')) // 将-转化为/，使用new Date
      var dateEnd = new Date() // 获取当前时间
      var dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
      const totalTime = Math.floor(dateDiff / (3600 * 1000))

    //   console.log('====totalTime===')
    //   console.log(dateDiff)
    //   console.log(totalTime)
      commit('SET_TOTAL_TIME', totalTime)
    }
  }
}

export default bigdata
