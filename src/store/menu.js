// src/store/menu.js
import { defineStore } from "pinia";
import { IconUsers, IconCheckupList, IconNotebook, IconPhotoHeart } from '@tabler/icons-vue';


export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuItems: [
        { label: 'Users', icon: IconUsers, command: () => console.log('Users clicked') },
        { label: 'Todos', icon: IconCheckupList, command: () => console.log('Todos clicked') },
        { label: 'Posts', icon: IconNotebook, command: () => console.log('Posts clicked') },
        { label: 'Albums', icon: IconPhotoHeart, command: () => console.log('Gallery clicked') },
      ],
    currentView: "AllUsers",
    selectedUserId: null,
    selectedItem: null,
  }),
  actions: {
    setMenuForUser(userId) {
      this.selectedUserId = userId;
      this.menuItems = [
        {
          label: "Todos",
          icon: IconCheckupList, // Direk Icon bileşeni
          view: "TodosList",
          route: `/todos`,
          },
          {
          label: "Posts",
          icon: IconNotebook,
          view: "PostsList",
          route: `/posts`,
          },
          {
          label: "Albums",
          icon: IconPhotoHeart,
          view: "AlbumsList",
          route: `/albums`,
          },
      ];
      this.currentView = "TodosList"; // Varsayılan olarak Todos sayfasına geç
      this.selectedItem = this.menuItems.find((item) => item.label === "Todos");
    },
    setMenu(items) {
        this.menuItems = items; // Menü öğelerini güncelle
      },
    resetMenu() {
      this.selectedUserId = null;
      this.menuItems = [
        {
          label: "Users",
          icon: IconUsers,
          view: "AllUsers",
          route: '/',
        },
      ];
      this.currentView = "AllUsers";
      this.selectedItem = this.menuItems.find((item) => item.label === "Users");
    },
    setView(view) {
      this.currentView = view;
    },
    initializeSelectedItem() {
      this.selectedItem = this.menuItems.find((item) => item.label === "Todos");
    },
    selectItem(item) {
      this.selectedItem = item; // Seçili öğeyi günceller
    },
  },
});
