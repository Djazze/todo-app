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
  

<!-- <script setup></script> -->

<!-- <template>
  <div class="m-auto">
    <div class="container-custom">
      <div class="row">
        <h5 class="text-center my-4">Simple ToDo List</h5>

        <div class="row g-0">
          <div class="col-9">
            <input id="input_field" type="text" class="form-control" placeholder="Input text here" />
          </div>
          <div class="col-3 ps-2">
            <button id="save_button" class="btn btn-primary w-100">Save</button>
          </div>
        </div>

        <div class="p-0" id="base_container">
          <p class="mt-4 mx-2 mb-0 p-0"><small>Upcoming</small></p>
          <div id="todo_list_container" class="my-1 g-0">
            <div id="" class="card w-100 my-2">
              <div class="card-body d-flex justify-content-between py-2">
                <p class="m-0"></p>
                <button type="button" class="btn-close" aria-label="Close" onclick=""></button>
              </div>
            </div>
          </div>

          <div class="col-12 py-4">
            <button id="logout_button" class="btn btn-danger w-100">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<style scoped>
.container-custom {
  width: 330px;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}
</style>