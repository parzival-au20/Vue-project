import { defineStore } from 'pinia';
import axios from 'axios';

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
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
        const response = await axios.get(url);
        this.posts = response.data;
        console.log(this.posts);
      } catch (error) {
        console.error('Posts API isteği başarısız:', error);
      }
    },
  },
  getters: {
    allPosts: (state) => state.posts,
  },
});
