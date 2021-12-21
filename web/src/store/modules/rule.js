import * as ruleService from '@/service/rule/rule'

const rule = {
  state: {
    rules: [
    ]
  },
  mutations: {
    SET_RULE (state, ruleRecord) {
      state.rules = ruleRecord
    }
  },
  actions: {
    GetRules ({ commit }, ) {
      return new Promise((resolve, reject) => {
        ruleService.getRules().then((response) => {
          const data = response.data.data
          console.log('----GetruleRecord----')
          console.log(data)

          commit('SET_RULE', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CreateRule ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ruleService.createRule(payload).then((response) => {
          const data = response.data.data
          console.log('----GetRuleRecord----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    
    updateRule ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ruleService.updateRule(payload).then((response) => {
          const data = response.data.data
          console.log('----updateRule----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default rule
