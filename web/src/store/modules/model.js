import * as modelService from '@/service/model/model'

const model = {
  state: {
    models: [
    ]
  },
  mutations: {
    SET_MODEL_RECORD (state, modelRecord) {
      state.models = modelRecord
    }
  },
  actions: {
    GetModels ({ commit }, ) {
      return new Promise((resolve, reject) => {
        modelService.getModels().then((response) => {
          const data = response.data.data
          console.log('----GetmodelRecord----')

          commit('SET_MODEL_RECORD', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CreateModel ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        modelService.createModel(payload).then((response) => {
          const data = response.data.data
          console.log('----GetModelRecord----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
  }
}

export default model
