import * as categoryService from '@/service/category/category'

const category = {
  state: {
    categorys: [
    ]
  },
  mutations: {
    SET_CATEGORY_RECORD (state, categoryRecord) {
      state.categorys = categoryRecord
    }
  },
  actions: {
    GetCategorys ({ commit }, ) {
      return new Promise((resolve, reject) => {
        categoryService.getCategorys().then((response) => {
          const data = response.data.data
          console.log('----GetcategoryRecord----')

          commit('SET_CATEGORY_RECORD', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CreateCategory ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        categoryService.createCategory(payload).then((response) => {
          const data = response.data.data
          console.log('----GetcategoryRecord----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}


export default category
