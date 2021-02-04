<template>
    <div :class="$attrs.type">
        <h2>{{ $attrs.content }}</h2>
    </div>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>

<style>

</style>