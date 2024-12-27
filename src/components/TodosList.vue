<template>
    <div>
      <h3>Yapılacaklar Listesi:</h3>
      <ul>
        <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
      </ul>
    </div>
  </template>

  <script>
  import { useTodoStore } from '@/store/todos';
  import { computed, onMounted } from 'vue';

  export default {
    setup() {
      const todoStore = useTodoStore();

      onMounted(() => {
        todoStore.fetchTodos(); // Yapılacaklar listesini API'den çekiyoruz
      });

      const todos = computed(() => todoStore.allTodos); // Reaktif olarak yapılacakları al

      return { todos };
    },
  };
  </script>
