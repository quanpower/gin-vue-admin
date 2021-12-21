import * as taskService from '@/service/task/task'

const task = {
  state: {
    tasks: [
    ]
  },
  mutations: {
    SET_TASK_RECORD (state, taskRecord) {
      state.tasks = taskRecord
    }
  },
  actions: {
    GetTasks ({ commit }, ) {
      return new Promise((resolve, reject) => {
        taskService.getTasks().then((response) => {
          const data = response.data.data
          console.log('----GettaskRecord----')
          console.log(data)

          commit('SET_TASK_RECORD', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CreateTask ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        taskService.createTask(payload).then((response) => {
          const data = response.data.data
          console.log('----GetTaskRecord----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    UpdateTask ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        taskService.UpdateTask(payload).then((response) => {
          const data = response.data.data
          console.log('----UpdateTask----')

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },    
  }
}

export default task
