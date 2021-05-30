<template>
    <div class="container">
        <div class="col-md-12">
            <div class="container" v-for="comment in comments" :key="comment.id">
                <h3>{{comment.author}}</h3>
                <p class="lead">{{comment.text}}</p>
                <span style="color: gray">Created at: {{new Date(comment.createdAt) | formatDate}}</span>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommentList",
    filters:{
        formatDate(value){
            return value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear();
        }
    },
    props: {
        comments: {
            type: Array,
            required: true,
        }
    },
}
</script>

<style scoped>

</style>