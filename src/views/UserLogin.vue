<template>
    <div class="login-view">
        <div class="login-card">
            <form class="form" @submit.prevent="login">
                <h2>Login</h2>
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
                <button ref="loginBtn" class="btn button" type="submit">Invio</button>
            </form>
            <router-link
                class="go-to"
                :to="{name: 'register'}"
            >Non sei registrato? Iscriviti adesso!</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                mail: '',
                psw: ''
            },
            error: ''
        };
    },
    methods: {
        login() {
            this.$refs['loginBtn'].disabled = true;
            console.log('Logging in...');
            this.$store
                .dispatch('user/login', {
                    email: this.user.mail,
                    password: this.user.psw
                })
                .then(() => {
                    this.$refs['loginBtn'].disabled = false;
                    this.$router.push({ name: 'Home' });
                })
                .catch(err => {
                    this.$refs['loginBtn'].disabled = false;
                    const notification = {
                        type: 'error',
                        message: 'Problema con il login'
                    };
                    this.$store.dispatch('notification/add', notification, {
                        root: true
                    });
                    if (!err.response) {
                        this.$router.push({ name: 'network-issue' });
                    } else this.error = err.response.data.err; //Visualizza l'errore sul login card
                });
        },
        clearErr() {
            if (this.error) this.error = '';
        },
        createFreshObject() {
            this.user.psw = '';
            this.user.mail = '';
        }
    }
};
</script>

<style scoped>
.login-view {
    height: calc(95vh - 85px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-view .login-card {
    max-width: 320px;
    width: 90%;
    background-color: rgba(53, 66, 94, 0.95);
    padding: 40px;
    border-radius: 4px;
    color: #fff;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}

input {
    margin-top: 20px;
    padding: 4px 4px 4px 8px;
    color: whitesmoke;
    background-color: transparent;
    border: none;
    border-bottom: 2.5px solid rgba(212, 212, 212, 0.6);
    border-radius: 2px 2px 2px 2px;
    outline: none;
}

.error-container {
    color: rgb(211, 116, 116);
    margin-bottom: 0;
    margin: 0.5em;
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

.button:disabled {
    cursor: wait;
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
