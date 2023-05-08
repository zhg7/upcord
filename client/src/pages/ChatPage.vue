<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Card from 'primevue/card';
import { io } from "socket.io-client";
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getUserChats } from '@/services/ChatService';
import { useAuth } from '@/store/auth';

const auth = useAuth();

const socket = io("ws://localhost:3000");

const chats = ref();

onMounted(async () => {
    chats.value = await getUserChats();
})

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
socket.emit('join', "XD");

function getReceiverUsername(chat: any) {
    if (chat.userOne.username === auth.user.value.username) {
        return chat.userTwo.username;
    } else {
        return chat.userOne.username;
    }
}

function getReceiverAvatar(chat: any) {
    if (chat.userOne.avatar === auth.user.value.avatar) {
        return chat.userTwo.avatar;
    } else {
        return chat.userOne.avatar;
    }
}

</script>

<template>
    <div class="card grid">
        <aside class="col-12 sm:col-12 md:col-5 lg:col-4">
            <Card>
                <template #title> Chats </template>
                <template #content>
                    <div v-for="chat in chats">
                        <ProfilePicture :image-url=getReceiverAvatar(chat) :username=getReceiverUsername(chat)
                            image-size="normal" />
                        <span>{{ getReceiverUsername(chat) }}</span>
                    </div>
                </template>
            </Card>
        </aside>
        <section class="col-12 sm:col-12 md:col-7 lg:col-8">
            <Card>
                <template #title> </template>
                <template #content>

                </template>
            </Card>
        </section>
    </div>
</template>

