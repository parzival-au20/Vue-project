import { defineStore } from 'pinia';
import axios from 'axios';

export const usePhotoStore = defineStore('photos', {
  state: () => ({
    photos: [],
    selectedAlbum: null,
  }),
  actions: {
    async fetchPhotos(albumId) {
      this.photos = [];
      if (!albumId) {
        //console.error('postId parametresi gerekli!');
        return;
      }
      try {
        const url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
        const response = await axios.get(url);
        this.photos = response.data;
        console.log(albumId);
      } catch (error) {
        console.error('Photos API isteği başarısız:', error);
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
        key: 'selected-album', // Sadece selectedPost için özel anahtar
        storage: localStorage,
        paths: ['selectedAlbum'],
      },
    ],
  },
  getters: {
    allPhotos: (state) => state.photos,
  },
});
