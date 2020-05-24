import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Draw from '../views/Draw.vue';
import UserRegister from '../views/UserRegister.vue';
import UserLogin from '../views/UserLogin.vue';
import Profile from '../views/Profile.vue';
import Gallery from '../views/Gallery.vue';
import NotFound from '../views/NotFound.vue';
import NetworkIssue from '../views/NetworkIssue.vue';
import EventService from '@/services/EventService.js';

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
        meta: { requiresAuth: true }
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
        meta: { requiresAuth: true },
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            EventService.getUserProfile(routeTo.params.user)
                .then(({ data }) => {
                    routeTo.params.localUser = data;
                    next();
                })
                .catch(error => {
                    if (error.response && error.response.status == 404) {
                        next({ name: '404' });
                    }
                });
        }
    },
    {
        path: '/profile/:user/gallery',
        name: 'gallery',
        component: Gallery,
        meta: { requiresAuth: true },
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            EventService.getImagesURL(routeTo.params.user)
                .then(response => {
                    console.log(response);
                    routeTo.params.response = response;
                    next();
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 404) next({ name: '404' });
                    } else next({ name: 'network-issue' });
                });
        }
    },
    {
        path: '/404',
        name: '404',
        component: NotFound
    },
    {
        path: '/network-issue',
        name: 'network-issue',
        component: NetworkIssue
    },
    {
        path: '*',
        redirect: { name: 404 }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/');
    }
    next();
});


export default router;
