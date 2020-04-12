<template>
  <div class="user-page">
    <div class="user" v-if="user">
      <img class="user__avatar" :src="user.avatar" alt="avatar">
      <h2 class="user__name">{{user.full_name}}</h2>
      <p class="user__email">{{user.email}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'User',
  computed: {
    user() {
      return this.$store.getters.user(parseInt(this.$route.params.id, 10));
    },
  },
  methods: {
    ...mapActions(['getUsers']),
  },
  async mounted() {
    await this.getUsers();

    if (!this.user) {
      this.$router.replace('/404');
    }
  },
};
</script>

<style>
.user__avatar {
  border-radius: 100%;
}
</style>
