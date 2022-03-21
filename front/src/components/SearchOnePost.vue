<template>
    <div class="searchOnePost">

        <header class="header">
            <router-link to="/wall">
                <img src="../assets/icon.png" alt="Logo de Groupomania">
            </router-link>
        </header>
    
        <div class="posts">
            <article class="post" v-if="post !== undefined">
                
                <div class="post-name"> Publié par <strong> {{ post.name }} </strong> - {{ datePost(post.date) }}</div>
                <div class="post-content" v-html="post.content"></div>
                <div class="post-image"><img :src="post.image"></div>
                    
                <div class="modifyForm" v-if="userId == post.id_user">
                    <label class="titleModify" for="modify">Modifier le contenu du post : </label> <br>
                    <textarea class="contentPost" name="modify" placeholder="Une modification ?" v-model="content" ></textarea> <br>
                    <button class="modifyPost" @click="modifyPost" v-if="content !== ''">Modifier</button>
                </div>

                <div class="allComments">

                    <h3 class="titleComments">Commentaires :</h3>
                    <div class="comments" v-for="comment in comments" :key="comment">
                        <div class="comment-content"> {{ comment.content }} </div>
                        <div><button class="deleteComment" @click="deleteComment(comment.id)" v-if="userId == comment.id_user || admin == 1"></button></div>
                        <div class="comment-name"> <strong>{{ comment.name }}</strong> le {{ datePost(comment.date_creation) }} </div>
                    </div>

                </div>

                <button class="deletePost" @click="deletePost" v-if="userId == post.id_user || admin == 1">Supprimer la publication</button>

            </article>      
        </div>

        <div class="createComments">
            <form class="formComment" @submit.prevent="createComment">

                <div class="formNewComments">
                    <label class="titleNewComment" for="newComment">Un commentaire ?</label> <br>
                    <textarea name="newComment" class="contentNewComment" placeholder="Un commentaire?" required></textarea> <br>
                    <button class="addComment" type="submit">Commenter</button>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SearchOnePost',
    data() {
        return {
            post: [],
            comments: [],
            content: "",
            modifyContent: "",
            name: "",
            userId: "",
            admin: "",
        }
    },
    mounted() {
        this.getOnePost();
        this.userId = localStorage.getItem('userId')
        this.admin = localStorage.getItem('admin')
    },
    methods: {
        getOnePost() {
            const idPost = this.$route.params.id
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/" + idPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
                this.post = res.data.post;
                this.comments = res.data.comments;
            })
            .catch(error => {
                console.log("Le post n'a pas pu être récupéré /" + error)
            })
        },
        createComment() {
            const content = document.getElementsByClassName("contentNewComment")[0].value;
            const idPost = this.$route.params.id
            const token = localStorage.getItem("token");
            axios.post(`http://localhost:3000/api/comment/${idPost}/comment`, 
            {
                content,
            },
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            )
            .then(res => {
                this.comments = res.data;
                window.location.reload()
            })
            .catch(error => {
                console.log("Le commentaire n'a pas pu être crée /" + error)
            })
        },
        deleteComment(idComment) {
            const token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/api/comment/comment/${idComment}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log("Le commentaire n'a pas pu être supprimé /" + error)
            })
        },
        deletePost() {
            const token = localStorage.getItem('token')
            const idPost = this.$route.params.id
            axios.delete("http://localhost:3000/api/post/" + idPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    this.$router.push('/wall'); 
                }
            })
            .catch(error => {
                console.log("Le post n'a pas pu être supprimé /" + error )
            }) 
        },
        modifyPost() {
            
            const idPost = this.$route.params.id;
            const token = localStorage.getItem('token');
            const content = document.getElementsByClassName("contentPost")[0].value;
            axios.put("http://localhost:3000/api/post/" + idPost, {
                idPost,
                content
            },
    
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log("Le post n'a pas pu être modifié /" + error)
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
.header{
    text-align: center;
    margin-bottom: 2rem;
}
img{
    width: 35%;
    border-radius: 10px;
}
.searchOnePost{
    text-align: center;
}
.posts{
    text-align: center;
    width: 90%;
    margin: auto;
}
.post{
    background: rgb(255, 215, 215);
    border: 1px solid rgb(119, 119, 119);
    border-radius: 25px;
    width: 90%;
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
    display: flex;
    flex-wrap: wrap;
    background-color: #FFF;
    border: 1px transparent black;
    border-radius: 10px;
    width: 87%;
    margin: auto;
    margin-bottom: 15px;
    text-align: initial;
    padding: 15px;
    display: flex;
    justify-content: space-between;
}
.comment-content{
    width: 90%;
    margin-bottom: 10px;
}
.comment-name{
    font-size: 12px;
    font-style: italic;
}
.titleComments{
    width: 90%;
    margin: auto;
    text-align: initial;
    padding: 15px;
}
.deleteComment{
    padding: 7px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
}
.deleteComment:hover{
    background-color: rgba(239, 68, 68);
}
.titleModify, .contentPost{
    margin-bottom: 15px;
}
.contentPost{
    padding: 26px;
    margin-top: 15px;
    border-radius: 19px;
}
.addComment{
    background: rgba(239, 68, 68);
}
.modifyPost, .addComment{
    padding: 6px;
    width: 60%;
    border-radius: 15px;
    cursor: pointer;
}
.modifyPost:hover, .addComment:hover{
    background-color: #b7ebbb;
}
.deletePost{
    margin-bottom: 1rem;
    padding: 7px;
    background: rgba(239, 68, 68);
    border-radius: 10px;
    cursor: pointer;
    color: white;
}
.titleModify, .titleNewComment{
    font-weight: bold;
}
.formNewComments{
    border: 1px solid rgb(119, 119, 119);
    border-radius: 10px;
    width: 75%;
    margin: auto;
    margin-bottom: 2rem;
    padding: 1rem;
}
.contentNewComment{
    margin: 1rem 0;
    padding: 26px;
    border-radius: 19px;
}
@media screen and (min-width: 426px) {
    img{
        width: 30%;
    }
    .modifyPost, .addComment{
        width: 35%;
    }
}
@media screen and (min-width: 769px) {
    img{
        width: 25%;
    }
    .posts{
        width: 60%;
    }
    .formNewComments{
        width: 50%;
    }
    .modifyPost, .addComment{
        width: 35%;
    }
}
@media screen and (min-width: 1025px) {
    img{
        width: 15%;
    }
    .posts{
        width: 45%;
    }
    .formNewComments{
        width: 39%;
    }
    .modifyPost, .addComment{
        width: 27%;
    }
}
</style>