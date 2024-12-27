<template>
  <div class="main">
    <div class="menu-container">
      <div class="card flex justify-center">
        <Menu :model="items" />
    </div>
    </div>
    <div class="users-container">
      <UsersList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onUpdated } from "vue";
import UsersList from '@/components/UsersList.vue';
import TodosList from '@/components/TodosList.vue';
import Menu from 'primevue/menu';
import Card from 'primevue/card';


export default {
  components: {
    UsersList,
    TodosList,
    Menu,
    Card,
  },
  data() {
        return {
            items: [
                {
                    items: [
                        { label: 'File', icon: 'pi pi-file'},
                        { label: 'New', icon: 'pi pi-users'},
                        { label: 'Open', icon:'pi pi-download' }
                    ]
                }
            ]
        };
    }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  background-color: #F5F5F5;
}

.menu-container {
  background: linear-gradient(to bottom, #F5F5F5, #F5F5F5);
  padding: 1rem;
  border-color: #D8D9DD;
}

.users-container {
  flex-grow: 1; /* Kullanıcılar kısmı geri kalan alanı kaplasın */
  padding: 1rem;
  background: white;
}
</style>
