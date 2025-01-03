<template>
    <div class="flex mb-10 mt-10 ml-16 gap-6">
      <IconSquareRoundedArrowLeft class="cursor-pointer" :stroke="2" @click="goAlbums()"/>
      <h1 class=" text-2xl font-bold ml-5">Go Albums</h1>
    </div>
    <ScrollPanel style="width: 100%; height: 80vh" :dt="{bar:{background:'{primary.color}', size:'8px'}}">
    <div class="p-4 ml-4 card-container">
      <div class="flex mb-4"  v-for="photo in photos" :key="photo.id">
        <div class="card flex justify-center">
          <Image :src="photo.url" :alt="photo.title" width="250" preview />
          <!-- <p>{{ photo.url }}</p> -->
        </div>
      </div>
    </div>
    </ScrollPanel>
</template>

<script>
import { useAlbumStore } from '@/store/albums';
import { usePhotoStore } from '@/store/photos';
import { useUserStore } from '@/store/users';
import { IconSquareRoundedArrowLeft } from '@tabler/icons-vue';
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from 'primevue/card';
import Image from 'primevue/image';
import ScrollPanel from 'primevue/scrollpanel';

export default {
  components: {
      IconSquareRoundedArrowLeft,
      Card,
      Image,
      ScrollPanel,
    },
  setup() {
    const albumStore = useAlbumStore();
    const photoStore = usePhotoStore();
    const userStore = useUserStore();
    const route = useRoute();

    const userId = computed(() => Number(route.params.userId));
    const albumId = computed(() => Number(route.params.albumId));

    const router = useRouter();

    onMounted(() => {
      photoStore.fetchPhotos(albumId.value); // photos listesini API'den çekiyoruz
    });

    const photos = computed(() => photoStore.allPhotos);
    const albums = computed(() => albumStore.allAlbums);

    const goAlbums = () => {
      router.push(`/${userId.value}/albums`);
    };

    const loadPhotos = async (albumId) => {
        try {
        const album = albums.value.find((p) => p.id === albumId);
        photoStore.selectedAlbum = album;
        await photoStore.fetchPhotos(albumId);
        } catch (error) {
        console.error('Photos yüklenirken hata:', error);
        }
  };

    return { goAlbums, loadPhotos, photos, userId };
  },

};
</script>

<style>

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>