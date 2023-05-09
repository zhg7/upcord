<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { io } from "socket.io-client";
import ProfilePicture from '@/components/ProfilePicture.vue'
import { getUserChats } from '@/services/ChatService';
import { useAuth } from '@/store/auth';
import type { Message } from '@/types/Message';

const auth = useAuth();

const socket = io("ws://localhost:3000");

const chat = ref();
const chats = ref();

const message = ref("");
const messages = ref<Message[]>([]);

onMounted(async () => {
    chats.value = await getUserChats();
    socket.emit('join', "1");
})

function sendMessage() {

    const newMessage = {
        senderId: auth.user.value.id,
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

</script>

<template>
    <div class="card grid">
        <aside class="col-12 sm:col-12 md:col-5 lg:col-4">
            <Card>
                <template #title> Chats </template>
                <template #content>
                    <div v-for="chat in chats">
                        <div class="bg-primary-700 border-round p-3 m-2 cursor-pointer" :data-chat-id=chat.id>
                            <ProfilePicture :image-url=getReceiverAvatar(chat) :username=getReceiverUsername(chat)
                                image-size="large" />
                            <span>{{ getReceiverUsername(chat) }}</span>
                        </div>
                    </div>
                </template>
            </Card>
        </aside>
        <section class="col-12 sm:col-12 md:col-7 lg:col-8">
            <Card>
                <template #title> </template>
                <template #content>
                    <section v-for="message in messages">
                        <p>{{ message.senderId }} {{ message.message }}</p>
                    </section>
                    <InputText type="text" v-model="message" />
                    <Button label="Submit" @click="sendMessage()" />
                </template>
            </Card>
        </section>
    </div>
</template>

