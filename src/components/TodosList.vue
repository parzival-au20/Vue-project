<template>
      <div class="flex mb-10 mt-10 ml-16 gap-6">
        <IconSquareRoundedArrowLeft class="cursor-pointer" :stroke="2" @click="goHome"/>
        <h1 class=" text-2xl font-bold ml-5">Go Home</h1>
    </div>
      <ScrollPanel class="mr-4" style="width: 100%; height: 80vh" :dt="{bar:{background:'{primary.color}', size:'8px'}}">
        <ul class="text-start ml-20">
          <li class="justify-start p-4 text-[#485B69]" v-for="todo in todos" :key="todo.id">
            <Checkbox  class="mr-10" v-model="checked" inputId="size_large" binary size="large" :pt="{box: 'border-2 border-[#49454F]', input:'color-purple'}" /><label for="size_large">{{ todo.title }}</label>
          </li>
        </ul>
      </ScrollPanel>
  </template>

  <script>
  import { useTodoStore } from '@/store/todos';
  import { IconSquareRoundedArrowLeft } from '@tabler/icons-vue';
  import { computed, onMounted } from 'vue';
  import Checkbox from 'primevue/checkbox';
  import { useRouter } from 'vue-router';
  import ScrollPanel from 'primevue/scrollpanel';


  export default {
    components: {
      IconSquareRoundedArrowLeft,
      Checkbox,
      ScrollPanel,
    },
    setup() {
      const todoStore = useTodoStore();
      const router = useRouter();

      onMounted(() => {
        todoStore.fetchTodos(); // Yapılacaklar listesini API'den çekiyoruz
      });

      const todos = computed(() => todoStore.allTodos); // Reaktif olarak yapılacakları al

      const goHome = () => {
        router.push('/'); // Burada AllUsers sayfasına yönlendirme yapıyoruz
      };

      return { todos, goHome };
    },
  };
  </script>

<style scoped>

</style>