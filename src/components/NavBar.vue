<template>
    <nav class="navbar navbar-expand-sm">
        <router-link to="/" :class="this.$route.name == 'Home'? 'selected' : ''" class="navbar-brand navbar-link">Home</router-link>
        <router-link v-if="!loggedIn" to="/login" :class="this.$route.name == 'login'? 'selected' : ''" class="navbar-brand navbar-link">Login</router-link>
        <router-link v-if="!loggedIn" to="/register" :class="this.$route.name == 'register'? 'selected' : ''" class="navbar-brand register-btn">Registrati</router-link>
        <router-link v-if="loggedIn" to="/Draw" :class="this.$route.name == 'draw'? 'selected' : ''" class="navbar-brand navbar-link">Disegna</router-link>
        <router-link
            v-if="loggedIn"
            :class="this.$route.name == 'gallery'? 'selected' : ''"
            :to="{name: 'gallery', params: {user: user.nickname}}"
            class="navbar-brand navbar-link"
        >Galleria</router-link>

        <p v-if="loggedIn" class="navbar-brand welcome">Benvenuto, {{user.nickname}}</p>

        <router-link
            v-if="loggedIn"
            :to="{name: 'profile', params: {user: user.nickname}}"
            :class="this.$route.name == 'profile'? 'selected' : ''"
            class="navbar-brand navbar-link"
        >Profilo</router-link>
        <button v-if="loggedIn" @click="logout" class="navbar-brand register-btn">Logout</button>
    </nav>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return this.$store.getters['user/loggedIn'];
        },
        user() {
            return this.$store.state.user.user;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        }
    }
};
</script>

<style scoped>
.welcome {
    margin: 0;
    margin-bottom: 2.5px;
    margin-right: 10px;
    color: rgba(200, 219, 253);
    font-style: italic;
}

.navbar {
    background-color: rgb(53, 66, 94);
    justify-content: left;
}

.navbar-link {
    display: inline-block;
    font-weight: 700;
    color: white;
}

.navbar-link:after {
    display: block;
    content: '';
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 0% 50%;
}

.navbar-link:hover:after {
    transform: scaleX(1.025);
}

.selected.navbar-link:after {
    transform: scaleX(1.025);
    border-color: rgb(200, 219, 253);
}

.register-btn {
    background-color: rgb(53, 66, 94);
    display: inline-block;
    font-weight: 700;
    color: white;
    border: 1.5px solid white;
    border-radius: 23px;
    padding: 0.4rem 1rem;
    transition: 0.25s;
}

.register-btn:hover {
    background-color: rgb(200, 219, 253);
    color: rgb(53, 66, 94);
    border-color: rgb(200, 219, 253);
}

.selected.register-btn {
    background-color: rgb(200, 219, 253);
    color: rgb(53, 66, 94);
    border-color: rgb(200, 219, 253);
}
</style>
