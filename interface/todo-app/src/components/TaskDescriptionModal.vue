<template>
    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close-button">&times;</span>
        <h3>Task Description</h3>
        <p>{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
      description: String,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  </style>
  