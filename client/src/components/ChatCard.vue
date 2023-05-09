<script setup lang="ts">
import ProfilePicture from '@/components/ProfilePicture.vue'

const props = defineProps({
    avatar: String,
    username: String,
    chatId: Number
})

const emit = defineEmits(['joinChat']);


</script>

<template>
    <div class="card" @click="emit('joinChat', props.chatId)">
        <article class="bg-primary-700 border-round p-3 m-2 mb-4 cursor-pointer flex align-items-center gap-2">
            <ProfilePicture :image-url=props.avatar :username=props.username image-size="large" />
            <span>{{ props.username }}</span>
        </article>
    </div>
</template>

