import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
  }),
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
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
