<template>
    <div class="header">
        <router-link to="/"><img src="../assets/logo_header_groupomania.png" alt="Logo de Groupomania"></router-link>
        <p>Le réseau social de votre entreprise !</p>
    </div>
</template>

<script>

export default {
    name: 'Header',
    }
</script>

<style scoped>
.header{
    text-align: center;
}
img{
    width: 65%;
}
p{
    font-size: 20px;
    margin: 0 1rem 3rem;
}
@media screen and (min-width: 426px) {
    img{
        width: 48%;
    }
}
@media screen and (min-width: 769px) {
    img {
        width: 35%;
    }
}
@media screen and (min-width: 1025px) {
    img {
        width: 22%;
    }
}
</style>