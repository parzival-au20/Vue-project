<template>
    <div class="flex flex-row w-screen min-h-screen bg-white">
      <div class="w-full mr-3">
        <TodosList />
      </div>
  </div>
</template>

  <script>
  import { useRouter } from "vue-router";
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
      const userStore = useUserStore();
      const router = useRouter();

      const selectedUser = computed(() => userStore.selectedUser);

      onMounted(async () => {
        await userStore.fetchUsers();
        if (!selectedUser.value) {
          router.push("/"); // Kullanıcı seçilmemişse anasayfaya yönlendir
        }
    });

      return { selectedUser };
    },
  };
  </script>
