<template>
    <div>
        <div class="img-wrapper">
            <img src="../assets/404.png" width="500" height="230" />
        </div>
        <div>
            <h1>Ops! Pagina non trovata</h1>
            <h3>Forse hai aperto la finestra sbagliata</h3>
            <router-link to="/">Torna alla Home</router-link>
            
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.img-wrapper {
    width: 500px;
    height: 230px;
}
img {
    width: 100%;
    height: auto;
}
div {
    text-align: center;
}
h1 {
    font-size: 48px;
    font-weight: bold;
}
h3 {
    font-size: 30px;
}
.tornaHome {
    height: 70px;
    width: 210px;
    border: solid 4px black;
    border-radius: 5px;
    background-color: rgb(18, 185, 155);
    color: black;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    font-size: 22px;
    font-family: 'Comic Sans MS';
    font-weight: bold;
}
</style>