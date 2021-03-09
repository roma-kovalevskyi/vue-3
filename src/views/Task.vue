<template>
    <div
        v-if="task"
        class="card"
    >
        <h2>{{ task.title }}</h2>
        <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
        <p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
        <p><strong>Описание</strong>: {{ task.description }}</p>
        <div>
            <button
                class="btn"
                @click="changeStatus('pending')">
                    Взять в работу
            </button>
            <button
                class="btn primary"
                @click="changeStatus('done')">
                    Завершить
            </button>
            <button
                class="btn danger"
                @click="changeStatus('cancelled')">
                    Отменить
            </button>
        </div>
    </div>
    <app-loader
        v-else-if="loading"
    ></app-loader>
    <h3 v-else class="text-white center">
        Задачи с id = <strong>{{ taskId }}</strong> нет.
    </h3>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'

export default {
  props: ['taskId'],
  setup (props) {
    const store = useStore()

    const loading = ref(false)
    const task = computed(() => store.getters.taskById)

    const fetchTaskById = async () => {
      loading.value = true
      await store.dispatch('fetchTaskById', props.taskId)
      loading.value = false
    }

    const changeStatus = async status => {
      store.dispatch('changeTaskStatus', {
        taskId: props.taskId,
        status
      })
    }

    onMounted(() => {
      fetchTaskById()
    })

    return {
      loading,
      task,
      fetchTaskById,
      changeStatus
    }
  },
  components: {
    AppStatus,
    AppLoader
  }
}
</script>

<style scoped>

</style>
