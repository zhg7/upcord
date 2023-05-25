<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Badge from 'primevue/badge';
import { io } from "socket.io-client";
import ProfilePicture from '@/components/ProfilePicture.vue';
import ChatCard from '@/components/ChatCard.vue';
import { getUserChats, getChatMessages } from '@/services/ChatService';
import { useAuth } from '@/store/auth';
import type { Message } from '@/types/Message';
import useVuelidator from '@vuelidate/core';
import { required, minLength, maxLength, email } from '@vuelidate/validators';

const auth = useAuth();

const socket = io(import.meta.env.VITE_SERVER_BASE_URL);

const chat = ref(0);
const chats = ref();

const message = ref({
    content: "",
});
const messages = ref<Message[]>([]);

const rules = {
    content: { required: required, minLength: minLength(1) },
};

const v$ = useVuelidator(rules, message);

const receiverData = ref({
    avatar: "",
    username: "",
    isOnline: false
})

const messagesDiv = ref<HTMLDivElement | null>(null);

onMounted(async () => {
    chats.value = await getUserChats();
})

onBeforeUnmount(() => {
    socket.disconnect();
})

async function sendMessage() {

    const validationPassed = await v$.value.$validate();

    if (validationPassed) {
        const newMessage = {
            senderId: auth.user.value.id,
            message: message.value.content,
            chatId: chat.value,
            createdAt: new Date(),
        };

        messages.value.push(newMessage);

        socket.emit('message', newMessage);

        message.value.content = ""; // Limpiar input

        v$.value.$reset();

        setTimeout(scrollToBottom);
    }
}


socket.on('message', (data) => {
    messages.value.push({
        senderId: data.senderId,
        message: data.message,
        chatId: chat.value,
        createdAt: data.createdAt,
    });

    setTimeout(scrollToBottom);
});

socket.on('online', () => {
    receiverData.value.isOnline = true;
})

socket.on('offline', () => {
    receiverData.value.isOnline = false;
})


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

async function joinChat(chatId: number, username: string, avatar: string) {
    socket.disconnect();
    socket.connect();

    chat.value = chatId;
    receiverData.value.avatar = avatar;
    receiverData.value.username = username;

    const chatMessages = await getChatMessages(chat.value);
    messages.value = chatMessages;

    socket.emit('join', chat.value);

    setTimeout(scrollToBottom);
}

//Flujo del chat: mantener siempre el scroll abajo
function scrollToBottom() {
    const chatHeight = messagesDiv.value!.scrollHeight;
    messagesDiv.value!.scrollTop = chatHeight;
}


</script>

<template>
    <div class="card grid">
        <aside class="col-12 sm:col-12 md:col-5 lg:col-4">
            <Card style="height: 40rem">
                <template #title> Chats </template>
                <template #content>
                    <section v-for="chat in chats" :key="chat.id">
                        <ChatCard :avatar=getReceiverAvatar(chat) :username=getReceiverUsername(chat) :chat-id="chat.id"
                            @join-chat="(props) => joinChat(props.chatId, props.username, props.avatar)" />
                    </section>
                </template>
            </Card>
        </aside>
        <section class="col-12 sm:col-12 md:col-7 lg:col-8">
            <Card style="height: 40rem">
                <template #title> </template>
                <template #content>
                    <div v-if="chat !== 0">
                        <section class="flex gap-2 align-items-center">
                            <ProfilePicture :imageUrl="receiverData.avatar" :username="receiverData.username"
                                image-size="large" />
                            <span>{{ receiverData.username }}</span>
                            <Badge v-if="receiverData.isOnline" severity="success"></Badge>
                            <Badge v-else severity="danger"></Badge>
                        </section>
                        <Divider />
                        <section>
                            <div class="h-25rem overflow-y-auto chat-panel" ref="messagesDiv">
                                <article v-for="message in messages" :key="message.createdAt.toString()">
                                    <div v-if="message.senderId === auth.user.value.id"
                                        class="flex w-full justify-content-end">
                                        <p class="bg-primary-700 border-round p-3 mr-3 message text-white">{{ message.message }}</p>
                                    </div>
                                    <div v-else class="flex">
                                        <p class="bg-bluegray-800 border-round p-3 mr-3 message text-white">{{ message.message }}</p>
                                    </div>
                                </article>
                            </div>
                        </section>
                        <Divider />
                        <section class="flex gap-3">
                            <InputText type="text" v-model="message.content" class="w-full" @keyup.enter="sendMessage()"
                                :class="{ 'p-invalid': v$.content.$errors.length }" />
                            <Button label="Enviar" icon="pi pi-send" @click="sendMessage()" class="min-w-max" />
                        </section>
                    </div>
                </template>
            </Card>
        </section>
    </div>
</template>

<style scoped>
.message {
    word-break: break-all;
}
</style>
