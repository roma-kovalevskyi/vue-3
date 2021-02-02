<template>
    <div :class="$attrs.type">
        <p>{{ $attrs.content }}</p>
    </div>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>

<style>

</style>