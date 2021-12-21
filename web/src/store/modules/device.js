import * as deviceService from '@/service/device/device'

const device = {
  state: {
    devices: [
    ]
  },
  mutations: {
    SET_DEVICE (state, deviceRecord) {
      state.devices = deviceRecord
    }
  },
  actions: {
    GetDevices ({ commit }, ) {
      return new Promise((resolve, reject) => {
        deviceService.getAllDevices().then((response) => {
          const data = response.data.data
          console.log('----GetdeviceRecord----')
          console.log(data)

          commit('SET_DEVICE', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    CreateDevice ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        deviceService.createDevice(payload).then((response) => {
          const data = response.data.data
          console.log('----GetDeviceRecord----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    
    UpdateDevice ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        deviceService.UpdateDevice(payload).then((response) => {
          const data = response.data.data
          console.log('----UpdateDevice----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default device
