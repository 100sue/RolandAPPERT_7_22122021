<script setup>
  import HeaderSignUp from "../components/HeaderSignUp.vue";
  import SignUp from "../components/SignUp.vue";
  </script>
  
  <template>
    <header id="header">
      <HeaderSignUp></HeaderSignUp>
    </header>
    <main id="main">
      <SignUp />
    </main>
  </template>
  
  <style scoped>
  /* Laptop */
  #header{
      position: sticky;
      max-width: 1024px;
      margin: auto;
      display: flex;
      height: 180px;
      align-items: center;
      justify-content: space-between;
      
  }
  #main{
      max-width: 1024px;
      margin: auto;
      padding-top: 20px;
      background-image: url("../assets/test2.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      height: 68vh;
      padding: 3%;
  }
  /* Tablette */
  @media screen and (max-width: 1100px) {
      #header{
        margin: 0 50px;
      }
  }
  /* Mobile */
  @media screen and (max-width: 425px) {
    #header{
      flex-direction: column;
      height: 130px;
      margin-top: 30px;
    }
  }
  </style>