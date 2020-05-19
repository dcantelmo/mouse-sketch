import EventService from '@/services/EventService.js';
export const namespaced = true;

export const state = {
    user: null
};

export const mutations = {
    SET_USER_DATA(state, userData) {
        state.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        EventService.methods.setToken(userData.token);
    },
    CLEAR_USER_DATA() {
        localStorage.removeItem('user');
        location.reload();
    }
};

export const actions = {
    register({ commit }, credentials) {
        return EventService.register(credentials).then(({ data }) => {
            commit('SET_USER_DATA', data);
        });
    },
    login({ commit }, credentials) {
        return EventService.login(credentials).then(({ data }) => {
            commit('SET_USER_DATA', data);
        });
    },
    logout({ commit }) {
        commit('CLEAR_USER_DATA');
    }
};

export const getters = {
    loggedIn(state) {
        return !!state.user;
    }
};
