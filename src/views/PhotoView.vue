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
    <div class="grow p-4 mr-[25px]">
        <PhotosList />
      </div>
</div>
</template>

<script>
import { useAlbumStore } from '@/store/albums';
import { usePhotoStore } from '@/store/photos';
import { useUserStore } from '@/store/users';
import { IconSquareRoundedArrowLeft } from '@tabler/icons-vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import PhotosList from '@/components/PhotosList.vue';
import Menu from '@/components/MenuComp.vue';

export default {
  components: {
      IconSquareRoundedArrowLeft,
      Card,
      PhotosList,
      Menu,
    },
  setup() {
    const albumStore = useAlbumStore();
    const photoStore = usePhotoStore();

    const userStore = useUserStore();
    const selectedUser = computed(() => userStore.selectedUser);
    const userId = computed(() => selectedUser.value?.id);

    const router = useRouter();

    onMounted(() => {
      albumStore.fetchAlbums(); // Yapılacaklar listesini API'den çekiyoruz
    });

    const albums = computed(() => albumStore.allAlbums); // Reaktif olarak yapılacakları al
    const photos = computed(() => photoStore.allPhotos);

    const loadPhotos = async (albumId) => {
    try {
      const post = albums.value.find((p) => p.id === albumId);
      photoStore.selectedPost = post;
      await photoStore.fetchPhotos(albumId);
    } catch (error) {
      console.error('Photos yüklenirken hata:', error);
    }
  };

    return { albums, loadPhotos, photos, selectedUser };
  },

};
</script>

<style>

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>