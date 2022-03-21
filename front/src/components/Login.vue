<template>
  <div class="loginForm">

    <form @submit.prevent = login()>
      <div class="formLogin">
        <label>Email :</label> <br />
        <input class="emailLogin" type="text" placeholder="Email" required v-model = "email" />
        <br />
      </div>

      <div class="formLogin">
        <label>Mot de passe :</label> <br />
        <input class="passwordLogin" type="password" placeholder="Mot de passe" required v-model = "password" />
        <br />
      </div>

      <button class="btnLogin" type="submit">Connexion</button> <br />
      <p class="errorLogin"></p>
    </form>

      <router-link to="/signup" class="signupNav">
        <div class="wantSignup">
          Inscrivez-vous ici !
        </div>
      </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      token: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login(){
      const email = this.email;
      const password = this.password;
    
      axios.post("http://localhost:3000/api/auth/login",
            {
              email,
              password,
            },
            {
              header: {
                "Content-Type": "application/json",
              },
            }
      )
      .then((res) => {
        {
          localStorage.setItem("token", (res.data.token));
          localStorage.setItem("userId", (res.data.userId));
          localStorage.setItem("name", (res.data.name));
          localStorage.setItem("admin", (res.data.admin));
        }
        this.$router.push('/wall');
      })
      .catch(() => {
        document.getElementsByClassName("errorLogin")[0].innerHTML = "Votre email ou votre mot de passe n'est pas correct"
      });
    },
  }
};
</script>

<style scoped>
body{
  background-color: #B0E0E6;
}
.loginForm {
  margin-bottom: 2rem;
}
form {
  text-align: center;
  margin-bottom: 4rem;
}
.formLogin {
  margin-bottom: 1.5rem;
}
input {
  margin: 1rem 0;
  padding: 7px;
  border-radius: 6px;
}
.wantSignup {
  text-align: center;
  margin: auto;
  border: 1px transparent black;
  border-radius: 10px;
  width: 25%;
  padding: 10px;
  background-color: #ff6961;
}
.btnLogin{
    text-decoration: none;
    color: black;
    border: 1px white transparent;
    border-radius: 10px;
    padding: 12px;
    background: #FFF;
    cursor: pointer;
    margin-bottom: 4rem;
    width: 12rem;
}
.btnLogin:hover{
    background-color: #b7ebbb;
}
.signupNav{
    text-decoration: none;
    color: black;
}
.errorLogin{
    color: #ff6961;
}
@media screen and (min-width: 769px) {
    .wantSignup {
        width: 20%;
    }
}
@media screen and (min-width: 1025px) {
    .wantSignup {
        width: 15%;
    }
}
</style>