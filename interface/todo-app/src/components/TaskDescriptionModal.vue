<template>
  <div :class="{ modal: true, 'modal-visible': isOpen }" @click="closeOnOutsideClick">
    <div class="modal-content">
      <span @click="closeModal" class="close-button">&times;</span>
      <h3>Task Description</h3>
      <p>{{ displayDescription }}</p>
    </div>
  </div>
</template>
  
<style>
/* Styles specific to this component */
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
  background-color:#ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  /* Center vertically */
  left: 50%;
  /* Center horizontally */
  transform: translate(-50%, -50%);
  /* Adjust for the element's own size */
  width: 50%;
  /* Set to desired width, e.g., 50% of the viewport */
  max-width: 600px;
  /* Optional: set a maximum width */
  z-index: 1000;
  /* Optional: set a high z-index to ensure it appears above other content */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 30px;
}

.modal-visible {
  opacity: 1;
  visibility: visible;
}
</style>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    description: String,
  },
  computed: {
    // Computed property to handle null or undefined description
    displayDescription() {
      return this.description || "This task has no description."; // Default message
    },
  },
  methods: {
    closeOnOutsideClick(event) {
      // Check if the click was outside the modal content
      if (event.target.classList.contains('modal')) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style src="../style/common.css"></style>
