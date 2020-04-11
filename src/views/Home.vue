<template>
  <div class="home-page">
    <div class="users-wrap">
      <form class="users-filter">
        <div class="users-filter__item users-filter__search">
          <label>Search by name:</label>
          <input type="text" v-model="searchName">
        </div>
      </form>
      <ul class="users-list">
        <li class="user" v-for="user in filteredUsers" :key="user.id">
          <img class="user__avatar" :src="user.avatar" alt="avatar">
          <p class="user__name">{{user.first_name}} {{user.last_name}}</p>
          <p class="user__email">{{user.email}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchName: '',
    };
  },
  computed: {
    ...mapGetters(['users']),
    filteredUsers() {
      return this.users.filter((user) => user.full_name.toLowerCase()
        .includes(this.searchName));
    },
  },
  methods: mapActions(['getUsers']),
  mounted() {
    this.getUsers();
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.home-page {
  padding-bottom: 80px;
}

.users-wrap {
  max-width: 1000px;
  margin: auto;
  padding: 0 20px;
}

.users-filter__item label {
  margin-right: 8px;
}

.users-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0 0;
  padding: 0;
  list-style-type: none;
}

.user {
  width: 300px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.user__avatar {
  border-radius: 100%;
}

.user__name,
.user__email {
  margin: 15px 0 0;
}
</style>
