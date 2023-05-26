<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import Badge from 'primevue/badge';
import { getStats } from '@/services/ForumService';
import { getTimeAgo } from '@/utils/time';

const stats = ref();

onMounted(async () => {
    stats.value = await getStats();
})

</script>

<template>
    <div class="card grid">
        <article class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <section>
                        <span class="block text-500 font-medium mb-3">Registrados</span>
                        <div class="text-900 font-medium text-xl">{{ stats?.users }}</div>
                    </section>
                    <section class="stat-icon flex align-items-center justify-content-center bg-blue-100 border-round">
                        <i class="pi pi-users text-blue-500 text-xl"></i>
                    </section>
                </div>
            </div>
        </article>
        <article class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <section>
                        <span class="block text-500 font-medium mb-3">Hilos</span>
                        <div class="text-900 font-medium text-xl">{{ stats?.threads }}</div>
                    </section>
                    <section class="stat-icon flex align-items-center justify-content-center bg-orange-100 border-round">
                        <i class="pi pi-comments text-orange-500 text-xl"></i>
                    </section>
                </div>
            </div>
        </article>
        <article class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <section>
                        <span class="block text-500 font-medium mb-3">Comentarios</span>
                        <div class="text-900 font-medium text-xl">{{ stats?.comments }}</div>
                    </section>
                    <section class="stat-icon flex align-items-center justify-content-center bg-cyan-100 border-round">
                        <i class="pi pi-reply text-cyan-500 text-xl"></i>
                    </section>
                </div>
            </div>
        </article>
        <article class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <section>
                        <span class="block text-500 font-medium mb-3">Mensajes</span>
                        <div class="text-900 font-medium text-xl">{{ stats?.messages }}</div>
                    </section>
                    <section class="stat-icon flex align-items-center justify-content-center bg-purple-100 border-round">
                        <i class="pi pi-send text-purple-500 text-xl"></i>
                    </section>
                </div>
            </div>
        </article>
        <article class="col-12">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <section>
                        <span class="block text-500 font-medium mb-3">Últimos hilos</span>
                        <div v-for="thread in stats?.latestThreads" class="flex">
                            <article class="mb-2">
                                <Badge /> <router-link class="no-underline hover:underline text-color font-bold"
                                    :to="`/thread/${thread.id}`">{{ thread.subforum.title }} > {{ thread.title
                                    }}</router-link>
                                <span class="text-500"> iniciado por </span>
                                <router-link class="no-underline hover:underline text-color" :to="`/profile/${thread.author.username}`">{{
                                    thread.author.username
                                }}</router-link>
                                <span class="text-500"> {{ " " + getTimeAgo(thread.createdAt) }}</span>
                            </article>
                        </div>
                    </section>
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
.stat-icon {
    width: 2.5rem;
    height: 2.5rem;
}
</style>