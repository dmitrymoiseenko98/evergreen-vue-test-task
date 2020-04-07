<template>
  <div class="home">
    <div class="users">
      <div class="user" v-for="user in users" :key="user.id">
        <img class="user__avatar" :src="user.avatar" alt="avatar">
        <p class="user__name">{{user.first_name}} {{user.last_name}}</p>
        <p class="user__email">{{user.email}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: mapGetters(['users']),
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

.users {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 960px;
  margin: auto;
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
