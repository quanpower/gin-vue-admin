import * as workOrderService from '@/service/work_order/work_order'

const work_order = {
  state: {
    month_work_orders: [],
    producing_work_orders: [],
    today_work_orders: [],
    history_work_orders: [],
    all_work_orders: [],
  },
  mutations: {
    SET_MONTH_WORK_ORDER (state, work_order) {
      state.month_work_orders = work_order
    },
    SET_PRODUCING_WORK_ORDER (state, work_order) {
      state.producing_work_orders = work_order
    },
    SET_TODAY_WORK_ORDER (state, work_order) {
      state.today_work_orders = work_order
    },
    SET_HISTORY_WORK_ORDER (state, work_order) {
      state.history_work_orders = work_order
    },    
    SET_ALL_WORK_ORDER (state, work_order) {
      state.all_work_orders = work_order
    },      
  },
  actions: {
    get_work_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        workOrderService.getWorkOrder(payload).then((response) => {
          const data = response.data.data
          // console.log('----get_work_order----')
          // console.log(data)

          commit('SET_MONTH_WORK_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    get_all_work_order ({ commit }, ) {
      return new Promise((resolve, reject) => {
        workOrderService.getAllWorkOrder().then((response) => {
          const data = response.data.data
          console.log('get_all_work_order')
          console.log(data)
          commit('SET_ALL_WORK_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    get_producing_work_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        workOrderService.getProducingWorkOrder(payload).then((response) => {
          const data = response.data.data

          commit('SET_PRODUCING_WORK_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    get_today_work_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        workOrderService.getTodayWorkOrder(payload).then((response) => {
          const data = response.data.data
          // console.log('==get_today_work_order==')
          // console.log(data)
          commit('SET_TODAY_WORK_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },    
    get_history_work_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        workOrderService.getHistoryWorkOrder(payload).then((response) => {
          const data = response.data.data

          commit('SET_HISTORY_WORK_ORDER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    put_work_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        workOrderService.putWorkOrder(payload).then((response) => {
          const data = response.data.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    delete_work_order ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        workOrderService.deleteWorkOrder(payload).then((response) => {
          const data = response.data.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default work_order
