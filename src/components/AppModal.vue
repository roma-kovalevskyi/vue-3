<template>
    <div class="modal-wrapper">
        <div class="modal-backdrop" @click="cancelRemove"></div>
        <div class="modal">
            <h2>Внимание!</h2>
            <p>Вы уверены, что хотите удалить данную задачу?</p>
            <div class="modal-buttons">
                <button class="btn primary" @click="confirmRemove">Да</button>
                <button class="btn" @click="cancelRemove">Нет</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  emits: ['close', 'remove'],
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const cancelRemove = () => {
      context.emit('close')
    }

    const confirmRemove = () => {
      context.emit('remove', props.task.id)
      context.emit('close')
    }

    return {
      cancelRemove,
      confirmRemove
    }
  }
}
</script>

<style>

</style>
