<template>
    <div class="page">
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
                </div>
            </div>
            <div class="col-7 right-container">
                <div class="row form-wrapper">
                    <form @submit.prevent="searchProfile">
                        <input type="text" v-model="ricerca" placeholder="Ricerca un utente..." />
                        <button class="search-btn">
                            <svg
                                class="bi bi-search"
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
                <div class="row option-container">
                    <router-link
                        :to="{name: 'gallery', params: {user: this.$route.params.user}}"
                        class="navbar-brand navbar-link"
                    >
                        <div class="option">Galleria</div>
                    </router-link>
                    <router-link to="/draw" class="navbar-brand navbar-link">
                        <div class="option">Disegna</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EventService from '@/services/EventService.js';

export default {
    props: {
        localUser: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            ricerca: ''
        };
    },
    created() {
        console.log(this.$route.params.user);
    },
    beforeRouteUpdate(routeTo, routeFrom, next) {
        //Richiesta AJAX
        EventService.getUserProfile(routeTo.params.user)
            .then(({ data }) => {
                routeTo.params.localUser = data;
                next();
            })
            .catch(error => {
                if (error.response && error.response.status == 404) {
                    next({ name: '404' });
                }
            });
    },
    computed: {
        ...mapState(['user']),
        av_url() {
            console.log(this.localUser);
            return EventService.baseURL + this.localUser.avatar.substr(1);
        }
    },
    methods: {
        searchProfile() {
            if (this.ricerca)
                this.$router.push({
                    name: 'profile',
                    params: { user: this.ricerca }
                }); //Vai al profilo col parametro specificato
        }
    }
};
</script>

<style scoped>
.row {
    margin: 0;
}

.page {
    height: calc(95vh - 85px);
    display: flex;
    padding-top: 5%;
    padding-bottom: 5%;
    align-items: center;
    justify-content: center;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

p {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
}

a {
    margin: 0;
}

.card-container {
    width: 60%;
    background-color: white;
    -webkit-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: width 0.75s ease-in;
}

.profile-container {
    height: 100%;
    border-right: dotted 8px rgb(200, 219, 253);
    padding: 0;
}

.profile-picture {
    padding-top: 5%;
    padding-bottom: 5%;
    border-bottom: solid rgb(200, 219, 253) 2px;
}

.img-wrapper {
    width: 70%;
    margin: auto;
    padding: 3px;
    background-color: white;
    border: solid rgb(200, 219, 253) 3px;
    border-radius: 50%;
}

.profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(53, 66, 94, 0.75);
}

.nick-box {
    width: 80%;
    height: auto;
    margin: 5%;
    padding: 10%;
    border: solid rgb(200, 219, 253) 3px;
    font-size: 3vw;
    font-weight: 500;
}
.nick-box > p {
    margin: 0;
}
.right-container {
    display: flex;
    flex-direction: column;
}

.form-wrapper {
    display: flex;
    padding: 0.5rem;
    padding-top: 1rem;
    align-items: flex-end;
    justify-content: flex-end;
}

input {
    color: rgb(50, 89, 158);
    caret-color: rgb(59, 130, 253);
    font-weight: 500;
    font-size: 20px;
    border: none;
    background-color: transparent;
    border-bottom: rgb(200, 219, 253) solid 2px;
    outline: none;
    transition: 0.25s ease-in;
    padding: 0.5rem 0 0.3rem 0.6rem;
}

input:focus {
    background-color: rgb(195, 217, 255);
    border-radius: 20px;
    border-color: transparent;
}

input::selection {
    background: rgb(255, 255, 255);
}

.search-btn {
    background: transparent;
    outline: none;
    border: none;
}

.bi-search {
    margin-bottom: 5px;
}

.option-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-grow: 2;
}

.option {
    width: 100%;
    text-align: center;
    color: rgba(53, 66, 94, 0.75);
    background-color: rgba(255, 255, 255, 0.75);
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

@media screen and (max-width: 950px) {
    .card-container {
        width: 80%;
    }
    input {
        width: 80%;
        font-size: 15px;
    }
    .bi-search {
        width: 1rem;
        height: 1rem;
    }
}
</style>