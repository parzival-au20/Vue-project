<template>
  <div class="flex flex-row w-screen min-h-screen bg-white">
    <div class="bg-[#F5F5F5] flex flex-col w-64">
        <Menu class="bg-white mt-20" :model="items">
          <template #item="{item}">
            <div
              :class="[
                'flex items-center gap-4 font-normal pr-4 rounded cursor-pointer transition hover:bg-gray-300 text-[#4F359B]'
              ]">
              <div class="w-2 h-10 border rounded-r-lg bg-[#4F359B]"></div>
              <div class="flex  items-center gap-2">
                <IconUsers :stroke-w=1 />
                <span class="font-semibold">{{ item.label }}</span>
              </div>
            </div>
          </template>
        </Menu>
      <hr class="mt-auto border  border-[#D8D9DD] mx-4 my-2" />
      <div class="flex mb-8 p-4 gap-2 justify-center">
        <img src="../assets/n2-logo.png" class="w-10 h-10" alt="n2logo">
        <p class="text-gray-700 font-bold text-2xl content-center">N2Mobil</p>
      </div>
    </div>
    <div class="grow p-4 mr-[25px]">
      <UsersList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useRouter } from "vue-router";
import { ref, onUpdated } from "vue";
import UsersList from '@/components/UsersList.vue';
import TodosList from '@/components/TodosList.vue';
import Menu from 'primevue/menu';
import Card from 'primevue/card';
import { IconUsers } from '@tabler/icons-vue';


export default {
  components: {
    UsersList,
    TodosList,
    Menu,
    Card,
    IconUsers,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
        return {
            items: [
                {
                  label: 'Users', icon: 'pi pi-users',
                  command: () => { this.router.push("/todos"); // Yönlendirme
                  },
                }
            ]
        };
    }
};
</script>

<style scoped>

</style>
