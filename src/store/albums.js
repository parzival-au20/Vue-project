import { defineStore } from 'pinia';
import axios from 'axios';

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
        const url = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
        const response = await axios.get(url);
        this.albums = response.data;
      } catch (error) {
        console.error('Albums API isteği başarısız:', error);
      }
    },
    selectAlbum(album) {
      this.selectedAlbum = album; // Kullanıcıyı seç
      localStorage.setItem("selectedAlbum", JSON.stringify(album));
    },
  },
  persist: {
    enabled: true, // Persist'i etkinleştir
    strategies: [
      {
        key: 'selected-album', // Sadece selectedUser için özel anahtar
        storage: localStorage,
        paths: ['selectedAlbum'],
      },
    ],
  },
  getters: {
    allAlbums: (state) => state.albums,
  },
});
