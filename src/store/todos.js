import { defineStore } from 'pinia';
import axiosInstance from '../plugins/axiosInstance';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
  }),
  actions: {
    async fetchTodos(userId) {
      this.todos = [];
      if (!userId) {
        //console.error('userId parametresi gerekli!');
        return;
      }
      try {
        const response = await axiosInstance.get(`/todos/?user=${userId}`);
        this.todos = response.data;
      } catch (error) {
        console.error('Todos API isteği başarısız:', error);
      }
    },
  },
  getters: {
    allTodos: (state) => state.todos,
  },
});
