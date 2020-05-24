<template>
    <div class="page">
        <div class="img-wrapper">
            <img src="../assets/Error.png" />
        </div>
        <div>
            <h1>Ops! Nessuna connessione</h1>
            <h3>Connetti il dispositivo ad internet e riprova</h3>
        </div>
        <router-link to="/" class="home">Home</router-link>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.page {
    height: calc(100vh - 85px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Comic Sans MS';
}
.img-wrapper {
    width: 500px;
    height: 160px;
    margin: 0px;
}
img div {
    text-align: center;
}
img {
    width: 100%;
    height: auto;
}
h1 {
    font-size: 48px;
    font-weight: bold;
}
h3 {
    font-size: 30px;
}
.home {
    padding: 0.2rem 0.6rem 0.3rem 0.6rem;
    border: solid 3px black;
    border-radius: 5px;
    background-color: rgb(71, 156, 236);
    color: black;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    font-size: 25px;
    font-weight: bold;
}

a {
    text-decoration: none;
    margin: .5rem;
    padding: 0.2rem 0.6rem 0.3rem 0.6rem;
    border: solid 3px black;
    border-radius: 5px;
    background-color: rgb(71, 156, 236);
    color: black;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    font-size: 25px;
    font-weight: bold;
}
</style>