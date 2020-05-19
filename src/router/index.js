import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Draw from "../views/Draw.vue";
import UserRegister from "../views/UserRegister.vue";
import UserLogin from '../views/UserLogin.vue';
import Profile from "../views/Profile.vue";
import Gallery from "../views/Gallery.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/draw',
        name: 'draw',
        component: Draw,
        meta: { requiresAuth: true}
    },
    {
        path: '/register',
        name: 'register',
        component: UserRegister
    },
    {
        path: '/login',
        name: 'login',
        component: UserLogin
    },
    {
        path: '/profile/:user',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true}
    },
    {
        path: '/profile/:user/gallery',
        name: 'gallery',
        component: Gallery,
        meta: { requiresAuth: true }
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/')
    }
    next()
})

export default router;
