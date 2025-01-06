import { defineStore } from 'pinia';
import axiosInstance from '../plugins/axiosInstance';

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
        const response = await axiosInstance.get(`/photos/?album=${albumId}`);
        this.photos = response.data;
        console.log(albumId);
      } catch (error) {
        console.error('Photos API isteği başarısız:', error);
      }
    },
    selectAlbum(album) {
        this.selectedAlbum = album; // Kullanıcıyı seç
      },
  },
  getters: {
    allPhotos: (state) => state.photos,
  },
});
