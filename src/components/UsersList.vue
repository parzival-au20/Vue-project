<template>
    <div>
      <h3>Kullanıcılar:</h3>
      <div class="card-container">
      <Card
        v-for="user in users"
        :key="user.id"
        style="width: 25rem; margin-bottom: 1rem; overflow: hidden;"
      >
        <template #header>
          <div class="header-content">
            <img width="80"
              height="80"
              class="user-image" alt="user header" src="../assets/card-vue.jpg" />
              <div>
                <h1 class="user-name">{{ user.name }}</h1>
                 {{ user.phone }}<br />
                 {{ user.email }}<br />
              </div>
          </div>
        </template>
        <template #content>
          <p class="m-0">
            <strong>Address:</strong> {{ user.address.street }} {{ user.address.suit }} {{ user.address.city }}<br />
            <strong>Company:</strong> {{ user.company.name }}<br />
            <strong>Website:</strong> {{ user.website }}
          </p>
        </template>
      </Card>
    </div>
    </div>
  </template>

  <script>
  import { useUserStore } from '@/store/users';
  import { computed, onMounted } from 'vue';
  import Card from 'primevue/card';
  import Button from "primevue/button";

  export default {
    components: {
    Card,
    Button,
    },
    setup() {
      const userStore = useUserStore();

      onMounted(() => {
        userStore.fetchUsers(); // Kullanıcıları API'den çekiyoruz
      });

      const users = computed(() => userStore.allUsers); // Reaktif olarak kullanıcıları al

      return { users };
    },
  };
  </script>

<!-- <style>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 6rem;
  padding: 1rem;
  border-color: red;
  border-width: 1rem;
  background-color: blueviolet;
}
</style> -->

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  background-color: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-image {
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 1.5rem;
  margin: 0;
}

.m-0 {
  margin: 0;
}
</style>
