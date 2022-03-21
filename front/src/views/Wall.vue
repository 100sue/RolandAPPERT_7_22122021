<template>
      <div class="wall">

          <HeaderLogged />
          <CreatePost />
          <AllPosts />
          <Footer />
          
      </div>
</template>

<script>
import HeaderLogged from "../components/HeaderLogged.vue"
import CreatePost from "../components/CreatePost.vue"
import AllPosts from "../components/AllPosts.vue"
import Footer from "../components/Footer.vue"

export default {
  name: "Wall",
  components: { HeaderLogged, CreatePost, AllPosts, Footer },
}
</script>

<style scoped>
.wall{
  width: 99%;
  margin: auto;
}
</style>