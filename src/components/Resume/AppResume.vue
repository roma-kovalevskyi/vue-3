<template>
    <div class="resume">
        <component 
            v-for="(section, index) in resume"
            :key="index"
            :is="'resume-' + section.type"
            v-bind="{type: section.type, content: section.content}"
        ></component>
    </div>
</template>

<script>
import ResumeTitle from './ResumeTitle.vue';
import ResumeSubtitle from './ResumeSubtitle.vue';
import ResumeAvatar from './ResumeAvatar.vue';
import ResumeText from './ResumeText.vue';

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
        ResumeTitle,
        ResumeSubtitle,
        ResumeAvatar,
        ResumeText
    }
}
</script>

<style>

</style>
