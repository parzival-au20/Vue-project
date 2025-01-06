<template>
  <div class="flex flex-row w-screen min-h-screen bg-white">
  <div class="flex bg-[#F5F5F5]">
    <Menu class="flex flex-1 flex-col w-64" />
  </div>
    <router-view/>
  </div>
</template>

<script>
  import Menu from '@/components/MenuComp.vue';

export default {
  components: {
  Menu,
},
  setup() {

    return { };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
