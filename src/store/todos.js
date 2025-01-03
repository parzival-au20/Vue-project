import { defineStore } from 'pinia';
import axios from 'axios';

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
        const url = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
        const response = await axios.get(url);
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
