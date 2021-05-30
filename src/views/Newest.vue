<template>
    <div>
        <h1>Newest</h1>
        <br>
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
    name: "Newest",
    components: {NewsList},
    data() {
        return {
            allNews: [],
            page: 1,
            size: 10,
            count: 0,
            sizes: [5, 10]
        }
    },
    beforeMount() {
        this.fetchNews();
    },
    methods: {
        fetchNews(){
            if(this.count <= (this.page-1)*this.size){
                this.page = 1;
            }
            this.$axios.get(`/read/news/newest`, {params: {
                    start: this.page-1,
                    size: this.size
                }}).then((response) => {
                this.count = response.data.count;
                if(this.count > 10) {
                    this.count = 10;
                }
                this.allNews = response.data.data;
            });
        }
    },
}
</script>

<style scoped>

</style>