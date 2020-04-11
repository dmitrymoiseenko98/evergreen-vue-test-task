import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
      const users = await axios.get('https://reqres.in/api/users?page=1');

      const parsedUsers = users.data.data.map((user) => {
        const newObj = { ...user };

        newObj.full_name = `${newObj.first_name} ${newObj.last_name}`;

        return newObj;
      });

      context.commit('setUsers', parsedUsers);
    },
  },
});
