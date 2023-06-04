<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Skeleton from 'primevue/skeleton';
import CategoryCard from '@/components/CategoryCard.vue';
import AppSidebar from '@/layout/AppSidebar.vue';
import { getCategories } from '@/services/ForumService';
import type { Category } from '@/types/Forum'

const categories = ref<Category[]>();
const isLoading = ref(true);

onMounted(async () => {
    categories.value = await getCategories();
    isLoading.value = false;
})

</script>

<template>
    <Card class="surface-card">
        <template #title>
            <h3 class="text-start m-0">Foros</h3>
        </template>
        <template #content>
            <div class="grid gap-3">
                <section class="grid col-12 lg:col-5">
                    <div v-if="isLoading">
                        <Skeleton class="mt-2 mb-4" width="37rem" height="3.5rem"></Skeleton>
                        <Skeleton class="mb-4" width="37rem" height="3.5rem"></Skeleton>
                        <Skeleton class="mb-4" width="37rem" height="3.5rem"></Skeleton>
                        <Skeleton width="37rem" height="3.5rem"></Skeleton>
                    </div>
                    <div class="col-12" v-for="category in categories">
                        <CategoryCard :title=category.title :subforums=category.subforums :key=category.id />
                    </div>
                </section>
                <section class="col-12 lg:col-7">
                    <AppSidebar />
                </section>
            </div>
        </template>
    </Card>
</template>