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
            <h3 class="text-start m-0">Política de privacidad</h3>
        </template>
        <template #content>
            <Message severity="info" :closable="false"><strong>Upcord</strong> respeta tu privacidad y se compromete a
                recoger la <u>mínima</u> cantidad de datos personales para ofrecerte servicio.</Message>
            <Fieldset>
                <template #legend>
                    <div class="flex align-items-center">
                        <span class="pi pi-book mr-2"></span>
                        <span>Introducción</span>
                    </div>
                </template>
                <p>Puedes utilizar el sitio sin registrarte ni aportar ningún dato personal, pero no podrás enviar ningún
                    contenido.</p>
                <p>En caso de que decidas registrarte, se recogerán los siguientes datos:</p>
                <ul>
                    <li class="mb-2">Nombre de usuario</li>
                    <li class="mb-2">Dirección de e-mail</li>
                    <li class="mb-2">Contraseña</li>
                </ul>
                <p>La contraseña se almacena <strong>encriptada</strong>, es decir, <strong>nadie</strong> puede leer su
                    forma
                    original.</p>
            </Fieldset>
            <Fieldset>
                <template #legend>
                    <div class="flex align-items-center">
                        <span class="pi pi-database mr-2"></span>
                        <span>Otros datos recogidos</span>
                    </div>
                </template>
                <ul>
                    <li class="mb-2">Foto de perfil y biografía</li>
                    <li class="mb-2">Hilos creados</li>
                    <li class="mb-2">Comentarios enviados en los hilos</li>
                    <li class="mb-2">Mensajes de chat</li>
                </ul>
            </Fieldset>
            <Fieldset>
                <template #legend>
                    <div class="flex align-items-center">
                        <span class="pi pi-flag mr-2"></span>
                        <span>Tus derechos</span>
                    </div>
                </template>
                <p>En virtud del <strong>Reglamento General de Protección de Datos</strong>, tienes los siguientes derechos:
                </p>
                <ul>
                    <li class="mb-2"><b>Acceso</b>. Puedes visualizar tus datos en tu perfil y los ajustes.</li>
                    <li class="mb-2"><b>Rectificación</b>. Puedes editar tanto tu perfil como el contenido que publicas en
                        el foro.</li>
                    <li class="mb-2"><b>Supresión</b>. Puedes solicitar la baja de tu cuenta y el borrado de los datos
                        asociados. Se anonimizará el contenido
                        de los recursos comunitarios (hilos y comentarios), a fin de mantener la
                        integridad del
                        foro.</li>
                </ul>
            </Fieldset>
        </template>
    </Card>
</template>