<template>
    <div class="flex mb-10 mt-10 ml-16 gap-6">
      <IconSquareRoundedArrowLeft class="cursor-pointer" :stroke="2" @click="goAlbums()"/>
      <h1 class=" text-2xl font-bold ml-5">Go Albums</h1>
    </div>
    <ScrollPanel style="width: 100%; height: 80vh" :dt="{bar:{background:'{primary.color}', size:'8px'}}">
    <div class="p-4 ml-4 card-container">
      <!-- Skeleton Ekleme -->
      <template v-if="loading">
        <div class="flex mb-4" v-for="n in 6" :key="n">
          <div class="card flex justify-center">
            <Skeleton shape="rectangle" width="250px" height="250px" />
          </div>
        </div>
      </template>
      <!-- Gerçek İçerik -->
      <template v-else>
        <div class="flex mb-4" v-for="photo in photos" :key="photo.id">
          <div class="card flex justify-center">
            <Image :src="photo.url" :alt="photo.title" width="250" preview />
          </div>
        </div>
      </template>
    </div>
    </ScrollPanel>
</template>

<script>
import { useAlbumStore } from '@/store/albums';
import { usePhotoStore } from '@/store/photos';
import { useUserStore } from '@/store/users';
import { IconSquareRoundedArrowLeft } from '@tabler/icons-vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from 'primevue/card';
import Image from 'primevue/image';
import ScrollPanel from 'primevue/scrollpanel';
import Skeleton from 'primevue/skeleton';


export default {
  components: {
      IconSquareRoundedArrowLeft,
      Card,
      Image,
      ScrollPanel,
      Skeleton,
    },
  setup() {
    const albumStore = useAlbumStore();
    const photoStore = usePhotoStore();
    const userStore = useUserStore();
    const route = useRoute();

    const selectedAlbum = computed(() => albumStore.selectedAlbum);
    const albumId = computed(() => selectedAlbum.value?.id);

    const loading = ref(true);

    const router = useRouter();

    onMounted(async () => {
      try {
        await photoStore.fetchPhotos(albumId.value);
      } finally {
        loading.value = false;
      }
    });

    const photos = computed(() => photoStore.allPhotos);
    const albums = computed(() => albumStore.allAlbums);

    const goAlbums = () => {
      router.push(`/albums`);
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

    return { goAlbums, loadPhotos, photos, loading  };
  },

};
</script>

<style>

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>