<template>
    <div>
        <h1 class=" text-2xl text-justify font-bold mb-10 ml-[15px] ">All Users</h1>
      <div class="card-container gap-8">
      <Card
        v-for="user in users"
        :key="user.id"
        class="cursor-pointer"
        @click="navigateToUser(user.id)">
        <template #header>
          <div class="flex">
            <div class="flex flex-shrink-0 p-4">
              <img :src='imageSrc' class="w-24 h-24 rounded-[50px]"/>
            </div>
              <div class="content-center ml-5">
                <h1 class="text-2xl font-medium text-black">{{ user.name }}</h1>
                 <p class="text-gray-500">{{ user.phone }}</p>
                 <p class="text-gray-500 truncate w-full max-w-[175px]">{{ user.email }}</p>
              </div>
          </div>
        </template>
        <template #content>
          <div class=" flex flex-col text-start">
            <div class="mb-2">
              <IconMapPinHeart class="inline-flex mr-1" color="black" :size="24" :stroke-width=2 />
              <strong class="text-[#313E50] font-semibold">Location</strong>
              <p class="text-gray-500">{{ user.address.street }} {{ user.address.suit }} {{ user.address.city }}</p>
            </div>
            <div class="mb-2">
              <IconBuildingSkyscraper class="inline-flex mr-1" color="black" :size="24" :stroke-width=2 />
              <strong>Company</strong>
              <p class="text-gray-500">{{ user.company.name }}</p>
            </div>
            <div class="mb-2">
              <IconWorldShare class="inline-flex mr-1" color="black" :size="24" :stroke-width=1.75 />
              <strong>Website</strong>
              <p class="text-gray-500">{{ user.website }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>
    </div>

  </template>

  <script>
  import { useRouter } from "vue-router";
  import { useUserStore } from '@/store/users';
  import { computed, onMounted } from 'vue';
  import Card from 'primevue/card';
  import Button from "primevue/button";
  import Avatar from 'primevue/avatar';
  import Image from 'primevue/image';
  import { IconMapPinHeart, IconWorldShare, IconBuildingSkyscraper } from '@tabler/icons-vue';

  export default {
    components: {
    Card,
    Button,
    Avatar,
    Image,
    IconMapPinHeart,
    IconBuildingSkyscraper,
    IconWorldShare,
    },
    setup() {
      const userStore = useUserStore();
      const router = useRouter();

      onMounted(() => {
        userStore.fetchUsers(); // Kullanıcıları API'den çekiyoruz
      });

      const users = computed(() => userStore.allUsers); // Reaktif olarak kullanıcıları al
      const imageSrc = require('@/assets/user2.png'); // assets klasöründeki görseli import ediyoruz
      const navigateToUser = (userId) => {
      router.push(`/todos`);
    };
    return {
      imageSrc, users, navigateToUser,
      };
    },
    data() {
      return {

      }
  }
  };
  </script>


<style scope>

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

</style>
