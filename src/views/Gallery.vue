<template>
    <div ref="page" class="container-fluid main-container">
        <div class="gallery-card">
            <div class="gallery-scroll overflow-auto">
                <h1 v-if="urls == ''">La galleria è vuota! Comincia a disegnare :)</h1>
                <ImageBox
                    :id="image.name"
                    :class="clicked == image.name ? 'active': ''"
                    class="imageBox"
                    v-for="image in urls"
                    :img_src="image.path"
                    :key="image.name"
                    :tooltip="image.name"
                />
            </div>
        </div>
        <div class="menu" ref="customMenu">
            <ul class="menu-options">
                <li @click="setAvatar" class="menu-option">Imposta avatar</li>
                <li class="menu-option">Salva</li>
                <li @click="rename" class="menu-option">Modifica nome</li>
                <hr class="divider" />
                <li @click="removeImg" class="menu-option">Elimina</li>
            </ul>
        </div>
    </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import ImageBox from '@/components/ImageBox.vue';

export default {
    props: {
        response: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            urls: [],
            clicked: null,
            selectedTooltip: null,
            lastClicked: null,
            lastTooltip: null
        };
    },
    components: {
        ImageBox
    },
    created() {
        this.urls = [];
        this.response.data.forEach(element => {
            this.urls.push({
                path: EventService.baseURL + element.path.substr(1),
                name: element.name
            });
        });
    },
    beforeRouteUpdate(routeTo, routeFrom, next) {
            EventService.getImagesURL(routeTo.params.user)
                .then(response => {
                    console.log(response);
                    routeTo.params.response = response;
                    next();
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 404) next({ name: '404' });
                    } else next({ name: 'network-issue' });
                });
    },
    mounted() {
        //Se l'utente è il proprietario della gallery, monta il context menù per interagire con i disegni (i controlli vanno effettuati anche lato server)
        if (
            this.$store.state.user.user.nickname == this.$route.params['user']
        ) {
            const page = this.$refs['page'];
            const menu = this.$refs['customMenu'];
            this.menuVisible = false;

            const toggleMenu = command => {
                if (command == 'none') {
                    this.clicked = null;
                    this.selectedTooltip = null;
                }

                menu.style.display = command;
            };

            const setPosition = ({ top, left }, target) => {
                menu.style.left = `${left}px`;
                menu.style.top = `${top}px`;
                this.lastClicked = this.clicked = target.id;
                this.lastTooltip = this.selectedTooltip = target.childNodes[1];
                toggleMenu('block');
            };

            page.addEventListener('wheel', e => {
                if (e.target.className !== 'menu-option') toggleMenu('none');
            });

            page.addEventListener('click', e => {
                toggleMenu('none');
            });

            page.addEventListener('contextmenu', e => {
                e.preventDefault();
                const origin = {
                    left: e.pageX,
                    top: e.pageY
                };
                if (e.target.parentNode.className.includes('imageBox'))
                    setPosition(origin, e.target.parentNode);
                else toggleMenu('none');
                return false;
            });
        }
    },
    methods: {
        rename() {
            this.lastTooltip.addEventListener('blur', event => {
                event.target.contentEditable = 'false';
                let data = {
                    mode: 'RENAME',
                    oldTitle: this.lastClicked,
                    newTitle: event.target.textContent
                };
                EventService.galleryOptions(
                    data,
                    this.$store.state.user.user.nickname
                )
                    .then(() => {
                        location.reload();
                    })
                    .catch(err => {
                        console.log(err.response.data);
                        event.target.textContent = data.oldTitle;
                        location.reload();
                    });
            });
            this.lastTooltip.addEventListener('keydown', event => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    event.target.blur();
                }
            });
            this.lastTooltip.contentEditable = 'true';
            this.lastTooltip.focus();
            console.log('rinominazione in corso');
        },
        removeImg() {
            let data = {
                mode: 'DELETE',
                title: this.lastClicked,
                author: this.$route.params.user
            };
            EventService.galleryOptions(data, this.$route.params.user)
                .then(() => {
                    console.log('rimosso');
                    this.lastClicked = null;
                    this.lastTooltip = null;
                    for (let i = 0; i < this.urls.length; i++) {
                        if (this.urls[i].name == data.title)
                            this.urls.splice(i, 1);
                    }
                })
                .catch(err => {
                    console.log('megaerrore');
                });
        },
        setAvatar() {
            let data = {
                mode: 'SET_AVATAR',
                title: this.lastClicked,
                author: this.$route.params.user
            };
            EventService.galleryOptions(data, this.$route.params.user)
                .then(response => {
                    const notification = {
                        type: 'success',
                        message: response.data
                    };
                    this.$store.dispatch('notification/add', notification, {
                        root: true
                    });
                })
                .catch(err => {
                    const notification = {
                        type: 'error',
                        message: 'Cambio di avatar non riuscito'
                    };
                    console.log(err);
                    this.$store.dispatch('notification/add', notification, {
                        root: true
                    });
                });
        }
        //AUXILIARY ONLY
    }
};
</script>

<style scoped>
h1 {
    font-size: 45px;
    color: rgba(36, 98, 190, 0.356);
    font-weight: 700;
}

.main-container {
    padding: 2rem;
    height: calc(100vh - 85px);
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-card {
    background-color: rgba(255, 255, 255, 0.9);
    width: 60%;
    height: 90%;
    min-width: 300px;
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

.imageBox {
    transition: 0.25s;
}

.imageBox:hover {
    -webkit-box-shadow: 12px 12px 9px 0px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 12px 12px 9px 0px rgba(0, 0, 0, 0.4);
    box-shadow: 12px 12px 9px 0px rgba(0, 0, 0, 0.4);
    transform: scale(1.05, 1.05);
}
.imageBox.active {
    -webkit-box-shadow: 12px 12px 9px 0px rgba(36, 98, 190, 0.548);
    -moz-box-shadow: 12px 12px 9px 0px rgba(36, 98, 190, 0.548);
    box-shadow: 12px 12px 9px 0px rgba(36, 98, 190, 0.548);
    transform: scale(1.05, 1.05);
}

.menu {
    width: fit-content;
    box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    position: fixed;
    text-align: left;
    display: none;
    z-index: 100;
    background-color: white;
    border: 1px solid cornflowerblue;
}
.menu-options {
    list-style: none;
    padding: 0px 0px;
    margin-bottom: 0;
}
.menu-option {
    font-weight: 500;
    font-size: 14px;
    color: cornflowerblue;
    padding: 5px 10px;
    cursor: pointer;
}
.menu-option:first-child {
    border-radius: 5px 5px 0 0;
}
.menu-option:last-child {
    border-radius: 0 0 5px 5px;
}
.menu-option:hover {
    background: rgba(117, 223, 255, 0.2);
}
.divider {
    margin: 0;
    border-color: cornflowerblue;
}
</style>