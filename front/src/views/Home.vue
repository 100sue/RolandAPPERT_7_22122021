<script>

import Header from "../components/Header.vue"
import Login from "../components/Login.vue"
import Footer from "../components/Footer.vue"

export default {
  name: 'Home',
  components: { Header, Login, Footer },
}

</script>

<template>
  <div class="home">

    <Header />

    <Login />

    <Footer />
    
  </div>
</template>


