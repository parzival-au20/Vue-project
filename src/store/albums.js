import { defineStore } from 'pinia';
import axiosInstance from '../plugins/axiosInstance';

export const useAlbumStore = defineStore('albums', {
  state: () => ({
    albums: [],
    selectedAlbum: null,
  }),
  actions: {
    async fetchAlbums(userId) {
      this.albums = [];
      if (!userId) {
        //console.error('userId parametresi gerekli!');
        return;
      }
      try {
        const response = await axiosInstance.get(`/albums/?user=${userId}`);
        this.albums = response.data;
      } catch (error) {
        console.error('Albums API isteği başarısız:', error);
      }
    },
    selectAlbum(album) {
      this.selectedAlbum = album;
    },
  },
  getters: {
    allAlbums: (state) => state.albums,
  },
});
