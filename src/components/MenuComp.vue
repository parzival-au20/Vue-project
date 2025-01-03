<template>
    <div>
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
    const menuItems = computed(() => menuStore.menuItems);

    return { menuStore, menuItems };
  },
}
</script>

<style>

</style>