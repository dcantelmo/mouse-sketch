<template>
    <div class="notification-container">
        <transition-group name="slide-up" tag="div">
            <NotificationBar
                v-for="notification in notifications"
                :key="notification.id"
                :notification="notification"
            />
        </transition-group>
    </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue';
import { mapState } from 'vuex';
export default {
    components: {
        NotificationBar
    },
    computed: mapState('notification', ['notifications'])
};
</script>

<style scoped>
.slide-up-enter {
    transform: translateY(-10px);
    opacity: 0;
}

.slide-up-enter-active {
    transition: all 0.2s ease;
}

.slide-up-move {
    transition: transform 0.5s ease-out;
}

.slide-up-leave-active {
    transition: all 0.2s ease-out;
}
</style>