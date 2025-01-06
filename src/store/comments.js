import { defineStore } from 'pinia';
import axiosInstance from '../plugins/axiosInstance';

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
        const response = await axiosInstance.get(`/comments/?post=${postId}`);
        this.comments = response.data;
      } catch (error) {
        console.error('Comments API isteği başarısız:', error);
      }
    },
    selectPost(post) {
        this.selectedPost = post;
      },
  },
  getters: {
    allComments: (state) => state.comments,
  },
});
