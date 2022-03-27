<script>

import Header from "../components/Header.vue"
import Login from "../components/Login.vue"

export default {
  name: 'Home',
  components: { Header, Login },
}

</script>

<template>
  <div class="home">

    <Header />

    <Login />
    
  </div>
</template>


