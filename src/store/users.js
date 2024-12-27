import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Users API isteği başarısız:', error);
      }
    },
  },
  getters: {
    allUsers: (state) => state.users,
  },
});
