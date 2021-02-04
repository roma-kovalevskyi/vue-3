<template>
    <div :class="$attrs.type">
        <h1>{{ $attrs.content }}</h1>
    </div>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>

<style>

</style>