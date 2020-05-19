<template>
    <div class="login-view">
        <form class="login-card" @submit.prevent="login">
            <h2>Login</h2>
            <input v-model="user.mail" id="mail" type="email" placeholder="Email" />
            <input v-model="user.psw" id="psw" type="password" placeholder="Password" />
            <button class="btn button" type="submit">Invio</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                mail: '',
                psw: ''
            }
        };
    },
    methods: {
        login() {
            console.log('Logging in...');
            this.$store
                .dispatch('user/login', {
                    email: this.user.mail,
                    password: this.user.psw
                })
                .then(() => {
                    this.$router.push({ name: 'Home' });
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                });
        }
    }
};
</script>

<style scoped>
.login-view {
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
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
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
}
.button {
    color: whitesmoke;
    border: 2px solid rgba(212, 212, 212, 0.6);
    margin-top: 20px;
}

.button:hover {
    background-color:rgba(200,219,253);
    color: rgb(70, 70, 70);
    border-color: rgb(200, 219, 253);
}
</style>
