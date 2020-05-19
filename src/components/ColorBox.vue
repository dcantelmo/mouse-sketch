<template>
    <button id="color-box" style="{background-color: color}">

    </button>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: "#ffffff"
            }
        }
    }
</script>

<style scoped>

</style>