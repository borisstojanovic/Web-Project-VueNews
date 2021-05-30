<template>
    <div class="container">
        <h1>{{news.title}}</h1>
        <h5>{{category}}</h5>
        <p>{{news.text | shortText}}</p>
        <span style="color: gray">Created at: {{new Date(news.createdAt) | formatDate}}</span>
    </div>
</template>

<script>
export default {
    name: "NewsItem",
    filters: {
        shortText(value) {
            if (value.length < 128) {
                return value;
            }
            return value.slice(0, 128) + '...'
        },
        formatDate(value){
            return value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear();
        }
    },
    data() {
        return {
            category: null,
        }
    },
    props: {
        news: {
            type: Object,
            required: true,
        }
    },
    beforeMount() {
        this.getCategory()
    },
    methods: {
        getCategory(){
            this.$axios.get(`/read/categories/find/${this.news.categoryId}`).then(response => {
                this.category = response.data.name;
            })
        }
    },
}
</script>

<style scoped>

</style>