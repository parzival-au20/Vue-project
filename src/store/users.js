import { defineStore } from 'pinia';
import axiosInstance from '../plugins/axiosInstance';


export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
    selectedUser: null,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axiosInstance.get('/users/');
        this.users = response.data;
      } catch (error) {
        console.error('Users API isteği başarısız:', error);
      }
    },
    selectUser(userId) {
      this.selectedUser = this.allUsers.find(user => user.id === userId);
    },
    clearSelectedUser() {
      this.selectedUser = null;
    },
  },
  getters: {
    getUserById: (state) => (userId) => {
      return state.allUsers.find(user => user.id === userId);
    },
    allUsers: (state) => state.users,
  },
});
