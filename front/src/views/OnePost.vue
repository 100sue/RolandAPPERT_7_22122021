<template>
    <div class="onepost">

        <SearchOnePost />

    </div>
</template>

<script>
// @ is an alias to /src
import SearchOnePost from "../components/SearchOnePost.vue"
export default {
  name: "OnePost",
  components: { SearchOnePost},
}
</script>