<script setup>
  import HeaderLogin from "../components/HeaderLogin.vue";
  import Login from "../components/Login.vue";
  </script>
  
  <template>
    <header id="header">
      <HeaderLogin></HeaderLogin>
    </header>
    <main id="main">
      <Login />
    </main>
  </template>
  
  <style scoped>
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