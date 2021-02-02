<template>
    <div class="resume">
        <component 
            v-for="(section, index) in resume"
            :key="index"
            :is="section.type"
            v-bind="{type: section.type, content: section.content}"
        ></component>
    </div>
</template>

<script>
import Title from './Title.vue';
import Subtitle from './Subtitle.vue';
import Avatar from './Avatar.vue';
import Text from './Text.vue';

export default {
    props: {
        resume: {
            type: Array,
            required: true,
            validator(array) {
                return array.length !== 0;
            }
        }
    },
    components: {
        Title,
        Subtitle,
        Avatar,
        Text
    }
}
</script>

<style>

</style>
