<script setup>
    import HeaderLogged from '../components/HeaderLogged.vue';
    import Feed from '../components/Feed.vue';
    import Publication from '../components/Publication.vue';

   /* export default {
  name: "FeedView",
  components: {
    HeaderLogged,
    Feed,
    Publication,
  },
  data() {
  }}

  methods: {
    // Bouton permettant un retour rapide en haut de page
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}*/
    </script>
    
    <template>
        <header id="header">
            <HeaderLogged/> 
        </header>
        <main id="main">
            <Feed/>
            <Publication/>
                                                                                 <!-- Bouton Scroll to Top-->
        <button class="toTop" @click="toTop" title="Retour en haut de page">
        <span class="fa fa-chevron-up"></span>
        </button>
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
    }
    

    /* Bouton Scroll to the Top */
    .toTop {
       width: 7vh;
       height: 5vh;
       position: absolute;
       right: 0;
       margin-right: 5%;
       color: #FD2D01;
       background-color: #2C3B97;
    }

    /* Tablette */
    @media screen and (max-width: 1100px) {
        #header{
            margin: 0 50px;
        }
    }
    /* Mobile */
    @media screen and (max-width: 615px) {
        #header{
            flex-direction: column;
            height: 190px;
            margin: 30px 0;
        }
        
    }
    </style>