<template>
    <div v-if="!isLoading" class="page">
        <div class="row card-container">
            <div class="col-5 profile-container">
                <div class="profile-picture">
                    <div class="img-wrapper">
                        <img :src="av_url" alt="immagine del profilo" />
                    </div>
                </div>
                <div class="profile-info">
                    <div class="nick-box">
                        <p>{{localUser.nickname}}</p>
                    </div>
                    <div class="draw-box">
                        <p>Numero disegni: {{localUser.drawings}}</p>
                    </div>
                </div>
            </div>
            <div class="col-7 option-container">
                    <router-link :to="{name: 'gallery', params: {user: this.$route.params.user}}" class="navbar-brand navbar-link">
                    <div class="option">Galleria</div>
                </router-link>
                <router-link to="/draw" class="navbar-brand navbar-link">
                    <div class="option">Disegna</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EventService from '@/services/EventService.js';

export default {
    data() {
        return {
            localUser: null,
            isLoading: true
        };
    },
    created() {
        console.log(this.$route.params.user);
        EventService.getUserProfile(this.$route.params.user).then(({ data }) => {
            this.localUser = data;
            this.isLoading = false;
        });
    },
    computed: {
        ...mapState(['user']),
        av_url() {
            return EventService.baseURL + this.localUser.avatar.substr(1)
        }
    }
};
</script>

<style scoped>
.row {
    margin: 0;
}

.page {
    height: calc(100vh - 85px);
    display: flex;
    padding-top: 2rem;
    padding-bottom: 2rem;
}

img {
    width: 100%;
    height: 100%;
}

p {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
}

a {
    margin: 0;
}

.card-container {
    height: auto;
    width: 90%;
    background-color: white;
    margin: auto auto;
    -webkit-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.profile-container {
    border-right: dotted 8px rgb(200,219,253);
    padding: 0;
}

.profile-picture {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: lightgray 1px solid;
}

.img-wrapper {
    width: 70%;
    height: auto;
    margin: auto;
    padding: 8px;
    background-color: white;
    border: solid lightgray 1px;
    border-radius: 50%;
}

.profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    color: rgba(53, 66, 94, 0.75);
}

.option-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.option {
    width: 100%;
    text-align: center;
    color: rgba(53, 66, 94, 0.75);
    background-color:  rgba(255, 255, 255, 0.75);
    padding-left: 1rem;
    font-weight: 600;
    font-size: 5vw;
    -webkit-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    transition: 0.25s;
}

.option:hover {
    -webkit-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 9px 9px 5px 0px rgba(0, 0, 0, 0.2);
    padding-left: 3rem;
    font-size: 6vw;
}
</style>