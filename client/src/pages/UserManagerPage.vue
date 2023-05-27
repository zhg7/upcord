<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Fieldset from 'primevue/fieldset';
import FileUpload, { type FileUploadRemoveEvent } from 'primevue/fileupload';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import Toast from 'primevue/toast';
import InputSwitch from 'primevue/inputswitch';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { getUsers } from '@/services/UserService';
import { formatDate } from '@/utils/time';
import { FilterMatchMode } from 'primevue/api';
import { useBase64 } from '@vueuse/core';
import useVuelidator from '@vuelidate/core';
import { required, minLength, maxLength, email, alphaNum } from '@vuelidate/validators';
import { changeUserDataAsAdmin } from '@/services/UserService';
import { showSuccess } from '@/services/ToastService';
import type { User } from '@/types/Author';

const users = ref();
const editingMode = ref(false);

const userData = ref({
    id: 0,
    avatar: "",
    biography: "",
    username: "",
    email: "",
    password: "",
    isActivated: false,
    isAdmin: false
});

onMounted(async () => {
    users.value = await getUsers();
});

const rules = {
    biography: { maxLength: maxLength(170) },
    username: { required: required, minLength: minLength(4), maxLength: maxLength(20), alphaNum: alphaNum },
    email: { required: required, email: email },
    password: { minLength: minLength(8) },
};

const v$ = useVuelidator(rules, userData);

const filters = ref({
    username: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isActivated: { value: null, matchMode: FilterMatchMode.EQUALS },
    isAdmin: { value: null, matchMode: FilterMatchMode.EQUALS }
});

function toggleEdit(user: User) {
    editingMode.value = true;

    userData.value.id = user.id;
    userData.value.avatar = user.avatar;
    userData.value.biography = user.biography;
    userData.value.username = user.username;
    userData.value.email = user.email;
    userData.value.password = user.password;
    userData.value.isActivated = user.isActivated;
    userData.value.isAdmin = user.isAdmin;

}

function convertImageBase64(event: FileUploadRemoveEvent) {
    const imageFile = event.files[0];
    const { base64 } = useBase64(imageFile);
    userData.value.avatar = base64 as unknown as string // Mostrar previsualización antes de subir. 
}

async function saveChanges() {
    const result = await v$.value.$validate();

    if (result) {
        await changeUserDataAsAdmin(userData.value);
        showSuccess("Usuario modificado correctamente.", "");
        editingMode.value = false;
        users.value = await getUsers();
    }
}

</script>

<template>
    <Card>
        <template #title>
            <h3 class="text-start m-0">Gestor de usuarios</h3>
        </template>
        <template #content>
            <div class="card">
                <Toast position="bottom-center" />
                <DataTable :value="users" :rows="10" paginator filterDisplay="row" v-model:filters="filters"
                    sortMode="multiple" removableSort dataKey="id" class="mt-3">
                    <template #empty> No se han encontrado usuarios. </template>
                    <Column field="username" header="Nombre" sortable :show-filter-menu="false">
                        <template #body="{ data }">
                            <section class="flex align-items-center gap-2">
                                <ProfilePicture :image-url=data.avatar :username=data.username image-size="normal" />
                                <div class="flex flex-column gap-1">
                                    <span>{{ data.username }}</span>
                                </div>
                            </section>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    class="p-column-filter" placeholder="Buscar por nombre" />
                            </span>
                        </template>
                    </Column>
                    <Column field="email" header="E-mail" sortable :show-filter-menu="false">
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    class="p-column-filter" placeholder="Buscar por e-mail" />
                            </span>
                        </template>
                    </Column>
                    <Column field="isAdmin" header="Rol" dataType="boolean" sortable :show-filter-menu="false">
                        <template #body="{ data }">
                            <span v-if="data.isAdmin">Administrador</span>
                            <span v-else>Usuario</span>
                        </template>
                    </Column>
                    <Column field="isActivated" header="Activado" dataType="boolean" :show-filter-menu="false">
                        <template #body="{ data }">
                            <i class="pi"
                                :class="{ 'pi-check-circle text-green-500': data.isActivated, 'pi-times-circle text-red-400': !data.isActivated }"></i>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
                        </template>
                    </Column>
                    <Column field="createdAt" header="Fecha de registro" sortable :show-filter-menu="false">
                        <template #body="{ data }">
                            {{ formatDate(data.createdAt) }}
                        </template>
                    </Column>
                    <Column field="updatedAt" header="Última actualización" sortable :show-filter-menu="false">
                        <template #body="{ data }">
                            {{ formatDate(data.updatedAt) }}
                        </template>
                    </Column>
                    <Column>
                        <template #body="{ data }">
                            <Button @click="toggleEdit(data)" label="Editar" icon="pi pi-user-edit" severity="warning"
                                aria-label="Editar" />
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- Modal edición usuario-->
            <Dialog v-model:visible="editingMode" modal header="Edición de usuario" :style="{ width: '95vw' }">
                <form>
                    <div class="flex flex-column gap-4">
                        <Fieldset legend="Perfil">
                            <section class="grid justify-content-center">
                                <div class="lg:col-6 mb-5">
                                    <label for="avatar">Foto</label>
                                    <div class="flex align-items-center gap-3 mt-3">
                                        <ProfilePicture :image-url="userData.avatar" :username=userData?.username
                                            image-size="xlarge" />
                                        <div class="w-9">
                                            <FileUpload mode="basic" name="avatar" accept="image/*" customUpload
                                                :auto="true" @uploader="convertImageBase64" chooseLabel="Subir" />
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:col-6">
                                    <label for="biography" class="block mb-3">Biografía</label>
                                    <Textarea id="biography" v-model="userData.biography" autoResize rows="5" cols="30"
                                        class="w-full" :class="{ 'p-invalid': v$.biography.$errors.length }" />
                                    <small class="block mt-2">Máximo 170 carácteres.</small>
                                </div>
                            </section>
                        </Fieldset>
                        <Fieldset legend="Cuenta">
                            <section class="grid">
                                <div class="lg:col-4">
                                    <div class="mb-3 w-full">
                                        <label for="username">Nombre de usuario</label>
                                        <InputText id="username" v-model="userData.username" type="text"
                                            class="w-full mb-2 mt-3" :class="{ 'p-invalid': v$.username.$errors.length }" />
                                        <small class="block">De 4 a 20 caracteres alfanuméricos.</small>
                                    </div>
                                </div>
                                <div class="lg:col-4">
                                    <label for="email">Dirección de e-mail</label>
                                    <InputText id="email" v-model="userData.email" type="text" class="w-full mb-3 mt-3"
                                        :class="{ 'p-invalid': v$.email.$errors.length }" />
                                </div>
                                <div class="lg:col-4">
                                    <label for="password">Contraseña</label>
                                    <Password id="pw" v-model="userData.password" type="password" class="w-full mb-2 mt-3"
                                        inputId="password" inputClass="w-full" :feedback=false toggleMask
                                        :class="{ 'p-invalid': v$.password.$errors.length }" />
                                    <small class="block">Mínimo 8 caracteres.</small>
                                </div>
                            </section>
                        </Fieldset>
                        <Fieldset legend="Estado">
                            <section class="flex flex-row gap-3">
                                <div class="flex align-items-center gap-2">
                                    <label for="toggle-activated">Activado</label>
                                    <InputSwitch id="toggle-activated" v-model="userData.isActivated" />
                                </div>
                                <div class="flex align-items-center gap-2">
                                    <label for="toggle-admin">Permisos de administrador</label>
                                    <InputSwitch id="toggle-admin" v-model="userData.isAdmin" />
                                </div>
                            </section>
                        </Fieldset>
                    </div>
                </form>
                <template #footer>
                    <Button label="Cancelar" severity="danger" icon="pi pi-times" @click="editingMode = false" text />
                    <Button label="Guardar" icon="pi pi-check" autofocus @click="saveChanges()" />
                </template>
            </Dialog>
        </template>
    </Card>
</template>