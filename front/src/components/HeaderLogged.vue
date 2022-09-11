<template>
    <div class="headerLogged-logo-form">
        <RouterLink to="/feed">
            <img src="../assets/Groupomania-logo.svg" alt="Groupomania-logo" class="header__logo"/>
        </RouterLink>
        <router-link to="/community" title="Membres de l'équipe" class="users-header" >
        <i class="fas -solid fa-users"></i>
      </router-link>
    </div>
    <div class="header-nav">
        <RouterLink to="/feed" class="header-nav-home">
            <fontAwesome icon="house" class="header-nav__icon"/>
        </RouterLink >
        <button href="#" @click="burgerMenu" aria-label="bouton profil" :class="burgerMenuClass()">
            <fontAwesome icon="sort-down" class="header-nav-btn__icon"/>
            <p class="header-nav-btn__title">Profil</p>
        </button>
    </div>
    <div class="header-menu" v-show="success">
        <RouterLink to="/profil" class="header-menu-panel">
            <fontAwesome icon="circle-user" class="header-menu-panel__icon"/>
            <p class="header-menu-panel__title">Profil</p>
        </RouterLink>
        <RouterLink @click="Logout" to="/login" class="header-menu-panel">
            <fontAwesome icon="arrow-right-from-bracket" class="header-menu-panel__icon"/>
            <p class="header-menu-panel__title">Logout</p>
        </RouterLink >
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    name: 'HeaderLogged',
    data() {
        return {
            success : false,
        }
    },
    methods: {
        burgerMenu() {
            if (!this.success) {
                this.success = true;
            } else {
                this.success = false
            }
        },
        burgerMenuClass() {
            if (!this.success) {
                return 'header-nav-btn'
            } else {
                return 'header-nav-btn-hov'
            }
        },
        Logout() {
            localStorage.clear();
        }
    }
}
</script>

<style scoped>
/* LAPTOP */ 
.header-menu{
    z-index:3;
    position: absolute;
    top:130px;
    right:30px;
    background-color: white;
    box-shadow: 1px 1px 10px #FD2D01;
    border-radius: 20px 5px 20px 20px;
    overflow: hidden;
}
.header-menu-panel{
    text-decoration: none;
    color: #4E5166;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0;
    padding:20px 30px;
    width: 100px;
}
.header-menu-panel:hover{
    background-color: #e6e6e6;
}
.header-menu-panel__icon{
    height: 20px;
}
.header-menu-panel__title{
    margin:0;
}
.headerLogged-logo-form{
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    width: 130px;
}

.header__logo{
    width: 60px;
}

.header-nav{
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 180px;
}
.header-nav__icon{
    height: 35px;
    color: #2C3B97; 
}
.header-nav__icon:hover{
    color: #FD2D01;
    transition: 0.2s linear; 
}
.header-nav-btn{
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    color: #FD2D01;
    background-color: white;
    font-weight: bold;
    width: 110px;
    height: 39px;
    border-radius: 30px;
    border: 2px solid #FD2D01;
}
.header-nav-btn-hov{
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    color: white;
    background-color: #2C3B97;
    font-weight: bold;
    width: 110px;
    height: 39px;
    border-radius: 30px;
    border: 2px solid #FD2D01;
    box-shadow: 2px 3px 8px #d0d1d6
}
.header-nav-btn:hover{
    color: white;
    background-color: #FD2D01;
    transition: 0.2s linear;
    box-shadow: 2px 3px 8px #d0d1d6
}
.header-nav-btn__icon{
    margin-bottom: 5px;
    margin-left:5px;
}
.header-nav-btn__title{
    text-align: center;
    margin: 0;
    margin-right: 10px;
}

i {
  font-size: 2em;
  color: #2C3B97;
  transition: transform 0.5s;
}
i:hover {
  border-radius: 100%;
  transform: rotate(360deg);
  color: #FD2D01;
}
/* TABLET */
@media screen and (max-width: 768px) {
    .header-nav-home{
        display: none;
    }
    .header-nav{
        justify-content: space-around;
    }
}
/* MOBILE */ 
@media screen and (max-width: 615px) {
    .headerLogged-logo-form{
        flex-direction: column;
        justify-content: space-around;
    }
    .header-form{
        margin-right:30px
    }
    .header__logo{
        margin-bottom: 20px;
    }
    .header-nav{
        justify-content: space-around;
    }
    .header-nav-home{
        display: none;
    }
    .header-menu{
        border-radius: 20px;
        right: auto;
        top: 210px;
    }
    .header-menu-panel{
        width: 120px;
    }
}
</style>