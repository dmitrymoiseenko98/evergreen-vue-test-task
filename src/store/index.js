import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  getters: {
    users: (state) => state.users,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async getUsers(context) {
      const users = await fetch('https://reqres.in/api/users?page=1')
        .then((res) => res.json());

      context.commit('setUsers', users.data);
    },
  },
});
