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
      const urlBase = 'https://reqres.in/api/users?page=';
      const firstPageRes = await axios.get(`${urlBase}1`);
      const otherPagesPromises = [];

      for (let i = 2; i <= firstPageRes.data.total_pages; i += 1) {
        otherPagesPromises.push(axios.get(`${urlBase}${i}`));
      }

      let allUsers = [...firstPageRes.data.data];

      await axios.all(otherPagesPromises).then(axios.spread((...responses) => {
        responses.forEach((item) => {
          allUsers = [...allUsers, ...item.data.data];
        });
      })).catch((err) => {
        throw new Error(err);
      });

      const parsedUsers = allUsers.map((user) => {
        const newObj = { ...user };

        newObj.full_name = `${newObj.first_name} ${newObj.last_name}`;

        return newObj;
      });

      context.commit('setUsers', parsedUsers);
    },
  },
});
