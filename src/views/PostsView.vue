<template>
    <div class="flex flex-row w-screen min-h-screen bg-white">
        <PostsList />
  </div>
</template>

<script>
  import { useUserStore } from '@/store/users';
  import { computed, onMounted, watch  } from 'vue';
  import Menu from '@/components/MenuComp.vue';
  import PostsList from '@/components/PostsList.vue';
  import Divider from 'primevue/divider';

export default {
    components: {
        Menu,
        PostsList,
        Divider,
    },
    setup() {
      const userStore = useUserStore();
      const selectedUser = computed(() => userStore.selectedUser);

      onMounted(() => {
        if (!selectedUser.value) {
          router.push("/"); // Kullanıcı seçilmemişse anasayfaya yönlendir
        }
    });
      return { selectedUser };
    },

}
</script>

<style>

</style>