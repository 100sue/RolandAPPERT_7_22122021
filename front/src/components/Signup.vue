<template>
  <div class="signupForm">

    <form @submit.prevent = signup()>
      <div class="formSignup">
        <label>Nom :</label> <br />
        <input class="nameSignup" type="text" placeholder="Marc Dupont" required />
        <br />
      </div>

      <div class="formSignup">
        <label>Email :</label> <br />
        <input class="emailSignup" type="text" placeholder="marc.dupont@gmail.com" required />
        <br />
      </div>

      <div class="formSignup">
        <label>Mot de passe :</label> <br />
        <input class="passwordSignup" type="password" placeholder="Exemple00" required /> 
        <br />
      </div>

      <div class="formSignup">
        <label>Vérification du mot de passe :</label> <br />
        <input class="verifPasswordSignup" type="password" placeholder="Exemple00" required />
        <br />
      </div>

      <button class="btnSignup" type="submit">S'inscrire !</button> <br />
      <p class="errorSignup"></p>
    </form>

      <router-link to="/" class="loginNav">
        <div class="wantLogin">
          Connectez-vous ici !
        </div>
      </router-link>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    signup() {
      const name = document.getElementsByClassName("nameSignup")[0].value;
      const email = document.getElementsByClassName("emailSignup")[0].value;
      const password = document.getElementsByClassName("passwordSignup")[0].value;
      const password_confirmation = document.getElementsByClassName("verifPasswordSignup")[0].value;
      if (password === password_confirmation && password.length > 0) {
        axios.post("http://localhost:3000/api/auth/signup",
            {
              name,
              email,
              password,
            },
            {
                header: {
                "Content-Type": "application/json",
                },
            }
        )
        .then(() => {
            alert("Félicitation ! Vous venez de vous inscrire !")
            this.$router.push('/login')
            }) 
        .catch(() => {
          document.getElementsByClassName("errorSignup")[0].innerHTML = "Votre nom ou votre email ou votre mot de passe est incorrect. Merci de respecter le format inscrit en exemple"
          });
      } else if (password !== password_confirmation) {
          alert("Les mots de passe ne sont pas identiques");
      }
    },
  },
};
</script>

<style scoped>
.signupForm {
  margin-bottom: 2rem;
}
form {
  text-align: center;
  margin: 1rem 0;
}
.formSignup {
  margin-bottom: 1.5rem;
}
input {
  margin: 1rem 0;
  padding: 7px;
  border-radius: 6px;
}
.wantLogin {
  text-align: center;
  margin: auto;
  border: 1px transparent black;
  border-radius: 10px;
  width: 25%;
  padding: 10px;
  background-color: #ff6961;
}
.btnSignup {
    text-decoration: none;
    color: black;
    border: 1px black transparent;
    border-radius: 10px;
    padding: 12px;
    background: #FFF;
    cursor: pointer;
    margin-bottom: 4rem;
    width: 12rem;
}
.btnSignup:hover{
  background-color: #b7ebbb;
}
.loginNav{
    text-decoration: none;
    color: black;
}
.errorSignup{
  color: #ff6961;
  margin-bottom: 3rem;
}
@media screen and (min-width: 769px) {
    .wantLogin {
        width: 20%;
    }
}
@media screen and (min-width: 1025px) {
    .wantLogin {
        width: 15%;
    }
}
</style>