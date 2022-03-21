<template>
    <div class="posts">
        <h3>L'actualité de vos collègues</h3>

        <article class="post" v-for="post in posts" :key="post">
            <router-link :to=" { name: 'OnePost', params: { id: post.id }} ">

                <div class="post-name"> Publié par <strong>{{ post.name }}</strong> - {{ datePost(post.date) }}</div>
                <div class="post-content"> {{ post.content }} </div>
                <div class="post-image"><img :src="post.image"></div>
                <h3 class="titleComments">Commentaires :</h3>
                
                <div class="comments" v-for="comment in post.comments" :key="comment">
                    <div class="comment-content"> {{ comment.content }} </div>
                    <div class="comment-name"> <strong>{{ comment.name }}</strong> - {{ datePost(comment.date_creation) }} </div>
                </div>
            </router-link>
        </article>
        
    </div>
</template>



<script>
import axios from 'axios';
export default {
    name: 'AllPosts',
    data() {
        return {
            posts: [],
        }
    },
    mounted() {
            this.getAllPost();
    },
    methods: {
        getAllPost() {
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/all", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                this.posts = res.data;
            })
        },
        datePost(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-Fr', options);
        }
    }
}
</script>


<style scoped>
h3{
    margin: 4rem 0;
}
.posts{
    text-align: center;
    width: 80%;
    margin: auto;
}
.post{
    background: rgb(255, 215, 215);
    border: 1px solid rgb(119, 119, 119);
    border-radius: 25px;
    width: 100%;
    margin: auto;
    height: auto;
    margin-bottom: 5rem;
}
.post-name{
    border-radius: 25px 25px 0 0;
    padding: 1rem;
    border-bottom: 1px solid rgb(119, 119, 119);
    font-style: italic;
}
.post-content{
    background-color: #FFF;
    padding: 3rem 1rem;
    margin-bottom: 10px;
    text-align: initial;
}
.post-image{
    margin-bottom: 10px;
}
.post-image img{
    width: 90%;
}
.comments{
    background-color: #FFF;
    border: 1px transparent black;
    border-radius: 10px;
    width: 70%;
    margin: auto;
    margin-bottom: 15px;
    text-align: initial;
    padding: 15px;
}
.comment-content{
    margin-bottom: 10px;
}
.comment-name{
    font-size: 12px;
    font-style: italic;
}
.titleComments{
    width: 88%;
    margin: auto;
    text-align: initial;
    padding: 15px;
}
img{
    border-radius: 10px;
}
a{
    text-decoration: none;
    color: black;
}
@media screen and (min-width: 426px) {
    .posts{
        width: 65%;
    }
    .comments{
        width: 85%;
    }
}
@media screen and (min-width: 769px) {
    .post-image img{
        width: 75%;
    }
}
@media screen and (min-width: 1025px) {
    .posts{
        width: 45%;
    }
    .post-image img{
        width: 60%;
    }
}
</style>