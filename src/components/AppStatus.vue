<template>
    <span
        :class="['badge', statusClass]"
    >{{ statusText }}
    </span>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['active', 'done', 'pending', 'cancelled'].includes(value)
      }
    }
  },
  setup (props) {
    const statuses = reactive({
      active: {
        class: 'primary',
        text: 'Активен'
      },
      done: {
        class: 'primary',
        text: 'Завершен'
      },
      cancelled: {
        class: 'danger',
        text: 'Отменен'
      },
      pending: {
        class: 'warning',
        text: 'Выполняется'
      }
    })

    const statusClass = computed(() => statuses[props.type].class)
    const statusText = computed(() => statuses[props.type].text)

    return {
      statuses,
      statusClass,
      statusText
    }
  }
}
</script>
