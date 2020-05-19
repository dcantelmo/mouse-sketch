<template>
    <div class="container-fluid main-container">
        <div class="gallery-card">
            <div class="gallery-scroll overflow-auto">
                <ImageBox v-for="image in urls" :img_src="image.path" :key="image" :tooltip="image.name"/>
            </div>
        </div>
    </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import ImageBox from '@/components/ImageBox.vue';

export default {
    data() {
        return {
            urls: []
        };
    },
    components: {
        ImageBox
    },
    created() {
        EventService.getImagesURL(this.$route.params['user'])
            .then(response => {
                this.urls = [];
                response.data.forEach(element => {
                    this.urls.push({path: EventService.baseURL + element.path.substr(1), name: element.name});
                    console.log(this.urls)
                });
            })
            .catch(err => {
                console.log(err);
            });
    },
    beforeRouteLeave(to, from, next) {
        this.urls = [];
        next();
    }
};
</script>

<style scoped>
.main-container {
    padding: 2rem;
    height: calc(100vh - 85px);
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-card {
    background-color: rgba(255, 255, 255, 0.8);
    width: 60%;
    height: 90%;
    min-width: 240px;
    padding: 1rem;
    -webkit-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.gallery-scroll {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    height: 100%;
    -webkit-box-shadow: inset 4px 4px 5px 0px rgba(0, 0, 0, 0.71);
    -moz-box-shadow: inset 4px 4px 5px 0px rgba(0, 0, 0, 0.71);
    box-shadow: inset 3px 0px 5px 0px rgba(0, 0, 0, 0.25);
}

</style>