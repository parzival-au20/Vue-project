<template>
    <div class="grow p-4 mr-[25px]">
      <AlbumList />
    </div>
</template>

<script>
import AlbumList from '@/components/AlbumsList.vue';

export default {
  components: {
      AlbumList,
  },
  setup() {
    return { };
  },

}
</script>

<style>

</style>