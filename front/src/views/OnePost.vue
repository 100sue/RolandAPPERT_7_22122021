<template>
    <div class="onepost">

        <SearchOnePost />
        <Footer />

    </div>
</template>

<script>
// @ is an alias to /src
import SearchOnePost from "../components/SearchOnePost.vue"
import Footer from "../components/Footer.vue"
export default {
  name: "OnePost",
  components: { SearchOnePost, Footer },
}
</script>