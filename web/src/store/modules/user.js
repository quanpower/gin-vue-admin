import * as loginService from '@/service/login/login'
import * as userService from '@/service/user/user'

const user = {
  state: {
    user: {}
  },
  mutations: {
    SET_USER (state, userRecord) {
      state.user = userRecord
    }
  },
  actions: {
    GetUser ({ commit }, ) {
      return new Promise((resolve, reject) => {
        loginService.getUserInfo().then((response) => {
          const data = response.data.data
          console.log('----GetUser----')
          console.log(data)

          commit('SET_USER', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LoginByEmail ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        loginService.loginByEmail(payload).then((response) => {
          const data = response.data.data
          console.log('----LoginByEmail----')
          console.log(data)
          if (data){
            localStorage.setItem('ly-token', data.token)
          }
          else{
            console.log('error')
          }

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CheckAdminPW ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userService.CheckAdminPW(payload).then((response) => {
          const data = response.data.data
          console.log('----CheckAdminPW----')
          console.log(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    LogOut ({ commit }, payload) {
      localStorage.removeItem('ly-token'); 
    },
  
    ChangePassword ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userService.ChangePassword(payload).then((response) => {
          const data = response.data.data
          console.log('----ChangePassword----')
          console.log(data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default user
