<template>
    <div class="container">
      <HeaderWall />
  
      <main class="main-community">
        <section class="community-card">
          <div class="community-title">
            <h1>Membres de l'équipe</h1>
          </div>
  
          <!-- Input de recherche de membre -->
          <div class="community-search">
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              class="community-input"
              placeholder="Rechercher un collègue"
              v-model="searchKey"
              autocomplete="off"
              title="Espace de recherche"
            />
            <button type="submit" aria-label="Recherche membres">
              <i class="fa fa-search"></i>
            </button>
          </div>
  
          <!-- Affichage du nombre de résultats -->
          <span
            class="search-result"
            v-if="searchKey && filteredList.length >= 1"
          >
            {{ filteredList.length }} Résultat<span
              v-if="filteredList.length >= 2"
              >s</span
            >
          </span>
          <!-- En cas de recherche infructueuse -->
          <div class="search-no-result" v-if="filteredList.length == 0">
            <h2>Nous sommes, désolé ...</h2>
            <p>Aucun résultat trouvé</p>
          </div>
        </section>
  
        <!-- Affichage de l'intégralité des membres -->
        <div class="community-list">
          <div
            class="community-member"
            v-for="user in filteredList"
            :key="user.id_user"
          >
            <div class="member-pic">
              <img
                v-if="user.image"
                class="member-pic-img"
                alt="Avatar"
                :src="`http://localhost:3000/${user.image}`"
              />
              <i v-else id="member-pic-default" class="fas fa-user-circle"></i>
            </div>
            <h2 class="member-name">{{ user.nom }} {{ user.prenom }}</h2>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import HeaderWall from "../components/HeaderWall.vue";
  export default {
    name: "Community",
    components: {
      HeaderWall,
    },
    props: {
      user: Object,
    },
    data() {
      return {
        users: [],
        searchKey: "",
      };
    },
    computed: {
      // Fonction permettant de filtrer et d'affiner la recherche en fonction du nom ou du prénom de l'utilisateur recherché.
      filteredList() {
        return this.users.filter((user) => {
          return (
            user.nom.toLowerCase().includes(this.searchKey.toLowerCase()) ||
            user.prenom.toLowerCase().includes(this.searchKey.toLowerCase())
          );
        });
      },
    },
    // Récupération de la liste de membres inscrits.
    created() {
      this.token = localStorage.getItem("token");
      fetch("http://localhost:27017/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          if (res.status == 401) {
            this.$router.push({ name: "Home" });
            return;
          }
          return res.json();
        })
        .then((res) => {
          this.users = res;
        });
    },
  };
  </script>
  
  <style scoped>
  .main-community {
    background-attachment: fixed;
    background-image: url("../assets/test2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: auto;
    min-height: 100vh;
    padding: 3%;
  }
  .community-card {
    width: 30%;
    margin: auto;
    padding-top: 0.1%;
    padding-bottom: 1%;
    background: #315ef0;
    border-radius: 5px;
    box-shadow: 0 0 20px #000000b3;
    box-sizing: border-box;
  }
  .community-title {
    text-align: center;
    color: white;
  }
  .community-search {
    position: relative;
    width: 75%;
    margin: auto;
    background: white;
  }
  .community-search input {
    width: 100%;
    padding: 20px 0px 20px 10px;
    display: block;
  }
  .community-search button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 18px 10px;
    z-index: 2;
  }
  .community-search input:focus + button .fa-search {
    color: rgb(49, 94, 240);
  }
  .search-result {
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    margin-top: 2%;
    font-weight: bold;
  }
  .search-no-result {
    text-align: center;
    font-weight: bold;
  }
  .community-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: auto;
    width: 60%;
  }
  .community-member {
    display: flex;
    width: 30%;
    margin-top: 5%;
    padding: 0.5%;
    background: #f1f1f1;
    box-shadow: 0 0 20px #000000b3;
    border-radius: 5px;
    align-items: center;
  }
  .member-name {
    font-size: 1.1em;
  }
  .member-pic {
    margin-right: 5%;
  }
  .member-pic-img {
    width: 80px;
    height: 80px;
  }
  #member-pic-default {
    font-size: 50px;
    color: rgb(30, 51, 121);
  }
  /* Medium devices (tablets, 768px and up) */
  @media screen and (max-width: 1023px) {
    .community-card {
      width: 50%;
      padding-bottom: 3%;
    }
    .community-title {
      font-size: 0.9em;
    }
    .community-list {
      width: 70%;
    }
  }
  /* Small device (smartphone, to 767px max) */
  @media screen and (max-width: 767px) {
    .community-card {
      width: 80%;
      margin-top: 5%;
      margin-bottom: 5%;
    }
    .community-list {
      width: 100%;
      justify-content: space-evenly;
      font-size: 12px;
    }
    .community-member {
      width: 45%;
    }
  }
  </style>