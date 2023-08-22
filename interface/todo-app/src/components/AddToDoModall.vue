<style src="../style/common.css"></style>

<template>
    <div :class="{ modal: true, 'modal-visible': showModal }" >
        <div class="modal-content-common">
            <span @click="closeModal" class="close-button-common">&times;</span>
            <h2>Add New To-Do</h2>
            <form @submit.prevent="addTodo">
                <label for="task">Task:</label>
                <input type="text" v-model="task" id="task" required />
                <label for="description">Description:</label>
                <textarea v-model="description" id="description"></textarea>
                <button type="submit" :disabled="!task || !description">Add</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        showModal: Boolean,
    },
    data() {
        return {
            task: '',
            description: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        addTodo() {
            this.$emit('add-todo', { task: this.task, description: this.description });
            this.closeModal();
            this.task = ''; // Reset the task
            this.description = ''; // Reset the description
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
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
}

.modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    width: 50%;
    max-width: 400px;
    text-align: center;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 30px;
}

input[type="text"],
textarea {
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: teal;
    /* color: white; */
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #009688;
}

/* Show the modal when showModal prop is true */

.modal-visible {
    opacity: 1;
    visibility: visible;
}
</style>
  