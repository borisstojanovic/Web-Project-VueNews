<template>
    <div class="container">
        <div class="col-md-12">
            <div style="cursor: pointer" v-for="news in allNews" :key="news.id" @click="singleNews(news)">
                <NewsItem :news="news"/>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import NewsItem from "@/components/NewsItem";
export default {
    name: "NewsList",
    components: {NewsItem},
    data() {
        return {
            category: null,
        }
    },
    props: {
        allNews: {
            type: Array,
            required: true,
        }
    },
    methods: {
        singleNews(news) {
            this.$router.push({
                name: "SingleNews",
                params: { news: news.id }
            });
        },
    },
}
</script>

<style scoped>

</style>