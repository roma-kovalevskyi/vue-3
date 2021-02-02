<template>
    <form class="card card-w30" @submit.prevent="createSection">
        <div class="form-control">
            <label for="type">Тип блока</label>
            <select id="type" v-model="sectionType">
                <option value="title">Заголовок</option>
                <option value="subtitle">Подзаголовок</option>
                <option value="avatar">Аватар</option>
                <option value="text">Текст</option>
            </select>
        </div>

        <div class="form-control">
            <label for="value">Значение</label>
            <textarea 
                id="value" 
                rows="3" 
                v-model.trim="sectionContent"
            ></textarea>
        </div>

        <button class="btn primary" :disabled="isDisabledButton">Добавить</button>
    </form>
</template>

<script>
export default {
    emits: {
        'create-resume-section'(sectionType, sectionContent) {
            if (['title', 'subtitle', 'avatar', 'text'].includes(sectionType) && sectionContent) {
                return true;
            }
            console.warn('Нет параметров sectionType и sectionContent для emit create-resume-section!');
            return false;
        }
    },
    data() {
        return {
            sectionType: 'title',
            sectionContent: ''
        }
    },
    methods: {
        resetValuesToDefault() {
            this.sectionType = 'title',
            this.sectionContent = '';
        },
        createSection() {
            this.$emit('create-resume-section', this.sectionType, this.sectionContent);
            this.resetValuesToDefault();
        }
    },
    computed: {
        isDisabledButton() {
            return this.sectionContent.length < 4;
        }
    }
}
</script>

<style>

</style>