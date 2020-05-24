<template>
    <nav class="navbar navbar-expand-sm">
        <div class="row nav-flex">
            <div class="left">
                <router-link
                    to="/"
                    :class="this.$route.name == 'Home'? 'selected' : ''"
                    class="navbar-brand navbar-link"
                >Home</router-link>
                <router-link
                    v-if="loggedIn"
                    to="/Draw"
                    :class="this.$route.name == 'draw'? 'selected' : ''"
                    class="navbar-brand navbar-link draw-link"
                >Disegna</router-link>
                <router-link
                    v-if="loggedIn"
                    :class="this.$route.name == 'gallery'? 'selected' : ''"
                    :to="{name: 'gallery', params: {user: user.nickname}}"
                    class="navbar-brand navbar-link gallery-link"
                >Galleria</router-link>
            </div>
            <div class="img-wrapper">
                <img class="img-logo" src="../assets/scritta_w3.png" alt="">
            </div>
            <div class="right">
                <p v-if="loggedIn" class="navbar-brand welcome">Benvenuto, {{user.nickname}}</p>
                <router-link
                    v-if="loggedIn"
                    :to="{name: 'profile', params: {user: user.nickname}}"
                    :class="this.$route.name == 'profile'? 'selected' : ''"
                    class="navbar-brand navbar-link"
                >Profilo</router-link>
                <router-link
                    v-if="!loggedIn"
                    to="/login"
                    :class="this.$route.name == 'login'? 'selected' : ''"
                    class="navbar-brand navbar-link"
                >Login</router-link>
                <router-link
                    v-if="!loggedIn"
                    to="/register"
                    :class="this.$route.name == 'register'? 'selected' : ''"
                    class="navbar-brand register-btn router-link-btn"
                >Registrati</router-link>
                <button v-if="loggedIn" @click="logout" class="navbar-brand register-btn">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            ricerca: ''
        };
    },
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
.row {
    margin: 0px;
}
.welcome {
    margin: 0;
    margin-bottom: 2.5px;
    margin-right: 10px;
    color: rgba(200, 219, 253);
    font-style: italic;
}

.navbar {
    background-color: rgb(53, 66, 94);
    padding-bottom: 0;
    padding-top: 0;
    z-index: 1;
    height: 85px;
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
    height: 55px;
    color: white;
    border: 1.5px solid white;
    border-radius: 23px;
    padding: 0.4rem 1rem;
    margin-top: -5px;
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

.nav-flex {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.left {
    position: absolute;
    left: 5%;
}

.img-wrapper {
    width: 100%;
}

.img-logo {
    height: 52px;
}

.right {
    position: absolute;
    right: 5%;
}

.router-link-btn {
    padding-bottom: 0px;
    padding-top: 10px;
}

@media screen and (max-width: 1100px) {
    .welcome {
        display: none;
    }
}

@media screen and (max-width: 800px) {
    .gallery-link {
        display: none;
    }
    .draw-link {
        display: none;
    }
    .welcome {
        display: none;
    }
}
@media screen and (max-width: 800px) {
    .img-wrapper{
        display: none;
    }
    .left {
        position: initial;
    }
    .right {
        position: initial;
     

    }
}
</style>
