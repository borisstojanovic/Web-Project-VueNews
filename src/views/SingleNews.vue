<template>
    <b-container fluid="true">
        <div class="container" style="margin-top: 2em">
            <div class="row">
                <div class="jumbotron" style="width:100%">
                    <h1 class="display-3">
                        {{news.title}}
                    </h1>
                    <h4 class="display-6">{{category.name}}</h4>
                    <h4 class="display-6">Author: {{user.firstName}} {{user.lastName}}</h4>
                    <p class="lead">
                        {{new Date(news.createdAt)|formatDate}}
                    </p>
                    <p>
                        <b-badge class="rounded-pill text-black-50" v-for="tag in tags" :key="tag.id" @click="newsForTag(tag)">|{{tag.keyword}}|</b-badge>
                    </p>
                    <hr class="my-4" />
                    <div class="post_body">
                        <p>{{news.text}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card my-4">
            <h5 class="card-header">Leave a Comment:</h5>
            <div class="card-body">
                <form @submit="addComment">
                    <div class="form-group">
                        <label for="author">Author</label>
                        <input id="author" required v-model="comment.author" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="text">Comment</label>
                        <textarea id="text" required v-model="comment.text" class="form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <CommentList :comments="comments"></CommentList>
        </div>
    </b-container>
</template>

<script>
import CommentList from "@/components/CommentList";
export default {
    name: "SingleNews",
    filters: {
        formatDate(value){
            return value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear();
        }
    },
    components: {CommentList},
    data(){
        return {
            news: null,
            tags: [],
            user: null,
            category: null,
            comment: {
                author: "",
                text: ""
            },
            comments: []
        }
    },
    beforeMount() {
        this.news = this.$route.params.news;
        this.getTags();
        this.getUser();
        this.getCategory();
        this.getComments();
    },
    methods: {
        getTags(){
            this.$axios.get(`/read/tags/news/${this.news.id}`).then(response => {
                this.tags = response.data;
            }).catch(err => {
                alert(err.message)
            })
        },
        getUser(){
            this.$axios.get(`/read/users/find/${this.news.userId}`).then(response =>{
                this.user = response.data;
            });
        },
        getCategory(){
            this.$axios.get(`/read/categories/find/${this.news.categoryId}`).then(response =>{
                this.category = response.data;
            });
        },
        addComment(){
            this.$axios.post(`/read/comments`, {
                newsId: this.news.id,
                author: this.comment.author,
                text: this.comment.text,
                createdAt: new Date()
            }).then(response =>{
                this.comments.push(response.data);
                this.comment = {}
            });
        },
        getComments(){
            this.$axios.get(`/read/comments/${this.news.id}`).then(response => {
                this.comments = response.data;
            })
        }
    }
}
</script>

<style scoped>

</style>