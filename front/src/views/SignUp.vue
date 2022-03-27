<template>
    <div class="sign">

        <Header />

        <Signup />
        
    </div>
</template>

<script>

import Header from "../components/Header.vue"
import Signup from "../components/Signup.vue"

export default {
  name: "Sign",
  components: { Header, Signup },
}
</script>