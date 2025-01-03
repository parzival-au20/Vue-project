<template>
      <div class="flex mb-10 mt-10 ml-16 gap-6">
        <IconSquareRoundedArrowLeft class="cursor-pointer" :stroke="2" @click="goHome"/>
        <h1 class=" text-2xl font-bold ml-5">Go Home</h1>
      </div>
      <ScrollPanel style="width: 100%; height: 80vh" :dt="{bar:{background:'{primary.color}', size:'8px'}}">
      <div class="p-4 mr-[25px] card-container gap-8">
        <div v-for="(album, index) in albums" :key="index">
          <Card class="cursor-pointer transform transition duration-200 hover:scale-105 hover:shadow-lg hover:border-[#4F359B] border border-gray-200" @click="navigateToPhotos(album.id)">
            <template #content>
              <div class="flex">
                <img class="w-48 h-48 object-cover" src="../assets/album1.jpg" alt="">
                <img class="w-48 h-48 object-cover" src="../assets/album4.jpeg" alt="">
              </div>
              <div class="flex">
                <img class="w-48 h-48 object-cover" src="../assets/album1.jpeg" alt="">
                <img class="w-48 h-48 object-cover" src="../assets/album3.jpeg" alt="">
              </div>
              <p class="font-bold mt-2">{{ album.title }}</p>
            </template>
          </Card>
        </div>
      </div>
      </ScrollPanel>
  </template>

  <script>
 import { useAlbumStore } from '@/store/albums';
 import { useUserStore } from '@/store/users';
 import { useMenuStore } from '@/store/menu';
  import { IconSquareRoundedArrowLeft } from '@tabler/icons-vue';
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Card from 'primevue/card';
  import ScrollPanel from 'primevue/scrollpanel';

  export default {
    components: {
        IconSquareRoundedArrowLeft,
        Card,
        ScrollPanel,
      },
    setup() {
      const albumStore = useAlbumStore();
      const userStore = useUserStore();
      const menuStore = useMenuStore();

      const selectedUser = computed(() => userStore.selectedUser);
      const userId = computed(() => selectedUser.value?.id);

      const router = useRouter();

      onMounted(() => {
        albumStore.fetchAlbums(); // Yapılacaklar listesini API'den çekiyoruz
        userStore.loadSelectedUser();
      });

      const albums = computed(() => albumStore.allAlbums); // Reaktif olarak yapılacakları al

      const goHome = () => {
        router.push('/'); // Burada AllUsers sayfasına yönlendirme yapıyoruz
      };

      const navigateToPhotos = (albumId) => {
        const selectedAlbum = albums.value.find((u) => u.id === albumId); // Kullanıcıyı bul
        albumStore.selectAlbum(selectedAlbum); // Store'da sakla
        const menuItem = menuStore.menuItems.find(item => item.route === `/${userId.value}/albums`); // Albüm menü öğesini bulun
        menuStore.selectItem(menuItem); // Albüm menüsünü seçili olarak işaretleyin
        //menuStore.setMenuForUser(userId);
        router.push(`/${userId.value}/albums/${albumId}/photos`);
      };

      return { albums, goHome, navigateToPhotos };
    },

  };
  </script>

  <style>

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  </style>