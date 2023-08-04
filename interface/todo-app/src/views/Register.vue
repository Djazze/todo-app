<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/Register.vue -->
<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async register() {
            // Send registration request to the backend
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.username, password: this.password })
            });

            // Handle response
            if (response.ok) {
                this.$router.push('/login');
            } else {
                // Handle error (e.g., show an error message)
            }
        }
    }
};
</script>
