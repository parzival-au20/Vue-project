<template>
    <div class="flex flex-row w-screen min-h-screen bg-white">
      <div class="flex flex-col bg-[#F5F5F5]">
        <div class="flex gap-5 ml-5 mt-6">
          <img class="size-12 !rounded-full object-cover" src="../assets/user-4.png" alt="">
          <div class="content-center">
            <p class="text-lg  text-black truncate w-full max-w-[140px] leading-[27px]" :title="selectedUser.name">{{ selectedUser.name }}</p>
            <a :href="'mailto:' + selectedUser.email"><p class="text-[#5C6672] underline text-[12px] truncate w-full max-w-[140px] leading-[14px]" :title="selectedUser.email">{{ selectedUser.email }}</p></a>
          </div>
        </div>
        <hr class="border  border-[#D8D9DD] mx-4 mt-4" />
        <Menu class="flex flex-1 flex-col w-64" />
      </div>
      <div class="w-full mr-3">
        <TodosList />
      </div>
  </div>
</template>

  <script>
  import { useTodoStore } from '@/store/todos';
  import { useUserStore } from '@/store/users';
  import { computed, onMounted, watch  } from 'vue';
  import Menu from '@/components/MenuComp.vue';
  import TodosList from '@/components/TodosList.vue';

  export default {
    components: {
    Menu,
    TodosList,
  },
    setup() {
      const todoStore = useTodoStore();
      const userStore = useUserStore();
      const selectedUser = computed(() => userStore.selectedUser);
      const userId = computed(() => selectedUser.value?.id);

      watch(userId, async (newUserId) => {
      if (newUserId) {
        await todoStore.fetchTodos(newUserId); // userId geldiğinde todos verilerini çek
      }
    }, { immediate: true }); // immediate: true, bileşen yüklendiği anda da çağırılır

      const todos = computed(() => todoStore.allTodos); // Reaktif olarak yapılacakları al

      return { todos, selectedUser };
    },
  };
  </script>
