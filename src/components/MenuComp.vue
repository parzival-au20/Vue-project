<template>
    <div class="flex flex-col bg-[#F5F5F5]">
      <div class="flex flex-col" v-if="selectedUser">
          <div class="flex gap-5 ml-5 mt-6">
            <img class="size-12 !rounded-full object-cover" src="../assets/user-4.png" alt="">
            <div class="content-center">
              <p class="text-lg  text-black truncate w-full max-w-[140px] leading-[27px]" :title="selectedUser.name">{{ selectedUser.name }}</p>
              <a :href="'mailto:' + selectedUser.email"><p class="text-[#5C6672] underline text-[12px] truncate w-full max-w-[140px] leading-[14px]" :title="selectedUser.email">{{ selectedUser.email }}</p></a>
            </div>
          </div>
          <hr class="border  border-[#D8D9DD] mx-4 mt-4" />
        </div>
        <Menu class="mt-20 bg-[#F5F5F5]" :model="menuItems">
          <template #item="{item}">
            <router-link :to="item.route" @click="menuStore.selectItem(item)">
              <div class="flex mb-6 items-center gap-4 font-normal pr-4 rounded cursor-pointer transition hover:bg-gray-400 text-[#4F359B]"
                  :class="{
                  'bg-white': menuStore.selectedItem === item,  // Seçili olmayan öğe için gri metin
                      }"
                    @click="menuStore.selectItem(item)">
                <div class="w-2 h-10 border rounded-r-lg bg-[#4F359B]"
                    :class="{ 'bg-[#4F359B]': menuStore.selectedItem === item, 'bg-transparent': menuStore.selectedItem !== item }"></div>
                <div class="flex items-center gap-2">
                  <component :is="item.icon" :stroke-width="2" />
                  <span class="font-semibold" :class="{
                  'text-[#4F359B]': menuStore.selectedItem === item,
                  'text-gray-500': menuStore.selectedItem !== item,
                      }">{{ item.label }}</span>
                </div>
              </div>
            </router-link>
          </template>
        </Menu>
      <hr class="mt-auto border  border-[#D8D9DD] mx-4 my-2" />
      <div class="flex mb-8 p-4 gap-2 justify-center">
        <img src="../assets/n2-logo.png" class="w-10 h-10" alt="n2logo">
        <p class="text-gray-700 font-bold text-2xl content-center">N2Mobil</p>
      </div>
    </div>
</template>

<script>
import Menu from 'primevue/menu';
import { IconUsers, IconCheckupList, IconNotebook, IconPhotoHeart, } from '@tabler/icons-vue';
import { useMenuStore } from "@/store/menu";
import { computed } from "vue";
import { useUserStore } from '@/store/users';

export default {
  components: {
    Menu,
    IconUsers,
    IconCheckupList,
    IconNotebook,
    IconPhotoHeart,
  },
  setup() {
    const menuStore = useMenuStore();
    const userStore = useUserStore();
    const menuItems = computed(() => menuStore.menuItems);

    const selectedUser = computed(() => userStore.selectedUser);

    return { selectedUser, menuStore, menuItems };
  },
}
</script>

<style>

</style>