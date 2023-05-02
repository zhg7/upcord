<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import CategoryCard from '@/components/CategoryCard.vue';
import { getCategories } from '@/services/ForumService';
import type { Category } from '@/types/Forum'

const categories = ref<Category[]>();

onMounted(async () => {
    categories.value = await getCategories();
})


</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Foros</h3>
        </template>
        <template #content>
            <div class="grid">
                <section class="grid col-12 lg:col-6">
                    <div class="col-12" v-for="category in categories">
                        <CategoryCard :title=category.title :subforums=category.subforums :key=category.id />
                    </div>
                </section>
                <section class="col-12 lg:col-6">
                    
                </section>
            </div>
        </template>
    </Card>
</template>