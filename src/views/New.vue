<template>
    <app-loader
        v-if="loading"
    ></app-loader>
    <form v-else class="card" @submit.prevent="createTask">
        <h1>Создать новую задачу</h1>
        <div class="form-control">
            <label for="title">Название</label>
            <input type="text" id="title" v-model.trim="title">
        </div>
        <div class="form-control">
            <label for="date">Дата дэдлайна</label>
            <input type="date" id="date" v-model="deadline">
        </div>
        <div class="form-control">
            <label for="description">Описание</label>
            <textarea id="description" v-model.trim="description"></textarea>
        </div>
        <button class="btn primary" :disabled="!isValidTask">Создать</button>
    </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppLoader from '../components/AppLoader.vue'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const deadline = ref('')
    const description = ref('')
    const loading = ref(false)

    const isValidTask = computed(() => {
      return [title.value, deadline.value, description.value].every(value => value !== '')
    })

    const formattedTaskDeadline = computed(() => {
      return new Date(deadline.value).toLocaleDateString()
    })

    const taskStatus = computed(() => {
      return new Date(deadline.value) < new Date() ? 'cancelled' : 'active'
    })

    const createTask = async () => {
      const newTask = {
        status: taskStatus.value,
        title: title.value,
        deadline: formattedTaskDeadline.value,
        description: description.value
      }

      loading.value = true
      await store.dispatch('addTask', newTask)
      loading.value = false
      router.push('/')
    }

    return {
      title,
      deadline,
      description,
      loading,
      isValidTask,
      formattedTaskDeadline,
      taskStatus,
      createTask
    }
  },
  components: {
    AppLoader
  }
}
</script>

<style scoped>

</style>
