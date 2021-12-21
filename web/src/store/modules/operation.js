import * as operationService from '@/service/operation/operation'

const operation = {
  state: {
    operations: [
    ]
  },
  mutations: {
    SET_OPERATION (state, operationRecord) {
      state.operations = operationRecord
    }
  },
  actions: {
    GetOperations ({ commit }, ) {
      return new Promise((resolve, reject) => {
        operationService.getOperations().then((response) => {
          const data = response.data.data
          console.log('----GetoperationRecord----')
          console.log(data)

          commit('SET_OPERATION', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default operation
