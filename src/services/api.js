import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/tasks',
    headers: { 'Content-Type': 'application/json' },
});

export default {
    getHello() {
        return apiClient.get('/hello');
    },
    getTasks() {
        return apiClient.get('');
    },
    createTask(task) {
        return apiClient.post('', task);
    },
    deleteTask(taskId) {
        return apiClient.delete(`/${taskId}`);
    },
    completeTask(taskId) {
        return apiClient.put(`/${taskId}/complete`);
    },
};
