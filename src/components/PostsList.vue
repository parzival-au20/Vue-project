<template>
  <div class="flex flex-col w-full">
    <div class="flex mb-10 mt-10 ml-16 gap-6">
      <IconSquareRoundedArrowLeft class="cursor-pointer" :stroke="2" @click="goHome"/>
      <h1 class=" text-2xl font-bold ml-5">Go Home</h1>
    </div>
  <!-- Tüm Panelleri Aç/Kapat Düğmesi -->
  <div class="flex justify-end mx-16 mb-4">
      <button
        @click="toggleAllPanels"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
      >
        {{ allPanelsOpen ? 'Close All Panels' : 'Open All Panels' }}
      </button>
    </div>
        <PostDialog v-model:visible="visible" />
        <ScrollPanel style="width: 100%; height: 75vh" :dt="{bar:{background:'{primary.color}', size:'8px'}}">
          <div class="card mx-16"  v-for="post in posts" :key="post.id">
            <Panel :header="post.title" :toggleable="true" :collapsed="!allPanelsOpen">
                <p class="m-0 text-start">
                  {{ post.body }}
                </p>
                <div class="flex justify-end mt-2">
                  <div class="flex gap-6 cursor-pointer" @click="loadComments(post.id)">
                    <p class="font-bold text-[#26303E] content-center">See More</p>
                    <IconSquareRoundedArrowRight class="text-[#4F359B]" :stroke="2"/>
                  </div>
                </div>
            </Panel>
          </div>
        </ScrollPanel>
  </div>
</template>

<script >
import { usePostStore } from '@/store/posts';
import { useUserStore } from '@/store/users';
import { useCommentStore } from '@/store/comments';
import { IconSquareRoundedArrowLeft, IconSquareRoundedArrowRight  } from '@tabler/icons-vue';
import { computed, onMounted , ref} from 'vue';
import { useRouter } from 'vue-router';
import Panel from 'primevue/panel'; // Dialog bileşeni eklendi
import Button from 'primevue/button'; // Button bileşeni eklendi
import ScrollPanel from 'primevue/scrollpanel';
import PostDialog from './PostDialog.vue';


export default {
  components: {
      IconSquareRoundedArrowLeft,
      IconSquareRoundedArrowRight,
      Panel,
      Button,
      ScrollPanel,
      PostDialog,
    },
  setup() {
    const postStore = usePostStore();
    const commentStore = useCommentStore();

    const router = useRouter();
    const allPanelsOpen = ref(true)
    const visible = ref(false);
    const userStore = useUserStore();
    const selectedUser = computed(() => userStore.selectedUser);

    const selectedPost = computed(() => commentStore.selectedPost);

    onMounted(() => {
      if (!selectedUser.value) {
        router.push("/"); // Kullanıcı seçilmemişse anasayfaya yönlendir
      }
      if (selectedUser.value) {
        postStore.fetchPosts(selectedUser.value.id);
        }
    });

    const posts = computed(() => postStore.allPosts); // Reaktif olarak yapılacakları al

    const goHome = () => {
      userStore.clearSelectedUser();
      router.push('/'); // Burada AllUsers sayfasına yönlendirme yapıyoruz
    };

    const toggleAllPanels = () => {
      allPanelsOpen.value = !allPanelsOpen.value; // Tüm panelleri aç/kapat
    };
    const loadComments = async (postId) => {
      try {
        const post = posts.value.find((p) => p.id === postId);
        commentStore.selectedPost = post;
        await commentStore.fetchComments(postId);
        visible.value = true; // Dialog'u görünür yap
      } catch (error) {
        console.error('Yorumlar yüklenirken hata:', error);
      }
    };

    return { posts, goHome, allPanelsOpen, toggleAllPanels, loadComments, selectedPost, visible };
  },
};
</script>

<style>

</style>