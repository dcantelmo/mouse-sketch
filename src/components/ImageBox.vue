<template>
    <div class="img-wrapper">
        <span v-if="tooltip" class="tooltiptext">{{tooltip}}</span>
        <img :src="img_src" alt="">
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
    border: 3px solid rgb(200,219,253);
}

.img-wrapper {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: 200px;
    margin: 1rem;
    border-radius: 5px;
}

.img-wrapper .tooltiptext{
  opacity: 0;
  color: rgb(101, 157, 255);
  font-weight: 600;
  border: 3px solid rgb(200,219,253);
  border-bottom: none;
  border-radius: 0px 10px 0px 0px;
  padding: 5px 0;
  /* Position the tooltip */
  overflow: hidden;
  transition: .2s;
  
}

.img-wrapper:hover  .tooltiptext{
  visibility: visible;
  opacity: 1;
}
</style>