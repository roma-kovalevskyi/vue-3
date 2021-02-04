<template>
    <div class="container column">
        <app-constructor 
            @create-resume-section="addResumeSection"
        ></app-constructor>

        <div class="card card-w70">
            <app-resume
                v-if="resume.length"
                :resume="resume"
            ></app-resume>
            <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
        </div>
    </div>
    <div class="container">
        <app-comments
            v-if="comments.length"
            :comments="comments"
        ></app-comments>
        <app-loader 
            v-else-if="loading"
        ></app-loader>
        <p v-else>
            <button class="btn primary" @click="loadComments">Загрузить комментарии</button>
        </p>
    </div>
</template>

<script>
import AppConstructor from './components/Constructor/AppConstructor.vue';
import AppResume from './components/Resume/AppResume.vue';
import AppComments from './components/Comments/AppComments.vue';
import AppLoader from './components/AppLoader.vue';
import axios from 'axios';

export default {
    data () {
        return {
            resume: [],
            comments: [],
            loading: false          
        }
    },
    methods: {
        addResumeSection(type, content) {
            this.resume.push({
                type: type,
                content: content
            });
        },
        async loadComments() {
            try {
                this.loading = true;
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42');
                this.comments = data;
            } catch (error) {
                console.error(`Не удалось загрузить комментарии! Ошибка - ${error.message}`);
            } finally {
                this.loading = false;  
            }
        }
    },
    components: {
        AppConstructor,
        AppResume,
        AppComments,
        AppLoader
    }
}
</script>

<style>

</style>
