import * as configService from '@/service/config/config'

const config = {
  state: {
    configs: [
    ],
    created_configs:[]
  },
  mutations: {
    SET_CONFIG_RECORD (state, configRecord) {
      state.configs = configRecord
    },
    SET_CREATED_CONFIGS(state, created_configs) {
      state.created_configs = created_configs
    },
  },
  actions: {
    GetConfigRecord ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        configService.getConfig(payload).then((response) => {
          const data = response.data.data
          console.log('----GetconfigRecord----')
          console.log(data)

          commit('SET_CONFIG_RECORD', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllConfigs ({ },) {
      return new Promise((resolve, reject) => {
        configService.getAllConfigs().then((response) => {
          const data = response.data.data
          console.log('----getAllConfigs----')
          console.log(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCreatedConfigs ({ commit },) {
      return new Promise((resolve, reject) => {
        configService.getCreatedConfigs().then((response) => {
          const data = response.data.data
          console.log('----getCreatedConfigs----')
          console.log(data)
          commit('SET_CREATED_CONFIGS', data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    createConfigRecord ({ }, payload) {
      console.log('==in createConfigRecord==')
      console.log(payload)

      return new Promise((resolve, reject) => {
        configService.createConfig(payload).then((response) => {
          const data = response.data.data
          console.log(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updateConfigRecord ({ }, payload) {
      console.log('==in updateConfigRecord==')
      console.log(payload)

      return new Promise((resolve, reject) => {
        configService.updateConfig(payload).then((response) => {
          const data = response.data.data
          console.log(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },    
  }
}

export default config
