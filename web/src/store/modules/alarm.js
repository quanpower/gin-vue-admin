import * as alarmService from '@/service/alarm/alarm'

const alarm = {
  state: {
    alarms: [
    ],
    historyAlarms:[]
  },
  mutations: {
    SET_ALARM (state, alarmRecord) {
      state.alarms = alarmRecord
    },
    SET_HISTORY_ALARM (state, alarmRecord) {
      state.historyAlarms = alarmRecord
    }
  },
  actions: {
    searchHistoryAlarm ({ commit }, payload ) {
      return new Promise((resolve, reject) => {
        alarmService.searchHistoryAlarm(payload).then((response) => {
          const data = response.data.data
          // console.log('----GetalarmRecord----')
          // console.log(data)

          commit('SET_HISTORY_ALARM', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchCurrentAlarm ({ commit }, payload ) {
      return new Promise((resolve, reject) => {
        alarmService.searchHistoryAlarm(payload).then((response) => {
          const data = response.data.data
          // console.log('----GetalarmRecord----')
          // console.log(data)

          commit('SET_ALARM', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },    

    Createalarm ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        alarmService.createAlarm(payload).then((response) => {
          const data = response.data.data
          console.log('----GetalarmRecord----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default alarm
