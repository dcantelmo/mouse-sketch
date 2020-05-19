<template>
    <div class="container-fluid" style="padding: 0px">
        <section class="top-container container-fluid" style="padding: 0px">
            <div class="img-wrapper">
                <img src="../assets/ORFF4C0.jpg" alt="">
            </div>
        </section>
        <section class="container-fluid features-container">
            <div class="row features-row">
                <div class="col margin-bottom">
                    <div class="card-box">
                        <h4>Single Page Application</h4>
                        <p>Una single page application <b>(SPA)</b>, è un'applicazione web che interagisce con il browser e <b>renderizza</b> dinamicamente
                            le pagine web con eventuali nuovi dati forniti dal web server, a differenza del metodo standard che prevede il caricamento
                            di una nuova pagina web, garantendo traniszioni piu' <b>veloci</b> durante la navigazione e l'utilizzo del sito
                        </p>
                    </div>
                </div>
                <div class="col margin-bottom">
                    <div class="card-box">
                        <h4>Disegna su una "tela"</h4>
                        <p>La funzione principale di questa applicazione è il disegno libero sul tag <b>Canvas</b> di HTML. E' basata sulla gestione degli eventi
                        in javascript e il rendering di piccole linee seguendo il movimento del mouse sulla tela, inoltre utilizza la componentistica di <b>VueJS</b> per
                        lo storage delle informazioni relative alla grandezza del tratto da disegnare, il colore e i tratti disegnati sulla tela</p>
                    </div>
                </div>
                <div class="col margin-bottom">
                    <div class="card-box">
                        <h4>Salva i tuoi disegni</h4>
                        <p>Dopo aver effettuato la <b>registrazione</b>, è possibile salvare nel profilo i propri disegni, attribuire loro un nome, e metterli in mostra nella
                        propria bacheca per condividerli con le altre persone. Per implementare questa funzionalità, è stato utilizzato un server basato su Node (ExpressJS) ed
                        database relazionale <b>SQLite</b></p>
                    </div>
                </div>
            </div>
        </section>
        <section class="footer">
            <h4>Lavori in corso...</h4>
        </section>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.img-wrapper{
    display: flex;
    height: 500px;
    justify-content: center;
    align-items: center;
    padding: 0%;
}

img {
    position: relative;
    width: 100%; 
    height: 100%;
    object-fit: cover;
    object-position: center center;
}

.features-container  {
    background-color: lightgray;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.card-box{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem 1rem;
    background-color: white;
    -webkit-box-shadow: 4px 4px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 4px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.75);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    height: 100%;
    min-width: 250px;
}

.card-box > p {
    font-size: 18px;
}
.margin-bottom {
    margin-bottom: 1rem;
}
.features-row {
    margin-left: 10%;
    margin-right: 10%;
}

.footer{
    color: lightgray;
    background-color: rgb(61, 61, 61);
    padding-top: 2rem;
    padding-bottom: 2rem;
}
</style>