<template>
    <div id="app">
        <NavBar />
        <router-view />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    components: {
        NavBar
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

</style>
