<script setup lang="ts">
import Card from 'primevue/card';
import CategoryCard from '@/components/CategoryCard.vue';
</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Foros</h3>
        </template>
        <template #content>
            <div class="grid">
                <section class="col-12 md:col-8 lg:col-8">
                    <CategoryCard title="General" />
                    <CategoryCard title="General2" />
                    <CategoryCard title="General3" />
                </section>
                <aside class="col-12 md:col-4 lg:col-4">
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorem obcaecati rem. Architecto
                        veritatis reprehenderit qui recusandae nam officiis aliquid facilis repellat nesciunt. Consequatur
                        provident obcaecati corporis excepturi modi vitae.
                        Quod aspernatur minima sit odit officiis est omnis animi ab labore perferendis hic dicta,
                        consequatur sequi nemo architecto perspiciatis assumenda commodi rem eos distinctio sunt magnam
                        suscipit veritatis id. Illum.
                        Laudantium doloremque ad minus obcaecati asperiores quo maiores eaque eligendi, accusamus
                        praesentium, doloribus excepturi quis, libero adipisci reiciendis molestiae nobis assumenda quaerat
                        expedita odio ut nihil consequatur harum! Nobis, at?
                        Ipsa adipisci facilis eius expedita error numquam ratione rerum, tempore doloribus dignissimos quos
                        accusantium autem tenetur perferendis. Optio quae, laudantium cumque ut perspiciatis ipsam quas
                        reiciendis porro officiis voluptatum itaque!
                        Mollitia at perspiciatis facere maiores tenetur vel iste cupiditate illo aliquid sed aspernatur ab
                        reiciendis exercitationem ea harum temporibus atque nisi corporis, veritatis eos accusantium
                        perferendis. Quas asperiores sint atque?
                    </div>
                </aside>
            </div>
        </template>
    </Card>
</template>