<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { io } from "socket.io-client";
import ProfilePicture from '@/components/ProfilePicture.vue'
import ChatCard from '@/components/ChatCard.vue';
import { getUserChats } from '@/services/ChatService';
import { useAuth } from '@/store/auth';
import type { Message } from '@/types/Message';

const auth = useAuth();

const socket = io("ws://localhost:3000");

const chat = ref(0);
const chats = ref();

const message = ref("");
const messages = ref<Message[]>([]);

onMounted(async () => {
    chats.value = await getUserChats();
})

function sendMessage() {

    const newMessage = {
        senderId: auth.user.value.id,
        senderUsername: auth.user.value.username,
        senderAvatar: auth.user.value.avatar,
        message: message.value,
        chatId: 1,
        createdAt: new Date(),
    };

    messages.value.push(newMessage);

    socket.emit('message', newMessage)
}


socket.on("message", (data) => {
    messages.value.push({
        senderId: data.senderId,
        senderUsername: data.senderUsername,
        senderAvatar: data.senderAvatar,
        message: data.message,
        chatId: 1,
        createdAt: data.createdAt,
    });
});


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

function joinChat(chatId: number) {
    chat.value = chatId;
    socket.emit('join', chatId);
}

</script>

<template>
    <div class="card grid">
        <aside class="col-12 sm:col-12 md:col-5 lg:col-4">
            <Card class="w-full h-20rem sm:h-20rem md:h-25rem lg:h-30rem overflow-y-auto">
                <template #title> Chats </template>
                <template #content>
                    <section v-for="chat in chats">
                        <ChatCard :avatar=getReceiverAvatar(chat) :username=getReceiverUsername(chat) :chat-id="chat.id"
                            @join-chat="(chatId) => joinChat(chatId)" />
                    </section>
                </template>
            </Card>
        </aside>
        <section class="col-12 sm:col-12 md:col-7 lg:col-8">
            <Card class="sm:h-20rem md:h-25rem lg:h-30rem h-10rem">
                <template #title> </template>
                <template #content>
                    <div v-if="chat !== 0">
                        <section>
                            info
                        </section>
                        <Divider />
                        <section class="h-15rem max-h-15rem overflow-y-auto">
                            <article v-for="message in messages" class="flex flex-row mb-3">
                                <div v-if="message.senderId === auth.user.value.id" class="flex w-full justify-content-end">
                                    <div class="flex gap-3">
                                        <p>{{ message.message }}</p>
                                        <ProfilePicture class="" :image-url=message.senderAvatar
                                            :username=message.senderUsername image-size="large" />
                                    </div>
                                </div>
                                <div v-else class="flex">
                                    <div class="flex gap-3">
                                        <ProfilePicture class="" :image-url=message.senderAvatar
                                            :username=message.senderUsername image-size="large" />
                                        <p>{{ message.message }}</p>
                                    </div>
                                </div>
                            </article>
                        </section>
                        <Divider />
                        <section class="flex gap-3">
                            <InputText type="text" v-model="message" class="w-full" />
                            <Button label="Enviar" icon="pi pi-send" @click="sendMessage()" class="min-w-max" />
                        </section>
                    </div>
                </template>
            </Card>
        </section>
    </div>
</template>

