<template>
    <div class="createPost">
        <h2>Quelque chose à nous raconter ?</h2>
        <div class="newPost">
            <form class="formCreate" @submit.prevent="createPost">

                <div class="formNewPost">
                    <label for="content"></label>
                    <textarea name="content" class="contentNewPost" placeholder="Quoi de beau ?" required v-model="content"></textarea> <br>
                </div>

                <div class="formNewPost">
                    <label for="image">
                        <input class="imageNewPost" type="file" name="image" ref="image" v-on:change="upload"> <br>
                    </label>
                </div>

                <button type="submit">Publier</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreatePost',
    data() {
        return {
            content: "",
        };
    },
    methods: {
        createPost() {
            
            const formCreate = document.getElementsByClassName("formCreate")[0];
            const token = localStorage.getItem("token");
            let data = new FormData(formCreate);
                
            axios.post("http://localhost:3000/api/post/create", data, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => 
            {
                if (res) 
                {
                    window.location.reload()
                }
            })
            .catch(error => 
            {
                console.log( error )
            });
        }
    }
}
</script>

<style scoped>
.createPost{
    text-align: center;
    border: 1px solid black;
    border-radius: 70px;
    width: 75%;
    margin: auto;
    padding: 1rem;
    margin-bottom: 2rem;
}
.formNewPost{
    margin: 2rem 0;
}
.contentNewPost{
    width: 65%;
    padding: 1rem;
    border-radius: 10px;
}
button{
    padding: 9px;
    width: 12rem;
    background-color: rgba(239, 68, 68);
    border-radius: 20px;
    cursor: pointer;
}
button:hover{
    background-color: #b7ebbb;
;
}
@media screen and (min-width: 426px) {
    .createPost{
        width: 60%;
    }
}
@media screen and (min-width: 769px) {
    .createPost{
        width: 50%;
    }
}
@media screen and (min-width: 1025px) {
    .createPost{
        width: 40%;
    }
}
</style>