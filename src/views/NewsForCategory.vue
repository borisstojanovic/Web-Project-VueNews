<template>
    <div>
        <NewsList :all-news="allNews"/>
        <b-pagination
            v-model="page"
            :total-rows="count"
            :per-page="size"
            @input="fetchNews"
        ></b-pagination>
        <b-form-select v-model="size" :options="sizes" @input="fetchNews"></b-form-select>
    </div>
</template>

<script>
import NewsList from "@/components/NewsList";
export default {
    name: "NewsForCategory",
    components: {NewsList},
    data() {
        return {
            allNews: [],
            category: 0,
            page: 1,
            size: 10,
            count: 0,
            sizes: [5, 10, 15]
        }
    },
    beforeMount() {
        this.category = this.$route.params.categoryId;
        this.fetchNews();
    },
    watch: {
        $route(){
            this.category = this.$route.params.categoryId;
            this.fetchNews();
        }
    },
    methods: {
        singleNews(news) {
            this.$router.push({
                name: "SingleNews",
                params: { news: news }
            });
        },
        fetchNews(){
            if(this.count <= (this.page-1)*this.size){
                this.page = 1;
            }

            this.$axios.get(`/read/news/category/page/${this.category}`, {params: {
                    start: this.page - 1,
                    size: this.size
                }}).then((response) => {
                this.count = response.data.count;
                this.allNews = response.data.data;
            });
        }
    },
}
</script>

<style scoped>

</style>