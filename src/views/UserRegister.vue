<template>
    <div class="register-view">
        <div class="register-card">
            <form class="form" @submit.prevent="register">
                <h2>Register</h2>
                <input
                    required
                    @input="clearErr"
                    v-model="user.name"
                    id="name"
                    type="text"
                    placeholder="Nome"
                    autocomplete="none"
                />
                <input
                    required
                    @input="clearErr"
                    v-model="user.mail"
                    id="mail"
                    type="email"
                    placeholder="Email"
                />
                <input
                    required
                    @input="clearErr"
                    v-model="user.psw"
                    id="psw"
                    type="password"
                    placeholder="Password"
                />
                <p v-if="error" class="error-container">{{error}}</p>
                <button class="btn button" type="submit">Invio</button>
            </form>
            <router-link class="go-to" :to="{name: 'login'}">Hai già un account? Effettua l'accesso</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                mail: '',
                psw: ''
            },
            error: ''
        };
    },
    methods: {
        register() {
            console.log('registrazione...');
            this.$store
                .dispatch('user/register', {
                    name: this.user.name,
                    email: this.user.mail,
                    password: this.user.psw
                })
                .then(() => {
                    this.$router.push({ name: 'Home' });
                })
                .catch(err => {
                    this.error = err.response.data
                    console.log(this.errors);
                    const notification = {
                        type: 'error',
                        message:
                            'Problema con la registrazione '
                    };
                    this.$store.dispatch('notification/add', notification, {
                        root: true
                    });
                    if (!err.response) {
                        this.$router.push({ name: 'network-issue' });
                    }
                });
        },
        clearErr() {
            if (this.error) 
                this.error = '';
        },
        createFreshObject() {
            this.user.name = '';
            this.user.psw = '';
            this.user.mail = '';
        }
    }
};
</script>

<style scoped>
.register-view {
    height: calc(95vh - 85px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-view .register-card {
    max-width: 320px;
    width: 90%;
    background-color: rgba(53, 66, 94, 0.95);
    padding: 40px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}

input {
    margin-top: 20px;
    padding: 4px 4px 4px 8px;
    color: whitesmoke;
    background-color: transparent;
    border: none;
    border-bottom: 3px solid rgba(212, 212, 212, 0.6);
    border-radius: 2px 2px 2px 2px;
    outline: none;
}

.error-container {
    color: rgb(211, 116, 116);
    margin-bottom: 0;
    margin: .5em;
}

.button {
    color: whitesmoke;
    border: 2px solid rgba(212, 212, 212, 0.6);
    margin-top: 20px;
}
.button:hover {
    background-color: rgba(200, 219, 253);
    color: rgb(70, 70, 70);
    border-color: rgb(200, 219, 253);
}
.form {
    margin-bottom: 15px;
}
.go-to {
    color: rgba(200, 219, 253);
    font-size: 14px;
}

.go-to:hover {
    color: rgb(106, 160, 255);
    text-decoration: none;
}
</style>
