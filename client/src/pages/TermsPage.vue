<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Fieldset from 'primevue/fieldset';

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Términos de uso</h3>
        </template>
        <template #content>
            <Message severity="info" :closable="false">Al usar <strong>Upcord</strong> te comprometes a respetar los
                siguientes términos. Si no estás de acuerdo, abandona el sitio.</Message>
            <Fieldset>
                <template #legend>
                    <div class="flex align-items-center">
                        <span class="pi pi-book mr-2"></span>
                        <span>Reglas</span>
                    </div>
                </template>
                <ul>
                    <li class="mb-2">No publiques contenido publicitario o spam.</li>
                    <li class="mb-2">Respeta a todos los usuarios. No hagas ataques personales.</li>
                    <li class="mb-2">No se admitirán mensajes de odio.</li>
                    <li class="mb-2">Respeta la temática de cada subforo.</li>
                    <li class="mb-2">Evita crear hilos duplicados. Usa el buscador antes de crear uno nuevo.</li>
                    <li class="mb-2">Abstente de reflotar hilos antiguos sin un buen motivo.</li>
                </ul>
                <p>El incumplimiento de las normas acarreará la expulsión de la cuenta infractora, ya sea temporal o
                    permanente.</p>
            </Fieldset>
            <Fieldset>
                <template #legend>
                    <div class="flex align-items-center">
                        <span class="pi pi-file-edit mr-2"></span>
                        <span>Cambios</span>
                    </div>
                </template>
                <ul>
                    <li class="mb-2">Estos términos podrán ser modificados en cualquier momento, con o sin aviso previo.</li>
                    <li class="mb-2">Los usuarios son responsables de consultar estos términos regularmente.</li>
                    <li class="mb-2">El desconocimiento de las normas no exime de su cumplimiento.</li>
                </ul>
            </Fieldset>
        </template>
    </Card>
</template>