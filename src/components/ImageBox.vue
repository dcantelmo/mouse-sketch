<template>
    <div class="img-wrapper">
        <img class="image" :src="img_src" alt="">
        <span v-if="tooltip" class="tooltiptext" spellcheck="false">{{tooltip}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            img_src: String,
            tooltip: {
                required: false,
                default: ''
            }
        }
    }
</script>

<style scoped>
img {
    width: auto;
    height: 200px;
    border: 3px solid rgb(133, 164, 190);
}

.img-wrapper {
    display: flex;
    flex-direction: column;
    width: 230px;
    height: 264px;
    margin: 1rem;
    border: 15px solid white;
    border-radius: 5px;
    z-index: 1;
    -webkit-box-shadow: 4px 4px 3px 0px rgba(0,0,0,0.4);
    -moz-box-shadow: 4px 4px 3px 0px rgba(0,0,0,0.4);
    box-shadow: 4px 4px 3px 0px rgba(0,0,0,0.4);
}

.img-wrapper .tooltiptext{
  opacity: 1;
  color: rgb(133, 164, 190);
  font-weight: 600;
  background-color: white;
  border-top: none;
  padding: 5px 0;
  /* Position the tooltip */
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltiptext:focus {
    outline: none;
    background-color: rgb(205, 240, 248);
}


</style>