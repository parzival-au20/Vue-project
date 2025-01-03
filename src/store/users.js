import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
    selectedUser: null,
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
    selectUser(user) {
      this.selectedUser = user; // Kullanıcıyı seç
      localStorage.setItem("selectedUser", JSON.stringify(user));
    },
    loadSelectedUser() {
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        this.selectedUser = JSON.parse(storedUser);

      }
    },
  },
  persist: {
    enabled: true, // Persist'i etkinleştir
    strategies: [
      {
        key: 'selected-user', // Sadece selectedUser için özel anahtar
        storage: localStorage,
        paths: ['selectedUser'],
      },
    ],
  },
  getters: {
    allUsers: (state) => state.users,
  },
});
