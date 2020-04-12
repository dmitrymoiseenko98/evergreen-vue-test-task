<template>
  <div class="home-page">
    <div class="users-wrap">
      <form class="users-filter">
        <div class="users-filter__item users-filter__search">
          <label>Search by name:</label>
          <input type="text" v-model="searchName">
        </div>
        <div class="users-filter__item users-filter__amount-per-page">
          <label>Display per page:</label>
          <select
            @change="goToPage(1)"
            v-model="usersPerPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </form>
      <ul class="users-list">
        <li class="user-card" v-for="user in userPages[page - 1]" :key="user.id">
          <router-link :to="{ name: 'User', params: { id: user.id }}" class="user-card__link">
            <img class="user-card__avatar" :src="user.avatar" alt="avatar">
            <p class="user-card__name">{{user.full_name}}</p>
            <p class="user-card__email">{{user.email}}</p>
          </router-link>
        </li>
      </ul>
      <div
        class="users-pagination"
        v-if="userPages.length > 1"
      >
        <button
          class="users-pagination__prev users-pagination__btn"
          :disabled="page === 1"
          @click="goToPage(page - 1)"
        >
          <span>Prev</span>
        </button>
        <div class="users-pagination__pages">
          <button
            type="button"
            class="users-pagination__pages__page users-pagination__btn"
            :key="index"
            :disabled="page === index + 1"
            @click="goToPage(index + 1)"
            v-for="(pageUsers, index) in userPages"
          >
            <span>{{index + 1}}</span>
          </button>
        </div>
        <button
          class="users-pagination__next users-pagination__btn"
          :disabled="page === userPages.length"
          @click="goToPage(page + 1)"
        >
          <span>Next</span>
        </button>
      </div>
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
      usersPerPage: 5,
      page: 1,
    };
  },
  computed: {
    ...mapGetters(['users']),
    filteredUsers() {
      return this.users.filter((user) => user.full_name.toLowerCase()
        .includes(this.searchName));
    },
    userPages() {
      let res = [];
      const usersPerPage = parseInt(this.usersPerPage, 10);

      for (let from = 0; from < this.filteredUsers.length; from += usersPerPage) {
        res = [...res, this.filteredUsers.slice(from, from + usersPerPage)];
      }

      return res;
    },
  },
  methods: {
    ...mapActions(['getUsers']),
    goToPage(page) {
      this.page = page;
    },
  },
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

.users-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.users-filter__item {
  margin: 10px 20px;
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

.user-card {
  width: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.user-card__link {
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-decoration: none;
  color: inherit;
}

.user-card__avatar {
  border-radius: 100%;
}

.user-card__name,
.user-card__email {
  margin: 15px 0 0;
}

.users-pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.users-pagination__btn {
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 12px;
  cursor: pointer;
  outline: none;
}

.users-pagination__btn:not(:disabled):hover {
  background-color: rgba(0, 0, 0, .05);
}

.users-pagination__btn:not(:disabled):active {
  background-color: rgba(0, 0, 0, .1);
}

.users-pagination__btn:disabled {
  cursor: default;
}

.users-pagination__btn:disabled span {
  opacity: .5;
}

.users-pagination__pages__page {
  border-left: none;
}

.users-pagination__pages__page:last-child {
  border-right: none;
}

.users-pagination__prev {
  border-radius: 10px 0 0 10px;
}

.users-pagination__next {
  border-radius: 0 10px 10px 0;
}
</style>
