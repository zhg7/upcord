# <img src="https://raw.githubusercontent.com/zhg7/upcord/557a10359a3711576e6546e940458052c5d54321/client/src/assets/images/upcord-icon.svg" width="42px"></img> Upcord [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/zhg7/upcord)
Foro de propósito general organizado en subforos. Los usuarios registrados tienen sus propios perfiles, pueden crear hilos y dejar comentarios. Además, pueden comunicarse entre ellos de manera privada mediante chats.

[![Licence](https://img.shields.io/github/license/zhg7/upcord?style=for-the-badge)](./LICENSE)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## Uso

### Requisitos
- [Node.js](https://nodejs.org/)
- [MySQL](https://aws.amazon.com/rds/mysql/)
- [SendGrid](https://sendgrid.com/)
- [Cloudinary](https://cloudinary.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Variables de entorno
#### ```client```
- ```VITE_SERVER_BASE_URL```

#### ```server```
- [```DATABASE_URL```](https://www.prisma.io/docs/reference/database-reference/connection-urls#mysql)
- [```SENDGRID_API_KEY```](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs#create-and-store-a-sendgrid-api-key)
- ```SENDGRID_SENDER```
- [```CLOUDINARY_URL```](https://cloudinary.com/documentation/node_integration#setting_the_cloudinary_url_environment_variable)
- ```CLIENT_BASE_URL```

### Entorno de desarrollo

Situarse en las carpetas ```client``` y ```server```. Instalar dependencias:
```bash
npm install
```
Crear la base de datos:
```bash
npx prisma migrate dev
```
Arrancar servidores locales de desarrollo:
```bash
npm run dev
```
