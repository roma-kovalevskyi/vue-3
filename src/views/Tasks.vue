<template>
    <template v-if="tasks.length">
        <div class="card">
            <div class="filter">
                <div class="filter-title">Показать задачи </div>
                <select id="filter" v-model="filter">
                    <option value="all">Все</option>
                    <option value="active">Активные</option>
                    <option value="pending">Выполняются</option>
                    <option value="done">Завершены</option>
                    <option value="cancelled">Отменены</option>
                </select>
            </div>
        </div>
        <h3 class="text-white">Количество задач: {{ tasksCount }}</h3>
        <div
            class="card"
            v-for="task in filteredTasks"
            :key="task.id"
        >
            <h2 class="card-title">
                {{ task.title }}
                <AppStatus :type="task.status" />
            </h2>
            <p>
                <strong>
                <small>
                    {{ task.deadline }}
                </small>
                </strong>
            </p>
            <div class="card-footer">
                <router-link :to="'/task/' + task.id" custom v-slot="{ navigate }">
                    <button class="btn primary" @click="navigate">Посмотреть</button>
                </router-link>
                <button class="btn danger" @click="openModal(task)">Удалить</button>
            </div>
        </div>
        <teleport to="#modal">
            <AppModal
                v-if="modal"
                :task="taskToRemove"
                @remove="removeTask"
                @close="closeModal"
            />
        </teleport>
    </template>
    <app-loader
        v-else-if="loading"
    ></app-loader>
    <h1 v-else class="text-white center">Задач пока нет</h1>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import AppStatus from '../components/AppStatus.vue'
import AppLoader from '../components/AppLoader.vue'
import AppModal from '../components/AppModal.vue'

export default {
  setup () {
    const store = useStore()

    const loading = ref(false)
    const filter = ref('all')
    const modal = ref(false)
    const taskToRemove = ref(null)

    const tasks = computed(() => store.getters.tasks)
    const filteredTasks = computed(() => {
      return filter.value === 'all' ? tasks.value : tasks.value.filter(task => task.status === filter.value)
    })
    const tasksCount = computed(() => filteredTasks.value.length)

    const openModal = task => {
      taskToRemove.value = task
      modal.value = true
    }

    const closeModal = () => {
      taskToRemove.value = null
      modal.value = false
    }

    const fetchTasksHandler = async () => {
      loading.value = true
      await store.dispatch('fetchTasks')
      loading.value = false
    }

    const removeTask = async id => {
      await store.dispatch('removeTask', id)
    }

    onMounted(() => {
      fetchTasksHandler()
    })

    return {
      loading,
      filter,
      modal,
      taskToRemove,
      tasks,
      filteredTasks,
      tasksCount,
      openModal,
      closeModal,
      fetchTasksHandler,
      removeTask
    }
  },
  components: {
    AppStatus,
    AppLoader,
    AppModal
  }
}
</script>
