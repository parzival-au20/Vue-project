import { defineStore } from 'pinia';
import axiosInstance from '../plugins/axiosInstance';

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts(userId) {
      this.posts = [];
      if (!userId) {
        //console.error('userId parametresi gerekli!');
        return;
      }
      try {
        const response = await axiosInstance.get(`/posts/?user=${userId}`);
        this.posts = response.data;
      } catch (error) {
        console.error('Posts API isteği başarısız:', error);
      }
    },
  },
  getters: {
    allPosts: (state) => state.posts,
  },
});
