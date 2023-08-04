<!-- eslint-disable vue/multi-word-component-names -->
<!-- Home.vue -->

<template>
    <div>
      <TodoList />
    </div>
  </template>
  
  <script>
  import TodoList from "@/components/TodoList.vue";
  
  export default {
    components: {
      TodoList,
    },
  };
  </script>
  