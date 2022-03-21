<template>
    <div class="wall">

        <Profile />
        <Footer />
        
    </div>
</template>

<script>
import Profile from "../components/Profile.vue"
import Footer from "../components/Footer.vue"

export default {
  name: "Wall",
  components: { Profile, Footer },
}
</script>