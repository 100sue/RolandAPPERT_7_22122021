import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Wall from '../views/Wall.vue'
import Profile from '../views/Profile.vue'
import OnePost from '../views/OnePost.vue'

const routes = [
  // Route page d'accueil
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  // Route inscription
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

  // Route wall.
  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },

  // Route profil.
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  
  // Route OnePost.
  {
    path: '/onepost/:id',
    name: 'OnePost',
    component: OnePost
  },

  // Redirection vers la page d'accueil si aucune page n'est trouvée.
  {
    path: "/:catchAll(.*)",
    redirect: { path: "/" }
  }
]

const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router
