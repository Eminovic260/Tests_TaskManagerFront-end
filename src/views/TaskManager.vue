<template>
    <div class="task-manager">
        <h1>Task Manager</h1>

        <!-- Formulaire pour ajouter une tâche -->
        <div class="add-task">
            <input v-model="newTask" placeholder="Nouvelle tâche" />
            <button @click="createTask">Ajouter</button>
        </div>

        <!-- Liste des tâches -->
        <ul>
            <li v-for="task in tasks" :key="task.id" class="task-item">
                <span :class="{ completed: task.status === 'terminé' }">{{ task.description }}</span>
                <button @click="completeTask(task.id)" :disabled="task.status === 'terminé'">Compléter</button>
                <button @click="deleteTask(task.id)">Supprimer</button>
            </li>
        </ul>

        <p v-if="tasks.length === 0">Aucune tâche pour le moment.</p>
    </div>
</template>

<script>
import api from '../services/api.js';

export default {
    data() {
        return {
            tasks: [],
            newTask: ''
        };
    },
    mounted() {
        this.loadTasks();
    },
    methods: {
        async loadTasks() {
            try {
                const response = await api.getTasks();
                this.tasks = response.data;
            } catch (err) {
                console.error(err);
            }
        },
        async createTask() {
            if (!this.newTask.trim()) return;
            try {
                const response = await api.createTask({ description: this.newTask });
                this.tasks.push(response.data);
                this.newTask = '';
            } catch (err) {
                console.error(err);
            }
        },
        async deleteTask(id) {
            try {
                await api.deleteTask(id);
                this.tasks = this.tasks.filter(t => t.id !== id);
            } catch (err) {
                console.error(err);
            }
        },
        async completeTask(id) {
            try {
                const response = await api.completeTask(id);
                const index = this.tasks.findIndex(t => t.id === id);
                if (index !== -1) this.tasks[index] = response.data;
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>

<style>
.completed {
    text-decoration: line-through;
    color: gray;
}
.task-item {
    margin-bottom: 8px;
}
.add-task {
    margin-bottom: 16px;
}
</style>
