<template>
    <div :class="$attrs.type">
        <img :src="$attrs.content">
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .avatar {
    display: flex;
    justify-content: center;
    }

    .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
    }
</style>