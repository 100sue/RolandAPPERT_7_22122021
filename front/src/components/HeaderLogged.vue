<template>
    <div class="header">
        <img src="../assets/icon.png" alt="Logo de Groupomania">
        <router-link to="/profile">
            <p>Votre profil</p>
        </router-link>
        <router-link to="/home">
            <button class="disconnect" @click="disconnect">Se déconnecter</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogged',
    methods: {
        disconnect() {
            localStorage.clear()
        }
    }
}
    
</script>

<style scoped>
.header{
    text-align: center;
}
img{
    width: 35%;
    margin-bottom: 1rem;
}
p{
    font-size: 20px;
    margin: 0;
    margin-bottom: 2rem;
}
.disconnect{
    font-weight: initial;
    font-size: 15px;
    margin-bottom: 2rem;
    padding: 9px;
    width: 12rem;
    background-color: rgba(239, 68, 68);
    border-radius: 20px;
    cursor: pointer;
}
a{
    text-decoration: none;
    color: black;
    font-weight: bold;
}
@media screen and (min-width: 426px) {
    img{
        width: 30%;
    }
}
@media screen and (min-width: 769px) {
    img {
        width: 25%;
    }
}
@media screen and (min-width: 1025px) {
    img {
        width: 15%;
    }
}
</style>