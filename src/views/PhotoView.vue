<template>
  <div class="grow p-4 mr-[25px]">
    <PhotosList />
  </div>
</template>

<script>
import PhotosList from '@/components/PhotosList.vue';

export default {
  components: {
      PhotosList,
    },
  setup() {
    return {  };
  },

};
</script>

<style>
</style>