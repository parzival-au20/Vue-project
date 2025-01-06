import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TodoView from '../views/TodoView.vue'
import PostsView from '../views/PostsView.vue'
import AlbumView from '../views/AlbumView.vue'
import PhotosView from '../views/PhotoView.vue'
import { useMenuStore } from "@/store/menu";

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/todos',
    name: 'UserTodos',
    component: TodoView,
    props: true,
  },
  {
    path: '/posts',
    name: 'UserPosts',
    component: PostsView,
    props: true,
  },
  {
    path: '/albums',
    name: 'UserGallery',
    component: AlbumView,
    props: true,
  },
  {
    path: '/albums/photos',
    name: 'UserPhotos',
    component: PhotosView,
    props: true,
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const menuStore = useMenuStore();

  if (to.name != "home") {
    const userId = to.params.userId; // Dinamik parametre
    menuStore.setMenuForUser(userId);

     // Photos rotasında Albums menü öğesini seç
     if (to.name === "UserPhotos") {
      const albumsMenu = menuStore.menuItems.find(item => item.route.includes('/albums'));
      if (albumsMenu) {
        menuStore.selectItem(albumsMenu);
      }
    } else {
      // Rota adına göre seçili menü öğesini belirle
      const selectedItem = menuStore.menuItems.find(item => item.route === to.path);
      if (selectedItem) {
        menuStore.selectItem(selectedItem);
      }
    }
  } else {
    // Ana sayfa için menüyü ayarlıyoruz
    menuStore.resetMenu();
  }

  next();
});
export default router
