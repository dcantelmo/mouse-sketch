<template>
    <div id="app">
        <NavBar />
        <!-- La NavBar resta fissa sulla pagina -->
        <NotificationContainer class="notification-box" />
        <!-- La barra delle notifiche rimane invisibile senza notifiche -->
        <transition name="slide-fade" mode="out-in">
            <router-view :key="$route.fullPath" />
            <!-- Qui viene renderizzato il corpo delle pagine-->
        </transition>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';
export default {
    components: {
        NavBar,
        NotificationContainer
    }
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

body {
    background: url('./assets/sfondo.jpg');
}

#app {
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

.slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.2s ease;
}

.slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
}

.notification-box {
    position: fixed;
    left: 5%;
    z-index: 10;
}
</style>
