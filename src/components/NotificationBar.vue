<template>
    <div ref="not" class="notification-bar" :class="notificationTypeClass">
        <p>{{notification.message}}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        notification: {
            type: Object,
            default: true
        }
    },
    data() {
        return {
            timeout: null
        };
    },
    
    mounted() {
        this.timeout = setTimeout(() => this.remove(this.notification.id), 3000);
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
    computed: {
        notificationTypeClass() {
            return `text-${this.notification.type}`;
        }
    },
    methods: mapActions('notification', ['remove'])
};
</script>

<style scoped>
p {
    margin-bottom: 0;
}
.notification-bar {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 5px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}
.text-success {
    color: green;
    background-color: rgba(201, 255, 188, 0.479);
}
.text-error {
    color: red;
    background-color: rgba(255, 188, 188, 0.479);
}
</style>