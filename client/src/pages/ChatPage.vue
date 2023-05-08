<script setup lang="ts">
import Card from 'primevue/card';
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");


// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
socket.emit('join', "XD");

</script>

<template>
    <div class="card grid">
        <aside class="col-12 sm:col-12 md:col-5 lg:col-4">
            <Card>
                <template #title> Chats </template>
                <template #content>
                    
                </template>
            </Card>
        </aside>
        <section class="col-12 sm:col-12 md:col-7 lg:col-8">
            <Card >
                <template #title>  </template>
                <template #content>
                    
                </template>
            </Card>
        </section>
    </div>
</template>

