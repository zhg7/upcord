import { z } from 'zod';

export const SignUpUser = z.object({
    username: z.string().trim().nonempty({ message: "No puede estar vacío." }).regex(/^[A-Za-z0-9]+$/, { message: "Solo puede tener carácteres alfanuméricos." }).min(4, { message: "Debe tener un mínimo de 4 carácteres." }).max(20, { message: "Debe tener un máximo de 20 carácteres." }).toLowerCase(),
    email: z.string().email({ message: "Formato inválido." }).toLowerCase(),
    password: z.string().nonempty({ message: "No puede estar vacío." }).min(8, { message: "Debe tener un mínimo de 8 carácteres." })
})

export type SignUpUser = z.infer<typeof SignUpUser>;