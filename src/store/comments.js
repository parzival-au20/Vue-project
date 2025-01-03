import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentStore = defineStore('comments', {
  state: () => ({
    comments: [],
    selectedPost: null,
  }),
  actions: {
    async fetchComments(postId) {
      this.comments = [];
      if (!postId) {
        //console.error('postId parametresi gerekli!');
        return;
      }
      try {
        const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
        const response = await axios.get(url);
        this.comments = response.data;
      } catch (error) {
        console.error('Comments API isteği başarısız:', error);
      }
    },
    selectPost(post) {
        this.selectedPost = post; // Kullanıcıyı seç
        localStorage.setItem("selectedPost", JSON.stringify(user));
      },
  },
  persist: {
    enabled: true, // Persist'i etkinleştir
    strategies: [
      {
        key: 'selected-post', // Sadece selectedPost için özel anahtar
        storage: localStorage,
        paths: ['selectedPost'],
      },
    ],
  },
  getters: {
    allComments: (state) => state.comments,
  },
});
