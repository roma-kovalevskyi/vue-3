import { createStore, createLogger } from 'vuex'
import axios from 'axios'

const store = createStore({
  plugins: [createLogger()],
  state () {
    return {
      tasks: [],
      taskById: null
    }
  },
  mutations: {
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
    removeTask (state, payload) {
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },
    setTaskById (state, payload) {
      state.taskById = payload
    },
    changeTaskStatus (state, payload) {
      state.taskById.status = payload
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    taskById (state) {
      return state.taskById
    }
  },
  actions: {
    async addTask ({ commit }, task) {
      try {
        const { data } = await axios.post('https://coursework-3-8e706-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
          task, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

        commit('addTask', {
          id: data.name,
          ...task
        })
      } catch (e) {
        console.error('Error during adding task to Firebase:', e)
      }
    },
    async fetchTasks ({ commit }) {
      try {
        const { data } = await axios.get('https://coursework-3-8e706-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')

        if (data) {
          const tasks = Object.keys(data).map(id => {
            return {
              id,
              ...data[id]
            }
          })

          commit('setTasks', tasks)
        }
      } catch (e) {
        console.error('Error during getting tasks from Firebase:', e)
      }
    },
    async fetchTaskById ({ commit }, taskId) {
      try {
        const { data } = await axios.get(`https://coursework-3-8e706-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`)

        if (data) {
          commit('setTaskById', {
            id: taskId,
            ...data
          })
        }
      } catch (e) {
        console.error(`Error during getting task by ID ${taskId} from Firebase:`, e)
      }
    },
    async changeTaskStatus ({ commit }, { taskId, status }) {
      try {
        const { data } = await axios.patch(`https://coursework-3-8e706-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`,
          {
            status
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        commit('changeTaskStatus', data.status)
      } catch (e) {
        console.error(`Error during updating task status with ID ${taskId} in Firebase:`, e)
      }
    },
    async removeTask ({ commit }, id) {
      try {
        await axios.delete(`https://coursework-3-8e706-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`)
        commit('removeTask', id)
      } catch (e) {
        console.error(`Error during removing task with ID ${id} from Firebase:`, e)
      }
    }
  }
})

export default store
