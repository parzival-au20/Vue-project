<template>
  <div class="grow p-4 mr-[25px]">
    <UsersList :is="currentView" :userId="selectedUserId" />
  </div>
</template>

<script>
// @ is an alias to /src
import { useRouter } from "vue-router";
import { useMenuStore } from "@/store/menu";
import UsersList from '@/components/UsersList.vue';
import Menu from '@/components/MenuComp.vue';
import { computed } from "vue";


export default {
  components: {
    UsersList,
    Menu,
  },
  setup() {
    const router = useRouter();
    const menuStore = useMenuStore();
    const currentView = computed(() => menuStore.currentView);
    const selectedUserId = computed(() => menuStore.selectedUserId);
    return { router, currentView, selectedUserId };
  },
};
</script>

<style scoped>

</style>
