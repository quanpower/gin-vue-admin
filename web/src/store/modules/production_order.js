import * as productionOrderService from '@/service/production_order/production_order'
import * as scanItemService from '@/service/scan_item/scan_item'

const production_order = {
  state: {
    production_orders: [],
    history_report: [],
    today_production_orders: [],
    current_production_orders: [],
    produce_production_orders: [],
    production_order_count: [{
      "Date": "2021-11-12",
      "time_0": 0,
      "time_1": 0,
      "time_2": 0,
      "time_3": 0,
      "time_4": 0,
      "time_5": 0,
      "time_6": 0,
      "time_7": 0,
      "time_8": 0,
      "time_9": 6,
      "time_10": 7,
      "time_11": 6,
      "time_12": 4,
      "time_13": 6,
      "time_14": 7,
      "time_15": 5,
      "time_16": 3,
      "time_17": 0,
      "time_18": 0,
      "time_19": 0,
      "time_20": 0,
      "time_21": 0,
      "time_22": 0,
      "total": 6},
      {
        "Date": "2021-11-14",
        "time_0": 0,
        "time_1": 0,
        "time_2": 0,
        "time_3": 0,
        "time_4": 0,
        "time_5": 0,
        "time_6": 0,
        "time_7": 0,
        "time_8": 3,
        "time_9": 2,
        "time_10": 6,
        "time_11": 7,
        "time_12": 3,
        "time_13": 8,
        "time_14": 5,
        "time_15": 6,
        "time_16": 4,
        "time_17": 0,
        "time_18": 0,
        "time_19": 0,
        "time_20": 0,
        "time_21": 0,
        "time_22": 0,
        "total": 6
    },
    {
      "Date": "2021-11-15",
      "time_0": 0,
      "time_1": 0,
      "time_2": 0,
      "time_3": 0,
      "time_4": 0,
      "time_5": 0,
      "time_6": 0,
      "time_7": 0,
      "time_8": 3,
      "time_9": 4,
      "time_10": 5,
      "time_11": 7,
      "time_12": 4,
      "time_13": 8,
      "time_14": 6,
      "time_15": 5,
      "time_16": 5,
      "time_17": 0,
      "time_18": 0,
      "time_19": 0,
      "time_20": 0,
      "time_21": 0,
      "time_22": 0,
      "total": 6
  }
    
],
    scan_items: [],
    test_items: []
  },
  mutations: {
    SET_PRODUCTION_ORDER (state, production_order) {
      state.production_orders = production_order
    },
    SET_TODAY_PRODUCTION_ORDER (state, production_order) {
      state.today_production_orders = production_order
    },
    SET_CURRENT_PRODUCTION_ORDER (state, production_order) {
      state.current_production_orders = production_order
    },
    SET_PRODUCTION_ORDER_COUNT (state, production_order) {
      state.production_order_count = production_order
    },

    
    // 生产中订单
    SET_PRODUCE_PRODUCTION_ORDER (state, production_order) {
      state.produce_production_orders = production_order
    },    
    // 历史报表
    SET_HISTORY_REPORT (state, production_order) {
      state.history_report = production_order
    },      
    SET_SCAN_ITEMS (state, scan_items) {
      state.scan_items = scan_items
    },
    SET_TEST_ITEMS (state, test_items) {
      state.test_items = test_items
    }
  },
  actions: {
    get_production_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.getProductionOrder(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)
          // const configRecord = []
          // for (const item of data) {
          //   configRecord.push(item)
          // }

          commit('SET_PRODUCTION_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    get_current_production_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.getProductionOrder(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)

          commit('SET_CURRENT_PRODUCTION_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    
    // 生产中订单
    get_produce_production_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.get_produce_production_order(payload).then((response) => {
          const data = response.data.data
          // console.log('----get_produce_production_order----')
          // console.log(data)

          commit('SET_PRODUCE_PRODUCTION_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    
    get_today_production_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.get_history_production_order(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)

          commit('SET_TODAY_PRODUCTION_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    searchProductionOrderByAxle ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.get_history_production_order(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)

          commit('SET_PRODUCTION_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    searchProductionOrderByPart ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        
        // 通过零件扫描记录，反向查询生产订单
        scanItemService.get_history_scan_items(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)
  
          commit('SET_PRODUCTION_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    queryHistoryReportByAxle ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.queryHistoryReportByAxle(payload).then((response) => {
          const data = response.data.data
          console.log('----queryHistoryReportByAxle----')
          console.log(data)

          commit('SET_HISTORY_REPORT', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    searchProductionOrderCount ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.searchProductionOrderCount(payload).then((response) => {
          const data = response.data.data
          console.log('----searchProductionOrderCount----')
          console.log(data)

          commit('SET_PRODUCTION_ORDER_COUNT', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    

    // 
    get_scan_items ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.getProductionOrder(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)


          commit('SET_SCAN_ITEMS', data[0].scan_items)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 
    get_test_items ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.getProductionOrder(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)

          commit('SET_TEST_ITEMS', data[0].test_items)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 
    bypass_this_operation_scan_task ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.bypass_this_operation_scan_task(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)

          resolve(data)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 
    bypass_this_operation_test_task ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        productionOrderService.bypass_this_operation_test_task(payload).then((response) => {
          const data = response.data.data
          console.log('----get_production_order----')
          console.log(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default production_order
