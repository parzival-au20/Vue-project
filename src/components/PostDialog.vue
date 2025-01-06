<template>
    <Dialog modal :style="{ width: '60vw'}" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header><h1 class="font-bold text-[24px]">{{ selectedPost?.title }}</h1></template>
    <div class="flex">
      <ScrollPanel class="w-[600px] h-[500px]" :dt="{bar:{background:'{primary.color}', size:'4px'}}" >
        <p class="m-0">{{ selectedPost?.body }}</p>
      </ScrollPanel>
      <Divider class="border mr-4" layout="vertical" />
      <ScrollPanel class="w-[450px] h-[500px]" :dt="{bar:{background:'{primary.color}', size:'4px'}}">
        <h1 class="font-bold text-[20px] mb-4">Comments</h1>
        <div>
          <div class="flex gap-4 mb-4"  v-for="comment in comments" :key="comment.id">
            <img class="size-12 !rounded-full object-cover" src="../assets/user-4.png" alt="">
            <div class="content-center">
              <p class="text-lg font-medium text-black truncate w-full max-w-[200px] leading-[27px]" :title="comment.name">{{ comment.name }}</p>
              <p class="text-[#5C6672] text-[14px]">{{ comment.body }}</p>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </div>
  </Dialog>
</template>

<script>
import { usePostStore } from '@/store/posts';
import { useCommentStore } from '@/store/comments';
import Dialog from 'primevue/dialog'; // Dialog bileşeni eklendi
import Divider from 'primevue/divider';
import ScrollPanel from 'primevue/scrollpanel';
import { computed, onMounted , ref} from 'vue';

export default {
  components: {
      Dialog,
      Divider,
      ScrollPanel,
    },
    setup() {
    const postStore = usePostStore();
    const commentStore = useCommentStore();

    const visible = ref(false);
    const selectedPost = computed(() => commentStore.selectedPost);

    const posts = computed(() => postStore.allPosts); // Reaktif olarak yapılacakları al
    const comments = computed(() => commentStore.allComments);

    return { posts, comments, selectedPost, visible };
  },
}
</script>

<style>

</style>