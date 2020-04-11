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

      const parsedUsers = users.data.map((user) => {
        const newObj = { ...user };

        newObj.full_name = `${newObj.first_name} ${newObj.last_name}`;

        return newObj;
      });

      context.commit('setUsers', parsedUsers);
    },
  },
});
