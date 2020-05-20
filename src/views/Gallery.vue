<template>
    <div class="container-fluid main-container">
        <div class="gallery-card">
            <div class="gallery-scroll overflow-auto">
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
                <li class="menu-option">Imposta avatar</li>
                <li class="menu-option">Salva</li>
                <li class="menu-option">Modifica nome</li>
                <hr class="divider" />
                <li class="menu-option">Elimina</li>
            </ul>
        </div>
    </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import ImageBox from '@/components/ImageBox.vue';

export default {
    data() {
        return {
            urls: [],
            clicked: null
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
                    this.urls.push({
                        path: EventService.baseURL + element.path.substr(1),
                        name: element.name
                    });
                });
            })
            .catch(err => {
                console.log(err);
            });
    },
    beforeRouteLeave(to, from, next) {
        this.urls = [];
        next();
    },
    mounted() {
        //Se l'utente è il proprietario della gallery, monta il context menù per interagire con i disegni (i controlli vanno effettuati anche lato server)
        if (this.$store.state.user.user.nickname == this.$route.params['user']) {
            const menu = this.$refs['customMenu'];
            this.menuVisible = false;

            const toggleMenu = command => {
                if (command == 'none') {
                    this.clicked = null;
                }

                menu.style.display = command;
            };

            const setPosition = ({ top, left }, target) => {
                menu.style.left = `${left}px`;
                menu.style.top = `${top}px`;
                this.clicked = target.id;
                toggleMenu('block');
            };

            window.addEventListener('wheel', e => {
                if (e.target.className !== 'menu-option') toggleMenu('none');
            });

            window.addEventListener('click', e => {
                toggleMenu('none');
            });

            window.addEventListener('contextmenu', e => {
                e.preventDefault();
                const origin = {
                    left: e.pageX,
                    top: e.pageY
                };
                if (e.target.className === 'image')
                    setPosition(origin, e.target.parentNode);
                else toggleMenu('none');
                return false;
            });
        }
    },
    methods: {
        save() {
            if(this.clicked){
                urls
            }
        }
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
    background-color: rgba(255, 255, 255, 0.9);
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