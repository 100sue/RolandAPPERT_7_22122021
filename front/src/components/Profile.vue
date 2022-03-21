<template>
    <div class="profile">
        <header class="header">
            <router-link to="/wall">
                <img src="../assets/icon-left-font.png" alt="Logo de Groupomania">
            </router-link>
        </header>

        <main >
            <h2>Bonjour, </h2>
            <div class="userName"></div>

            <button class="delete" @click="deleteProfile">Supprimer le profil</button>
        </main>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profile',
    data() {
        return {
            token: "",
            userId: "",
            name: "",
        }
    },
    mounted(){
        const name = localStorage.getItem('name')
        document.getElementsByClassName("userName")[0].innerHTML = name
    },
    methods: {
        deleteProfile() {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('userId')
        
        axios.delete('http://localhost:3000/api/auth/delete/' + id, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    localStorage.removeItem('token');
                    this.$router.push('/signup'); 
                }
            })
            .catch(error => {
                console.log( error )
            })
        }
    }
}
</script>

<style scoped>
.header, main{
    text-align: center;
}
img{
    width: 85%;
    margin-bottom: 1rem;
}
a{
    text-decoration: none;
    color: black;
}
h2{
    margin-bottom: 3rem;
}
.userName{
    border: 1px transparent black;
    border-radius: 10px;
    width: 30%;
    margin: auto;
    padding: 1rem;
    margin-bottom: 6rem;
    background: #F1F2F6;
}
.delete{
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 10rem;
    background: rgba(239, 68, 68);
    font-weight: bold;
    color: white;
    cursor: pointer;
}
@media screen and (min-width: 426px) {
    img {
        width: 40%;
    }
}
@media screen and (min-width: 1025px) {
    img {
        width: 25%;
    }
}
</style>